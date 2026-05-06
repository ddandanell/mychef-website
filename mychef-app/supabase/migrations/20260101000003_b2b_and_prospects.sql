CREATE TABLE b2b_customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE partner_prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  area TEXT,
  status TEXT DEFAULT 'prospect' CHECK (status IN (
    'prospect', 'contacted', 'interested', 
    'onboarding_sent', 'converted'
  )),
  assigned_to UUID REFERENCES profiles(id),
  follow_up_date DATE,
  last_activity_at TIMESTAMPTZ,
  is_cold BOOLEAN DEFAULT false,
  exclusivity_zone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prospect_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID NOT NULL REFERENCES partner_prospects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT,
  whatsapp TEXT,
  email TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prospect_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID NOT NULL REFERENCES partner_prospects(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES prospect_contacts(id),
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL CHECK (type IN ('call', 'meeting', 'whatsapp', 'email')),
  notes TEXT,
  next_step TEXT,
  next_step_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
