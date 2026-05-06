CREATE TABLE app_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_by UUID REFERENCES profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO app_settings (key, value) VALUES

('payment_local_bank', '{
  "bank_name": "",
  "account_number": "",
  "account_name": ""
}'::JSONB),

('payment_international', '{
  "swift": "",
  "iban": "",
  "bank_address": "",
  "account_name": ""
}'::JSONB),

('payment_wise', '{
  "email": "",
  "paynow_id": ""
}'::JSONB),

('legal_entity', '{
  "company_name": "myCHEF",
  "address": "Bali, Indonesia",
  "tax_id": ""
}'::JSONB),

('response_time_promise', '"4 hours"'::JSONB),

('partner_contract_text', '"As a myCHEF Certified Partner, you agree to: ensure your villa is clean and ready upon our team arrival, assist and facilitate the myCHEF team during events, maintain professional standards with all guests, present the myCHEF menu to your guests, and provide 48 hours notice for any cancellations. Late cancellations (less than 48 hours) will incur a 50% cancellation fee. All bookings and payments are processed through myCHEF. Your commission (10% of food and menu items) will be transferred to your registered bank account within 7 days of event completion."'::JSONB),

('certificate_guarantee_text', '"As a myCHEF Certified Partner, this villa has met our standards for kitchen facilities, service quality, and guest experience. We stand behind every private dining experience we deliver here."'::JSONB),

('invitation_7course_default_text', '"An intimate journey through seven carefully crafted courses awaits you. Each dish has been thoughtfully designed to celebrate the finest local and imported ingredients, prepared exclusively for your evening."'::JSONB),

('invitation_11course_default_text', '"The ultimate private dining experience awaits you. Eleven exceptional courses that tell a story of culinary mastery — from delicate amuse-bouches to an unforgettable finale, prepared exclusively for your evening."'::JSONB),

('survey_send_hours_after_event', '3'::JSONB),

('adhoc_cost_approval_threshold', '500000'::JSONB),

('offer_expiry_days', '7'::JSONB),

('cold_prospect_days', '30'::JSONB),

('min_guests_default', '4'::JSONB),

('vat_rate', '11'::JSONB),

('usd_exchange_rate', '16000'::JSONB),

('public_instagram_handle', '"@mychef.id"'::JSONB),

('public_whatsapp_number', '""'::JSONB),

('public_tagline', '"Bali''s premier private dining experience"'::JSONB),

('public_event_photos', '[]'::JSONB);
