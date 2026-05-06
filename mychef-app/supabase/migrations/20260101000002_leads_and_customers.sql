CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  preferred_menu TEXT CHECK (preferred_menu IN ('7_course', '11_course')),
  is_returning BOOLEAN DEFAULT false,
  is_vip BOOLEAN DEFAULT false,
  data_deletion_requested BOOLEAN DEFAULT false,
  source_lead_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  source TEXT CHECK (source IN (
    'villa_partner', 'direct', 'referral', 'other'
  )),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'qualified', 'offer_sent',
    'offer_viewed', 'offer_accepted', 'awaiting_payment',
    'payment_submitted', 'payment_confirmed',
    'confirmed', 'completed', 'lost', 'cancelled'
  )),
  waiting_on TEXT CHECK (waiting_on IN ('us', 'customer')),
  assigned_to UUID REFERENCES profiles(id),
  follow_up_date DATE,
  estimated_value DECIMAL(15,2),
  event_date DATE,
  is_hot BOOLEAN DEFAULT false,
  is_surprise_booking BOOLEAN DEFAULT false,
  customer_id UUID,
  converted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add FKs after both tables exist (avoiding circular dependency in CREATE TABLE)
ALTER TABLE leads ADD CONSTRAINT leads_customer_fk 
  FOREIGN KEY (customer_id) REFERENCES customers(id);
ALTER TABLE customers ADD CONSTRAINT customers_lead_fk 
  FOREIGN KEY (source_lead_id) REFERENCES leads(id);

-- Auto-set is_hot when event within 7 days
CREATE OR REPLACE FUNCTION update_lead_hot_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_date IS NOT NULL 
    AND NEW.event_date - CURRENT_DATE <= 7 
    AND NEW.event_date >= CURRENT_DATE THEN
    NEW.is_hot := true;
  ELSE
    NEW.is_hot := false;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lead_hot_status_trigger
  BEFORE INSERT OR UPDATE OF event_date ON leads
  FOR EACH ROW EXECUTE FUNCTION update_lead_hot_status();

CREATE TABLE lead_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE customer_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
