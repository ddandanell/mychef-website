CREATE TABLE booking_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  supplier_product_id UUID REFERENCES supplier_products(id),
  -- Immutable snapshots (locked after booking confirmed)
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(15,2) NOT NULL,
  unit_cost DECIMAL(15,2) NOT NULL DEFAULT 0,
  is_food BOOLEAN DEFAULT false,
  subtotal DECIMAL(15,2) GENERATED ALWAYS AS (unit_price * quantity) STORED,
  locked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lock items when booking confirmed
CREATE OR REPLACE FUNCTION lock_booking_items()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
    UPDATE booking_items 
    SET locked_at = NOW()
    WHERE booking_id = NEW.id AND locked_at IS NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lock_items_on_confirm
  AFTER UPDATE OF status ON bookings
  FOR EACH ROW EXECUTE FUNCTION lock_booking_items();

CREATE TABLE booking_adhoc_costs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  requires_approval BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  dietary_requirements TEXT,
  invitation_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
