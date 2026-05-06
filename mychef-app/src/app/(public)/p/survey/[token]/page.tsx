import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateShort } from '@/lib/utils/dates'
import { SurveyForm } from './survey-form'
import { Calendar, MapPin, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SurveyPage({ params }: { params: { token: string } }) {
  const supabase = await createClient()

  const { data: booking } = await supabase
    .from('bookings')
    .select('id, event_date, venue_name, guests, survey_token, customers(name), partners(company_name, villa_name)')
    .eq('survey_token', params.token)
    .single() as any

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <h1 className="text-xl font-medium text-error">Invalid Survey Link</h1>
          <p className="mt-4 text-text-muted">This survey link is no longer valid.</p>
        </Card>
      </div>
    )
  }

  const { data: template } = await supabase
    .from('survey_templates')
    .select('id')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single() as any

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <h1 className="text-xl font-medium text-error">Survey Unavailable</h1>
          <p className="mt-4 text-text-muted">There is no active survey at this time.</p>
        </Card>
      </div>
    )
  }

  const { data: questions } = (await supabase
    .from('survey_questions')
    .select('*')
    .eq('template_id', template.id)
    .order('display_order', { ascending: true })) as { data: any[] | null }

  const customerName = (booking.customers as any)?.name || 'Guest'
  const partner = booking.partners as any

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-accent">myCHEF</h1>
          <p className="mt-2 text-sm text-text-muted">We value your feedback</p>
        </div>

        <Card className="p-6">
          <div className="mb-4">
            <Badge status="completed">Event Feedback</Badge>
          </div>
          <h2 className="text-lg font-medium">How was your experience, {customerName}?</h2>

          <div className="mt-4 space-y-2 text-sm text-text-muted">
            {booking.event_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDateShort(booking.event_date)}</span>
              </div>
            )}
            {booking.venue_name && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{booking.venue_name}</span>
              </div>
            )}
            {booking.guests && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{booking.guests} guests</span>
              </div>
            )}
            {partner?.villa_name && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{partner.villa_name}</span>
              </div>
            )}
          </div>
        </Card>

        <SurveyForm bookingId={booking.id} token={params.token} questions={questions || []} />
      </div>
    </div>
  )
}
