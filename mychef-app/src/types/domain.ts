export interface KPIData {
  newInquiries: number
  offersSent: number
  offersAccepted: number
  upcomingEvents: number
  upcomingRevenue: number
  pendingRevenue: number
  confirmedRevenue: number
  completedThisMonth: number
  avgFoodScore: number | null
  avgChefScore: number | null
  avgConceptScore: number | null
  newSurveyResponses: number
  todaysEvents: TodayEvent[]
  todaysFollowups: FollowupItem[]
}

export interface TodayEvent {
  id: string
  reference: string
  event_time: string | null
  venue_name: string | null
  guests: number | null
  menu_name: string | null
}

export interface FollowupItem {
  id: string
  name: string
  type: 'lead' | 'prospect'
  follow_up_date: string
  whatsapp: string | null
  status: string
}

export type UserRole = 'super_admin' | 'admin' | 'staff' | 'financial_viewer' | 'partner'

export type BookingStatus =
  | 'draft'
  | 'offer_sent'
  | 'offer_viewed'
  | 'offer_accepted'
  | 'awaiting_payment'
  | 'payment_submitted'
  | 'payment_confirmed'
  | 'confirmed'
  | 'completed'
  | 'cancelled'

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'offer_sent'
  | 'offer_viewed'
  | 'offer_accepted'
  | 'awaiting_payment'
  | 'payment_submitted'
  | 'payment_confirmed'
  | 'confirmed'
  | 'completed'
  | 'lost'
  | 'cancelled'

export type PartnerStatus = 'invited' | 'pending' | 'approved' | 'active' | 'suspended'

export type ProspectStatus = 'prospect' | 'contacted' | 'interested' | 'onboarding_sent' | 'converted'
