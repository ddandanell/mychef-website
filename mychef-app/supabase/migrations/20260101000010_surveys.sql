CREATE TABLE survey_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE survey_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID NOT NULL REFERENCES survey_templates(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('score_1_5', 'open_text')),
  display_order INTEGER NOT NULL DEFAULT 0,
  is_locked BOOLEAN DEFAULT false,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  token UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  token_used BOOLEAN DEFAULT false,
  respondent_name TEXT,
  respondent_type TEXT CHECK (respondent_type IN ('customer', 'b2b_partner')),
  is_new BOOLEAN DEFAULT true,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE survey_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  response_id UUID NOT NULL REFERENCES survey_responses(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES survey_questions(id),
  score INTEGER CHECK (score BETWEEN 1 AND 5),
  text_answer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default survey template
WITH template AS (
  INSERT INTO survey_templates (name, is_active) 
  VALUES ('Standard myCHEF Survey', true)
  RETURNING id
)
INSERT INTO survey_questions 
  (template_id, question_text, type, display_order, is_locked, is_required)
SELECT 
  template.id, q.question_text, q.type, q.display_order, q.is_locked, true
FROM template, (VALUES
  ('How was the food?', 'score_1_5', 1, false),
  ('How was the chef?', 'score_1_5', 2, false),
  ('How was the concept?', 'score_1_5', 3, false),
  ('How was the service?', 'score_1_5', 4, false),
  ('If you owned our concept, what would you do differently?', 'open_text', 99, true)
) AS q(question_text, type, display_order, is_locked);

-- After chef avg drops below 3.5 over 3 events, set alert
CREATE OR REPLACE FUNCTION check_chef_performance()
RETURNS TRIGGER AS $$
DECLARE
  v_chef_id UUID;
  v_avg DECIMAL(3,2);
BEGIN
  SELECT b.assigned_chef INTO v_chef_id
  FROM bookings b WHERE b.id = NEW.booking_id;
  
  IF v_chef_id IS NULL THEN RETURN NEW; END IF;

  SELECT AVG(sa.score) INTO v_avg
  FROM survey_answers sa
  JOIN survey_responses sr ON sa.response_id = sr.id
  JOIN survey_questions sq ON sa.question_id = sq.id
  JOIN bookings b ON sr.booking_id = b.id
  WHERE b.assigned_chef = v_chef_id
    AND sq.question_text ILIKE '%chef%'
    AND sa.score IS NOT NULL
  LIMIT 3;

  IF v_avg IS NOT NULL AND v_avg < 3.5 THEN
    UPDATE staff_profiles SET low_score_alert = true, avg_score = v_avg
    WHERE profile_id = v_chef_id;
  ELSE
    UPDATE staff_profiles SET low_score_alert = false, avg_score = v_avg
    WHERE profile_id = v_chef_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER chef_performance_check
  AFTER INSERT ON survey_answers
  FOR EACH ROW EXECUTE FUNCTION check_chef_performance();
