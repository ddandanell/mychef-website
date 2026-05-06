// Demo data for testing without a connected database

export const demoLeads = [
  { id: '1', name: 'Anders Jensen', status: 'new' as const, phone: '+45 1234 5678', follow_up_date: '2026-05-06', estimated_value: 4500000, is_hot: true, event_date: '2026-05-15', created_at: '2026-05-01' },
  { id: '2', name: 'Maria Schmidt', status: 'offer_sent' as const, phone: '+49 9876 5432', follow_up_date: '2026-05-07', estimated_value: 8200000, is_hot: false, event_date: '2026-06-01', created_at: '2026-05-02' },
  { id: '3', name: 'Villa Kelapa', status: 'qualified' as const, phone: '+62 812 3456 7890', follow_up_date: '2026-05-05', estimated_value: 12000000, is_hot: true, event_date: '2026-05-20', created_at: '2026-05-03' },
  { id: '4', name: 'Emma Wilson', status: 'awaiting_payment' as const, phone: '+44 7700 900123', follow_up_date: '2026-05-08', estimated_value: 5600000, is_hot: false, event_date: '2026-05-25', created_at: '2026-05-04' },
  { id: '5', name: 'Sunset Villa Bali', status: 'confirmed' as const, phone: '+62 878 9012 3456', follow_up_date: null, estimated_value: 15000000, is_hot: false, event_date: '2026-05-10', created_at: '2026-04-28' },
]

export const demoBookings = [
  { id: '1', reference: 'MC-2026-001', status: 'confirmed' as const, event_date: '2026-05-10', event_time: '19:00', guests: 8, venue_name: 'Villa Kelapa', venue_area: 'Canggu', customers: { name: 'Sunset Villa Bali' }, booking_calculations: { total_revenue: 15000000 } },
  { id: '2', reference: 'MC-2026-002', status: 'offer_sent' as const, event_date: '2026-05-20', event_time: '18:30', guests: 12, venue_name: 'The Edge', venue_area: 'Uluwatu', customers: { name: 'Villa Kelapa' }, booking_calculations: { total_revenue: 22000000 } },
  { id: '3', reference: 'MC-2026-003', status: 'awaiting_payment' as const, event_date: '2026-05-25', event_time: '19:00', guests: 6, venue_name: 'Private Residence', venue_area: 'Seminyak', customers: { name: 'Emma Wilson' }, booking_calculations: { total_revenue: 9800000 } },
  { id: '4', reference: 'MC-2026-004', status: 'completed' as const, event_date: '2026-04-28', event_time: '18:00', guests: 10, venue_name: 'Amana Villa', venue_area: 'Ubud', customers: { name: 'Anders Jensen' }, booking_calculations: { total_revenue: 18500000 } },
  { id: '5', reference: 'MC-2026-005', status: 'draft' as const, event_date: '2026-06-05', event_time: '19:30', guests: 4, venue_name: 'TBD', venue_area: 'Canggu', customers: { name: 'Maria Schmidt' }, booking_calculations: { total_revenue: 6500000 } },
]

export const demoCustomers = [
  { id: '1', name: 'Sunset Villa Bali', phone: '+62 878 9012 3456', email: 'info@sunsetvilla.com', is_returning: true, is_vip: true },
  { id: '2', name: 'Emma Wilson', phone: '+44 7700 900123', email: 'emma@example.com', is_returning: false, is_vip: false },
  { id: '3', name: 'Anders Jensen', phone: '+45 1234 5678', email: 'anders@example.com', is_returning: true, is_vip: false },
  { id: '4', name: 'Villa Kelapa', phone: '+62 812 3456 7890', email: 'booking@villakelapa.com', is_returning: true, is_vip: true },
  { id: '5', name: 'Maria Schmidt', phone: '+49 9876 5432', email: 'maria@example.com', is_returning: false, is_vip: false },
]

export const demoPartners = [
  { id: '1', company_name: 'Sunset Villa Bali', villa_name: 'Sunset Villa', area: 'Uluwatu', villa_count: 3, status: 'active', has_kitchen: true, has_equipment: true, show_in_directory: true, commission_rate: 10 },
  { id: '2', company_name: 'Villa Kelapa', villa_name: 'Villa Kelapa', area: 'Canggu', villa_count: 1, status: 'active', has_kitchen: true, has_equipment: false, show_in_directory: true, commission_rate: 12 },
  { id: '3', company_name: 'Amana Villas', villa_name: 'Amana Ubud', area: 'Ubud', villa_count: 5, status: 'active', has_kitchen: true, has_equipment: true, show_in_directory: true, commission_rate: 8 },
]

export const demoProspects = [
  { id: '1', company_name: 'Blue Ocean Villas', area: 'Seminyak', status: 'prospect' as const, assigned_to: null },
  { id: '2', company_name: 'Hilltop Retreat', area: 'Jimbaran', status: 'interested' as const, assigned_to: 'Admin' },
  { id: '3', company_name: 'Rice Field Estate', area: 'Ubud', status: 'contacted' as const, assigned_to: 'Admin' },
]

export const demoB2B = [
  { id: '1', company_name: 'LuxStay Bali', contact_name: 'John Doe', phone: '+62 811 2222 3333', email: 'john@luxstay.com', commission_rate: 15 },
  { id: '2', company_name: 'Bali Escapes', contact_name: 'Sarah Lee', phone: '+62 822 4444 5555', email: 'sarah@baliescapes.com', commission_rate: 10 },
]

export const demoMenus = [
  { id: '1', name: '7-Course Signature', type: '7_course', description: 'A journey through modern European cuisine with Balinese influences', price_per_person: 1850000, cost_per_person: 450000, min_guests: 4 },
  { id: '2', name: '11-Course Extravaganza', type: '11_course', description: 'The ultimate private dining experience', price_per_person: 2800000, cost_per_person: 680000, min_guests: 4 },
]

export const demoProducts = [
  { id: '1', name: 'Wagyu Beef Tenderloin', category: 'food', sales_price: 350000, cost_price: 120000, unit: 'per_person' },
  { id: '2', name: 'Fine Wine Pairing', category: 'drink', sales_price: 450000, cost_price: 150000, unit: 'per_person' },
  { id: '3', name: 'Premium Table Setting', category: 'rental', sales_price: 200000, cost_price: 50000, unit: 'per_person' },
]

export const demoSuppliers = [
  { id: '1', company_name: 'Bali Premium Meats', contact_name: 'Made', phone: '+62 812 1111 2222', payment_type: 'invoice', has_delivery: true },
  { id: '2', company_name: 'Island Seafood Co', contact_name: 'Ketut', phone: '+62 823 3333 4444', payment_type: 'cash', has_delivery: true },
]

export const demoPayouts = [
  { id: '1', amount: 1500000, due_date: '2026-05-15', status: 'pending' as const },
  { id: '2', amount: 2200000, due_date: '2026-05-22', status: 'pending' as const },
  { id: '3', amount: 980000, due_date: '2026-04-30', status: 'paid' as const },
]

export const demoTeam = [
  { id: '1', full_name: 'Chef David', role: 'admin', whatsapp: '+62 812 9999 0000', is_active: true },
  { id: '2', full_name: 'Sous Chef Lisa', role: 'staff', whatsapp: '+62 813 8888 7777', is_active: true },
  { id: '3', full_name: 'Event Manager Ben', role: 'staff', whatsapp: '+62 814 7777 6666', is_active: true },
]

export const demoWhatsAppTemplates = [
  { id: '1', name: 'Initial Offer', body: 'Hi {{name}}, thank you for your interest in myCHEF. We have prepared a personalized offer for your event on {{date}}.', category: 'offer' },
  { id: '2', name: 'Payment Reminder', body: 'Hi {{name}}, this is a friendly reminder that your deposit of {{amount}} is due by {{deadline}}.', category: 'payment' },
]

export const demoAppSettings = [
  { key: 'deposit_percent', value: 25 },
  { key: 'partner_commission', value: 10 },
  { key: 'ingredients_cost', value: 15 },
  { key: 'staff_cost', value: 25 },
]
