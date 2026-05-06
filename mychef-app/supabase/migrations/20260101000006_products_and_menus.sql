CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'menu', 'food', 'drink', 'service', 'rental'
  )),
  description TEXT,
  cost_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  sales_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  unit TEXT DEFAULT 'per_person' CHECK (unit IN (
    'per_person', 'per_bottle', 'per_item', 'per_night', 'per_event'
  )),
  is_food BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('7_course', '11_course', 'custom')),
  description TEXT,
  prep_time_home INTEGER DEFAULT 0,
  prep_time_venue INTEGER DEFAULT 0,
  total_event_time INTEGER DEFAULT 0,
  external_link TEXT,
  standard_invitation_text TEXT,
  min_guests INTEGER DEFAULT 4,
  price_per_person DECIMAL(15,2) NOT NULL DEFAULT 0,
  cost_per_person DECIMAL(15,2) NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_id UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff/chef profiles
CREATE TABLE staff_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role_type TEXT CHECK (role_type IN ('chef', 'waiter', 'coordinator')),
  total_events INTEGER DEFAULT 0,
  avg_score DECIMAL(3,2),
  last_event_date DATE,
  low_score_alert BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed menus
INSERT INTO menus (name, type, description, prep_time_home, prep_time_venue, 
  total_event_time, min_guests, price_per_person, cost_per_person, 
  standard_invitation_text) VALUES
(
  '7 Course Fine Dining',
  '7_course',
  'An intimate journey through seven carefully crafted courses, 
   each celebrating the finest local and imported ingredients, 
   prepared by our world-class Italian chefs.',
  90, 60, 240, 4, 2200000, 330000,
  'An intimate journey through seven carefully crafted courses awaits you. 
   Each dish has been thoughtfully designed to celebrate the finest 
   local and imported ingredients, prepared exclusively for your evening.'
),
(
  '11 Course Grand Tasting',
  '11_course', 
  'The ultimate private dining experience. Eleven exceptional courses 
   that tell a story of culinary mastery, from delicate amuse-bouches 
   to an indulgent finale.',
  120, 90, 360, 4, 3000000, 450000,
  'The ultimate private dining experience awaits you. Eleven exceptional 
   courses that tell a story of culinary mastery — from delicate 
   amuse-bouches to an unforgettable finale, prepared exclusively 
   for your evening.'
);

-- Seed core products
INSERT INTO products (name, category, cost_price, sales_price, unit, is_food) VALUES
('7 Course Fine Dining', 'menu', 330000, 2200000, 'per_person', true),
('11 Course Grand Tasting', 'menu', 450000, 3000000, 'per_person', true);
