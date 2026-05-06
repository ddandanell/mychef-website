CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  public_token UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  body TEXT NOT NULL,
  variables TEXT[] DEFAULT '{}',
  category TEXT CHECK (category IN (
    'offer', 'payment', 'confirmation', 
    'survey', 'partner', 'outreach'
  )),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed WhatsApp templates
INSERT INTO whatsapp_templates (name, body, variables, category) VALUES
(
  'Send Offer',
  'Hi {{name}}, thank you for your interest in myCHEF! 🍽️

We have prepared a private dining offer exclusively for you.

📋 View and accept your offer here:
{{offer_link}}

This offer expires in {{expiry_hours}} hours.

We look forward to creating an unforgettable evening for you!

— The myCHEF Team',
  ARRAY['name', 'offer_link', 'expiry_hours'],
  'offer'
),
(
  'Payment Request',
  'Hi {{name}}, your myCHEF booking has been accepted! 🎉

To secure your date, a 25% deposit of IDR {{amount}} is required.

💳 Complete your payment here:
{{payment_link}}

Payment deadline: {{deadline}}

— The myCHEF Team',
  ARRAY['name', 'amount', 'payment_link', 'deadline'],
  'payment'
),
(
  'Payment Received',
  'Hi {{name}}! ✅

We have received your payment confirmation and will verify within {{response_time}}.

You will hear from us shortly!

— The myCHEF Team',
  ARRAY['name', 'response_time'],
  'payment'
),
(
  'Payment Confirmed',
  'Hi {{name}}! 🎊

Your myCHEF booking is fully confirmed!

📅 Date: {{event_date}}
👥 Guests: {{guests}}
📍 Venue: {{venue_name}}

You will shortly receive your invitation to share with your guests.

We look forward to your evening!

— The myCHEF Team',
  ARRAY['name', 'event_date', 'guests', 'venue_name'],
  'confirmation'
),
(
  'Send Survey',
  'Hi {{name}}! 

We hope you had a wonderful myCHEF evening! 🍽️✨

We would love to hear your thoughts — it only takes 2 minutes:
{{survey_link}}

Your feedback helps us make every experience even better.

Thank you!
— The myCHEF Team',
  ARRAY['name', 'survey_link'],
  'survey'
),
(
  'Partner Booking Confirmation',
  'Hi {{partner_name}}! 

Your myCHEF booking request has been confirmed. 🎉

📅 Date: {{event_date}}
👥 Guests: {{guests}}
📍 Villa: {{villa_name}}
💰 Your commission: IDR {{commission}}

⚠️ Please note: Cancellations made less than 48 hours before the event will incur a 50% cancellation fee as per your partner agreement.

We look forward to working with you!

— The myCHEF Team',
  ARRAY['partner_name', 'event_date', 'guests', 'villa_name', 'commission'],
  'partner'
),
(
  'Late Cancellation Invoice',
  'Hi {{partner_name}},

We are writing regarding the cancellation of booking {{reference}} for {{event_date}}.

As this cancellation was made less than 48 hours before the scheduled event, a cancellation fee applies as per your partner agreement.

💳 Invoice amount: IDR {{amount}}
📅 Payment due: {{due_date}}

Please arrange payment within 14 days to avoid further action.

— The myCHEF Team',
  ARRAY['partner_name', 'reference', 'event_date', 'amount', 'due_date'],
  'partner'
);
