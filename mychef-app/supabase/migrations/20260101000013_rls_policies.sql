-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_adhoc_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Helper: is internal team member
CREATE OR REPLACE FUNCTION is_internal()
RETURNS BOOLEAN AS $$
  SELECT get_user_role() IN ('super_admin', 'admin', 'staff', 'financial_viewer');
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Helper: is admin or above
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT get_user_role() IN ('super_admin', 'admin');
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Helper: is super_admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT get_user_role() = 'super_admin';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Helper: is partner
CREATE OR REPLACE FUNCTION is_partner()
RETURNS BOOLEAN AS $$
  SELECT get_user_role() = 'partner';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- PROFILES
CREATE POLICY "profiles_read_own" ON profiles
  FOR SELECT USING (id = auth.uid() OR is_internal());
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (id = auth.uid() OR is_super_admin());
CREATE POLICY "profiles_insert_admin" ON profiles
  FOR INSERT WITH CHECK (is_super_admin());

-- LEADS (internal only)
CREATE POLICY "leads_internal_all" ON leads
  FOR ALL USING (is_internal());

CREATE POLICY "lead_notes_internal_all" ON lead_notes
  FOR ALL USING (is_internal());

-- CUSTOMERS (internal only)
CREATE POLICY "customers_internal_all" ON customers
  FOR ALL USING (is_internal());

CREATE POLICY "customer_notes_internal_all" ON customer_notes
  FOR ALL USING (is_internal());

-- B2B (internal only)
CREATE POLICY "b2b_internal_all" ON b2b_customers
  FOR ALL USING (is_internal());

-- PROSPECTS (internal only)
CREATE POLICY "prospects_internal_all" ON partner_prospects
  FOR ALL USING (is_internal());
CREATE POLICY "prospect_contacts_internal_all" ON prospect_contacts
  FOR ALL USING (is_internal());
CREATE POLICY "prospect_activities_internal_all" ON prospect_activities
  FOR ALL USING (is_internal());

-- PARTNERS
CREATE POLICY "partners_internal_read" ON partners
  FOR SELECT USING (is_internal());
CREATE POLICY "partners_admin_write" ON partners
  FOR ALL USING (is_admin());
CREATE POLICY "partners_own_read" ON partners
  FOR SELECT USING (
    is_partner() AND 
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "partner_certificates_internal" ON partner_certificates
  FOR ALL USING (is_internal());
CREATE POLICY "partner_certificates_own" ON partner_certificates
  FOR SELECT USING (
    is_partner() AND
    partner_id IN (
      SELECT id FROM partners WHERE 
      email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- BOOKINGS
CREATE POLICY "bookings_internal_read" ON bookings
  FOR SELECT USING (is_internal());
CREATE POLICY "bookings_admin_write" ON bookings
  FOR ALL USING (is_admin());
CREATE POLICY "bookings_staff_read" ON bookings
  FOR SELECT USING (
    get_user_role() = 'staff' AND assigned_chef = auth.uid()
  );

-- FINANCIAL DATA (hidden from staff)
CREATE POLICY "calculations_no_staff" ON booking_calculations
  FOR SELECT USING (
    get_user_role() IN ('super_admin', 'admin', 'financial_viewer')
  );
CREATE POLICY "calculations_admin_write" ON booking_calculations
  FOR ALL USING (is_admin());

CREATE POLICY "team_payouts_financial" ON team_payouts
  FOR SELECT USING (
    get_user_role() IN ('super_admin', 'financial_viewer')
  );
CREATE POLICY "team_payouts_admin_write" ON team_payouts
  FOR ALL USING (is_super_admin());

-- BOOKING ITEMS + GUESTS
CREATE POLICY "booking_items_internal" ON booking_items
  FOR ALL USING (is_internal());
CREATE POLICY "booking_adhoc_internal" ON booking_adhoc_costs
  FOR ALL USING (is_internal());
CREATE POLICY "guests_internal" ON guests
  FOR ALL USING (is_internal());
CREATE POLICY "booking_notes_internal" ON booking_notes
  FOR ALL USING (is_internal());

-- SUPPLIERS + PRODUCTS + MENUS
CREATE POLICY "suppliers_internal" ON suppliers
  FOR ALL USING (is_internal());
CREATE POLICY "supplier_notes_internal" ON supplier_notes
  FOR ALL USING (is_internal());
CREATE POLICY "supplier_products_internal" ON supplier_products
  FOR ALL USING (is_internal());
CREATE POLICY "products_read_all" ON products
  FOR SELECT USING (true);
CREATE POLICY "products_admin_write" ON products
  FOR ALL USING (is_admin());
CREATE POLICY "menus_read_all" ON menus
  FOR SELECT USING (true);
CREATE POLICY "menus_admin_write" ON menus
  FOR ALL USING (is_admin());
CREATE POLICY "menu_images_read_all" ON menu_images
  FOR SELECT USING (true);
CREATE POLICY "menu_images_admin_write" ON menu_images
  FOR ALL USING (is_admin());

-- SURVEYS
CREATE POLICY "survey_templates_internal" ON survey_templates
  FOR ALL USING (is_internal());
CREATE POLICY "survey_questions_internal" ON survey_questions
  FOR ALL USING (is_internal());
CREATE POLICY "survey_responses_internal" ON survey_responses
  FOR ALL USING (is_internal());
CREATE POLICY "survey_answers_internal" ON survey_answers
  FOR ALL USING (is_internal());

-- AUDIT LOGS
CREATE POLICY "audit_admin_only" ON audit_logs
  FOR ALL USING (is_super_admin());

-- NOTIFICATIONS
CREATE POLICY "notifications_own" ON notifications
  FOR ALL USING (user_id = auth.uid());

-- APP SETTINGS
CREATE POLICY "settings_read_internal" ON app_settings
  FOR SELECT USING (is_internal());
CREATE POLICY "settings_write_admin" ON app_settings
  FOR ALL USING (is_super_admin());

-- WHATSAPP TEMPLATES + RESOURCES
CREATE POLICY "templates_internal" ON whatsapp_templates
  FOR ALL USING (is_internal());
CREATE POLICY "resources_internal" ON resources
  FOR ALL USING (is_internal());

-- STAFF PROFILES
CREATE POLICY "staff_profiles_internal" ON staff_profiles
  FOR ALL USING (is_internal());

-- PARTNER PAYOUTS
CREATE POLICY "partner_payouts_internal" ON partner_payouts
  FOR SELECT USING (is_internal());
CREATE POLICY "partner_payouts_admin_write" ON partner_payouts
  FOR ALL USING (is_admin());
CREATE POLICY "partner_payouts_own" ON partner_payouts
  FOR SELECT USING (
    is_partner() AND
    partner_id IN (
      SELECT id FROM partners WHERE 
      email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );
