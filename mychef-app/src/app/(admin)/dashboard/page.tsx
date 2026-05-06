import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Fab } from '@/components/ui/fab'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import { formatIDRShort } from '@/lib/utils/currency'
import { formatDateShort } from '@/lib/utils/dates'
import { demoLeads, demoBookings } from '@/lib/demo-data'
import Link from 'next/link'
import { CalendarDays, Users, TrendingUp, Clock, Star, AlertCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const [
    { data: todaysEventsRaw },
    { data: followUpsRaw },
    { data: pipelineKPIsRaw },
    { data: revenueDataRaw },
    { data: recentFeedbackRaw },
  ] = await Promise.all([
    supabase.from('bookings').select('id, reference, event_date, event_time, venue_name, status, guests, customers(name)').eq('event_date', today).order('event_time', { ascending: true }).limit(5),
    supabase.from('leads').select('id, name, status, follow_up_date, estimated_value, is_hot').lte('follow_up_date', today).neq('status', 'lost').neq('status', 'cancelled').neq('status', 'completed').order('follow_up_date', { ascending: true }).limit(10),
    supabase.from('leads').select('status, estimated_value', { count: 'exact' }).or('status.eq.new,status.eq.contacted,status.eq.qualified,status.eq.offer_sent,status.eq.offer_viewed,status.eq.awaiting_payment,status.eq.payment_submitted,status.eq.confirmed'),
    supabase.from('bookings').select('id, status, booking_calculations(total_revenue, gross_profit)').eq('status', 'confirmed').gte('event_date', today),
    supabase.from('survey_responses').select('id, submitted_at, survey_answers(score, text_answer, survey_questions(question_text))').order('submitted_at', { ascending: false }).limit(5),
  ]) as any

  const todaysEvents = (todaysEventsRaw as any[])?.length ? todaysEventsRaw : demoBookings.filter(b => b.event_date === today)
  const followUps = (followUpsRaw as any[])?.length ? followUpsRaw : demoLeads.slice(0, 3)
  const pipelineKPIs = pipelineKPIsRaw || demoLeads
  const revenueData = (revenueDataRaw as any[])?.length ? revenueDataRaw : demoBookings
  const recentFeedback = recentFeedbackRaw || []

  const newLeads = pipelineKPIs?.filter((l: any) => l.status === 'new').length || 0
  const offersSent = pipelineKPIs?.filter((l: any) => ['offer_sent', 'offer_viewed'].includes(l.status)).length || 0
  const awaitingPayment = pipelineKPIs?.filter((l: any) => ['awaiting_payment', 'payment_submitted'].includes(l.status)).length || 0
  const confirmedPipeline = pipelineKPIs?.filter((l: any) => l.status === 'confirmed').length || 0

  const totalRevenue = revenueData?.reduce((sum: number, b: any) => sum + ((b.booking_calculations as any)?.total_revenue || 0), 0) || 0
  const avgScore = recentFeedback?.length
    ? (recentFeedback.reduce((sum: number, r: any) => {
        const answers = (r.survey_answers as any[]) || []
        const scores = answers.filter(a => a.score).map(a => a.score)
        return sum + (scores.length ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length : 0)
      }, 0) / recentFeedback.length)
    : 0

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <span className="text-xs text-text-muted">New Leads</span>
            </div>
            <p className="mt-1 text-2xl font-semibold">{newLeads}</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-xs text-text-muted">Pipeline</span>
            </div>
            <p className="mt-1 text-2xl font-semibold">{offersSent}</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-xs text-text-muted">Awaiting Pay</span>
            </div>
            <p className="mt-1 text-2xl font-semibold">{awaitingPayment}</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-success" />
              <span className="text-xs text-text-muted">Confirmed</span>
            </div>
            <p className="mt-1 text-2xl font-semibold">{confirmedPipeline}</p>
          </Card>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-text-muted">Upcoming Revenue</p>
              <p className="mt-1 text-2xl font-semibold text-accent">{formatIDRShort(totalRevenue)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-accent/20" />
          </div>
        </Card>
      </FadeIn>

      <section>
        <FadeIn delay={0.15}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Today&apos;s Events</h2>
        </FadeIn>
        <StaggerContainer className="space-y-2">
          {todaysEvents && todaysEvents.length > 0 ? (
            todaysEvents.map((event: any) => (
              <StaggerItem key={event.id}>
                <Link href={`/bookings/${event.id}`}>
                  <Card className="flex items-center justify-between p-3 transition-colors hover:bg-surface/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={event.status}>{event.status}</Badge>
                        <span className="text-sm">{(event.customers as any)?.name || event.venue_name || 'No venue'}</span>
                      </div>
                      <p className="mt-1 text-xs text-text-muted">
                        {event.event_time?.slice(0, 5)} · {event.guests || 0} guests · {event.venue_area || 'Bali'}
                      </p>
                    </div>
                    <CalendarDays className="h-4 w-4 text-text-muted" />
                  </Card>
                </Link>
              </StaggerItem>
            ))
          ) : (
            <FadeIn>
              <p className="py-4 text-center text-sm text-text-muted">No events today</p>
            </FadeIn>
          )}
        </StaggerContainer>
      </section>

      <section>
        <FadeIn delay={0.2}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Follow-ups Due</h2>
        </FadeIn>
        <StaggerContainer className="space-y-2">
          {followUps && followUps.length > 0 ? (
            followUps.map((lead: any) => (
              <StaggerItem key={lead.id}>
                <Link href={`/leads/${lead.id}`}>
                  <Card className={`p-3 transition-colors hover:bg-surface/80 ${lead.is_hot ? 'border-l-2 border-l-accent' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{lead.name}</span>
                          {lead.is_hot && <Badge variant="hot">HOT</Badge>}
                        </div>
                        <p className="mt-1 text-xs text-text-muted">
                          <Badge variant={lead.status}>{lead.status}</Badge>
                          {' · '}
                          {lead.estimated_value ? formatIDRShort(lead.estimated_value) : 'No value'}
                        </p>
                      </div>
                      <AlertCircle className={`h-4 w-4 ${lead.is_hot ? 'text-error' : 'text-text-muted'}`} />
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))
          ) : (
            <FadeIn>
              <p className="py-4 text-center text-sm text-text-muted">No follow-ups due</p>
            </FadeIn>
          )}
        </StaggerContainer>
      </section>

      <FadeIn delay={0.25}>
        <section>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Recent Feedback</h2>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-sm">Avg Score: {avgScore.toFixed(1)}/5</span>
            </div>
            {recentFeedback && recentFeedback.length > 0 ? (
              <div className="mt-3 space-y-2">
                {recentFeedback.slice(0, 3).map((r: any) => {
                  const answers = (r.survey_answers as any[]) || []
                  const openText = answers.find((a: any) => a.text_answer)?.text_answer
                  return openText ? (
                    <p key={r.id} className="text-xs text-text-muted line-clamp-2">
                      &ldquo;{openText}&rdquo;
                    </p>
                  ) : null
                })}
              </div>
            ) : (
              <p className="mt-2 text-xs text-text-muted">No recent feedback</p>
            )}
          </Card>
        </section>
      </FadeIn>

      <Fab href="/bookings/new" />
    </div>
  )
}
