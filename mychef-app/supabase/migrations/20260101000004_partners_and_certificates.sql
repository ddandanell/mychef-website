CREATE SEQUENCE certificate_number_seq START 1;

-- Function to generate certificate numbers (expressions in DEFAULT are not allowed)
CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'MCF-CERT-' || LPAD(nextval('certificate_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  villa_name TEXT,
  villa_count INTEGER DEFAULT 1,
  address TEXT,
  area TEXT,
  parent_company TEXT,
  has_kitchen BOOLEAN DEFAULT false,
  has_equipment BOOLEAN DEFAULT false,
  bank_account TEXT,
  bank_name TEXT,
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  onboarding_token UUID UNIQUE DEFAULT uuid_generate_v4(),
  onboarding_submitted_at TIMESTAMPTZ,
  status TEXT DEFAULT 'invited' CHECK (status IN (
    'invited', 'pending', 'approved', 'active', 'suspended'
  )),
  contract_accepted_at TIMESTAMPTZ,
  contract_accepted_ip TEXT,
  contract_accepted_useragent TEXT,
  contract_accepted_typed_name TEXT,
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  exclusivity_zone TEXT,
  exclusivity_expires_at TIMESTAMPTZ,
  show_in_directory BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE partner_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT,
  whatsapp TEXT,
  email TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE partner_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE partner_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES partner_contacts(id),
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL CHECK (type IN ('call', 'meeting', 'whatsapp', 'email')),
  notes TEXT,
  next_step TEXT,
  next_step_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE partner_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID NOT NULL REFERENCES partners(id),
  booking_id UUID,
  amount DECIMAL(15,2) NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE partner_certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE NOT NULL DEFAULT generate_certificate_number(),
  token UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  is_preview BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMPTZ
);

-- Auto-generate certificate on partner approval
CREATE OR REPLACE FUNCTION generate_partner_certificate()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'active' AND OLD.status != 'active' THEN
    INSERT INTO partner_certificates (partner_id, is_preview)
    VALUES (NEW.id, false)
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER partner_certificate_trigger
  AFTER UPDATE OF status ON partners
  FOR EACH ROW EXECUTE FUNCTION generate_partner_certificate();
