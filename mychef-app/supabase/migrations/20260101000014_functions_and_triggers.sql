-- Useful indexes for performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_follow_up_date ON leads(follow_up_date);
CREATE INDEX idx_leads_event_date ON leads(event_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_event_date ON bookings(event_date);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_partner ON bookings(partner_id);
CREATE INDEX idx_bookings_offer_token ON bookings(offer_token);
CREATE INDEX idx_bookings_survey_token ON bookings(survey_token);
CREATE INDEX idx_partner_prospects_status ON partner_prospects(status);
CREATE INDEX idx_partner_prospects_follow_up ON partner_prospects(follow_up_date);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_survey_responses_token ON survey_responses(token);
CREATE INDEX idx_partner_certificates_token ON partner_certificates(token);

-- Mark overdue partner payouts
CREATE OR REPLACE FUNCTION mark_overdue_payouts()
RETURNS void AS $$
BEGIN
  UPDATE partner_payouts 
  SET status = 'overdue'
  WHERE status = 'pending' AND due_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Mark cold prospects
CREATE OR REPLACE FUNCTION mark_cold_prospects()
RETURNS void AS $$
DECLARE
  cold_days INTEGER;
BEGIN
  SELECT (value::TEXT)::INTEGER INTO cold_days
  FROM app_settings WHERE key = 'cold_prospect_days';
  cold_days := COALESCE(cold_days, 30);

  UPDATE partner_prospects
  SET is_cold = true
  WHERE last_activity_at < NOW() - (cold_days || ' days')::INTERVAL
    AND status NOT IN ('converted')
    AND is_cold = false;
END;
$$ LANGUAGE plpgsql;

-- Update returning customer flag
CREATE OR REPLACE FUNCTION update_returning_customer()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE customers SET is_returning = true
  WHERE id = NEW.customer_id
    AND (
      SELECT COUNT(*) FROM bookings 
      WHERE customer_id = NEW.customer_id 
        AND status NOT IN ('draft', 'cancelled')
    ) > 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER returning_customer_trigger
  AFTER INSERT ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_returning_customer();

-- Verify offer token (server-side only)
CREATE OR REPLACE FUNCTION verify_offer_token(p_token UUID)
RETURNS TABLE(booking_id UUID, is_valid BOOLEAN, is_expired BOOLEAN) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id,
    (b.status NOT IN ('cancelled') AND b.offer_token = p_token) AS is_valid,
    (b.offer_expires_at IS NOT NULL AND b.offer_expires_at < NOW()) AS is_expired
  FROM bookings b
  WHERE b.offer_token = p_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verify survey token (single-use)
CREATE OR REPLACE FUNCTION verify_survey_token(p_token UUID)
RETURNS TABLE(response_id UUID, booking_id UUID, is_valid BOOLEAN) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sr.id,
    sr.booking_id,
    (NOT sr.token_used) AS is_valid
  FROM survey_responses sr
  WHERE sr.token = p_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Use survey token (marks as used)
CREATE OR REPLACE FUNCTION use_survey_token(p_token UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_used BOOLEAN;
BEGIN
  SELECT token_used INTO v_used
  FROM survey_responses WHERE token = p_token;
  
  IF v_used OR NOT FOUND THEN RETURN false; END IF;
  
  UPDATE survey_responses 
  SET token_used = true, submitted_at = NOW()
  WHERE token = p_token;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
