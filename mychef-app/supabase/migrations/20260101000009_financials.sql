CREATE TABLE booking_calculations (
  booking_id UUID PRIMARY KEY REFERENCES bookings(id) ON DELETE CASCADE,
  total_revenue DECIMAL(15,2) DEFAULT 0,
  food_revenue DECIMAL(15,2) DEFAULT 0,
  drink_revenue DECIMAL(15,2) DEFAULT 0,
  other_revenue DECIMAL(15,2) DEFAULT 0,
  ingredients_cost DECIMAL(15,2) DEFAULT 0,
  staff_cost DECIMAL(15,2) DEFAULT 0,
  partner_commission DECIMAL(15,2) DEFAULT 0,
  adhoc_costs DECIMAL(15,2) DEFAULT 0,
  total_costs DECIMAL(15,2) DEFAULT 0,
  gross_profit DECIMAL(15,2) DEFAULT 0,
  team1_split DECIMAL(15,2) DEFAULT 0,
  team2_split DECIMAL(15,2) DEFAULT 0,
  confirmed_at TIMESTAMPTZ,
  confirmed_by UUID REFERENCES profiles(id),
  last_calculated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recalculate on item changes
CREATE OR REPLACE FUNCTION recalculate_booking()
RETURNS TRIGGER AS $$
DECLARE
  v_booking_id UUID;
  v_food_rev DECIMAL(15,2);
  v_drink_rev DECIMAL(15,2);
  v_other_rev DECIMAL(15,2);
  v_total_rev DECIMAL(15,2);
  v_adhoc DECIMAL(15,2);
  v_commission_rate DECIMAL(5,2);
BEGIN
  v_booking_id := COALESCE(NEW.booking_id, OLD.booking_id);

  -- Block recalc if locked
  IF EXISTS (
    SELECT 1 FROM booking_calculations 
    WHERE booking_id = v_booking_id AND confirmed_at IS NOT NULL
  ) THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  -- Revenue by category
  SELECT 
    COALESCE(SUM(CASE WHEN is_food THEN subtotal ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN NOT is_food AND name ILIKE '%drink%' 
      OR name ILIKE '%wine%' OR name ILIKE '%beverage%' 
      THEN subtotal ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN NOT is_food 
      AND NOT (name ILIKE '%drink%' OR name ILIKE '%wine%' OR name ILIKE '%beverage%')
      THEN subtotal ELSE 0 END), 0)
  INTO v_food_rev, v_drink_rev, v_other_rev
  FROM booking_items WHERE booking_id = v_booking_id;

  v_total_rev := v_food_rev + v_drink_rev + v_other_rev;

  -- Adhoc costs
  SELECT COALESCE(SUM(amount), 0) INTO v_adhoc
  FROM booking_adhoc_costs 
  WHERE booking_id = v_booking_id
    AND (approved_by IS NOT NULL OR NOT requires_approval);

  -- Get partner commission rate
  SELECT COALESCE(p.commission_rate, 10) INTO v_commission_rate
  FROM bookings b
  LEFT JOIN partners p ON b.partner_id = p.id
  WHERE b.id = v_booking_id;

  -- Upsert calculation
  INSERT INTO booking_calculations (
    booking_id, total_revenue, food_revenue, drink_revenue, other_revenue,
    ingredients_cost, staff_cost, partner_commission,
    adhoc_costs, total_costs, gross_profit, team1_split, team2_split,
    last_calculated_at
  ) VALUES (
    v_booking_id,
    v_total_rev,
    v_food_rev,
    v_drink_rev,
    v_other_rev,
    ROUND(v_food_rev * 0.15, 0),
    ROUND(v_food_rev * 0.25, 0),
    ROUND(v_food_rev * (v_commission_rate / 100), 0),
    v_adhoc,
    ROUND(v_food_rev * 0.15, 0) + ROUND(v_food_rev * 0.25, 0) 
      + ROUND(v_food_rev * (v_commission_rate / 100), 0) + v_adhoc,
    v_total_rev - (ROUND(v_food_rev * 0.15, 0) + ROUND(v_food_rev * 0.25, 0) 
      + ROUND(v_food_rev * (v_commission_rate / 100), 0) + v_adhoc),
    ROUND((v_total_rev - (ROUND(v_food_rev * 0.15, 0) + ROUND(v_food_rev * 0.25, 0) 
      + ROUND(v_food_rev * (v_commission_rate / 100), 0) + v_adhoc)) / 2, 0),
    ROUND((v_total_rev - (ROUND(v_food_rev * 0.15, 0) + ROUND(v_food_rev * 0.25, 0) 
      + ROUND(v_food_rev * (v_commission_rate / 100), 0) + v_adhoc)) / 2, 0),
    NOW()
  )
  ON CONFLICT (booking_id) DO UPDATE SET
    total_revenue = EXCLUDED.total_revenue,
    food_revenue = EXCLUDED.food_revenue,
    drink_revenue = EXCLUDED.drink_revenue,
    other_revenue = EXCLUDED.other_revenue,
    ingredients_cost = EXCLUDED.ingredients_cost,
    staff_cost = EXCLUDED.staff_cost,
    partner_commission = EXCLUDED.partner_commission,
    adhoc_costs = EXCLUDED.adhoc_costs,
    total_costs = EXCLUDED.total_costs,
    gross_profit = EXCLUDED.gross_profit,
    team1_split = EXCLUDED.team1_split,
    team2_split = EXCLUDED.team2_split,
    last_calculated_at = NOW();

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER recalc_on_item_change
  AFTER INSERT OR UPDATE OR DELETE ON booking_items
  FOR EACH ROW EXECUTE FUNCTION recalculate_booking();

CREATE TRIGGER recalc_on_adhoc_change
  AFTER INSERT OR UPDATE OR DELETE ON booking_adhoc_costs
  FOR EACH ROW EXECUTE FUNCTION recalculate_booking();

-- Team payouts
CREATE TABLE team_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team TEXT NOT NULL CHECK (team IN ('team1', 'team2')),
  period TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
