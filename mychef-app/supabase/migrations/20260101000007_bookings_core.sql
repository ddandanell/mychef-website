CREATE SEQUENCE booking_reference_seq START 1;

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference TEXT UNIQUE NOT NULL 
    DEFAULT 'MCF-' || LPAD(nextval('booking_reference_seq')::TEXT, 3, '0'),
  lead_id UUID REFERENCES leads(id),
  customer_id UUID REFERENCES customers(id),
  b2b_customer_id UUID REFERENCES b2b_customers(id),
  partner_id UUID REFERENCES partners(id),
  is_b2b BOOLEAN DEFAULT false,
  is_surprise BOOLEAN DEFAULT false,
  event_date DATE,
  event_time TIME,
  event_end_time TIME,
  guests INTEGER,
  min_guests INTEGER DEFAULT 4,
  venue_name TEXT,
  venue_address TEXT,
  venue_area TEXT,
  venue_contact_name TEXT,
  venue_contact_phone TEXT,
  assigned_chef UUID REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'offer_sent', 'offer_viewed',
    'offer_accepted', 'awaiting_payment',
    'payment_submitted', 'payment_confirmed',
    'confirmed', 'completed', 'cancelled'
  )),
  -- Offer tracking
  offer_token UUID UNIQUE DEFAULT uuid_generate_v4(),
  offer_version INTEGER DEFAULT 1,
  offer_sent_at TIMESTAMPTZ,
  offer_viewed_count INTEGER DEFAULT 0,
  offer_last_viewed_at TIMESTAMPTZ,
  offer_expires_at TIMESTAMPTZ,
  offer_question TEXT,
  offer_accepted_at TIMESTAMPTZ,
  -- Payment
  payment_method TEXT CHECK (payment_method IN (
    'local_bank', 'international', 'wise'
  )),
  payment_deadline TIMESTAMPTZ,
  payment_deadline_override BOOLEAN DEFAULT false,
  payment_submitted_at TIMESTAMPTZ,
  payment_screenshot_url TEXT,
  payment_confirmed_at TIMESTAMPTZ,
  payment_confirmed_by UUID REFERENCES profiles(id),
  -- Cancellation
  cancellation_fee_applicable BOOLEAN DEFAULT false,
  cancellation_fee_amount DECIMAL(15,2),
  cancellation_fee_invoice_sent BOOLEAN DEFAULT false,
  -- Survey
  survey_sent_at TIMESTAMPTZ,
  survey_token UUID UNIQUE DEFAULT uuid_generate_v4(),
  -- Flags
  event_summary_generated BOOLEAN DEFAULT false,
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at := NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-calculate payment deadline
CREATE OR REPLACE FUNCTION set_payment_deadline()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.offer_accepted_at IS NOT NULL 
    AND OLD.offer_accepted_at IS NULL 
    AND NOT NEW.payment_deadline_override THEN
    IF NEW.event_date - CURRENT_DATE > 7 THEN
      NEW.payment_deadline := NEW.offer_accepted_at + INTERVAL '48 hours';
    ELSE
      NEW.payment_deadline := NEW.offer_accepted_at + INTERVAL '24 hours';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_payment_deadline_trigger
  BEFORE UPDATE OF offer_accepted_at ON bookings
  FOR EACH ROW EXECUTE FUNCTION set_payment_deadline();

-- Auto-check for double booking (same chef, same date)
CREATE OR REPLACE FUNCTION check_double_booking()
RETURNS TRIGGER AS $$
DECLARE
  conflict_count INTEGER;
BEGIN
  IF NEW.assigned_chef IS NOT NULL AND NEW.event_date IS NOT NULL THEN
    SELECT COUNT(*) INTO conflict_count
    FROM bookings
    WHERE assigned_chef = NEW.assigned_chef
      AND event_date = NEW.event_date
      AND id != COALESCE(NEW.id, uuid_generate_v4())
      AND status NOT IN ('cancelled', 'draft');
    IF conflict_count > 0 THEN
      RAISE WARNING 'Double booking detected for chef on %', NEW.event_date;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_double_check_trigger
  BEFORE INSERT OR UPDATE OF assigned_chef, event_date ON bookings
  FOR EACH ROW EXECUTE FUNCTION check_double_booking();

-- Booking notes
CREATE TABLE booking_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
