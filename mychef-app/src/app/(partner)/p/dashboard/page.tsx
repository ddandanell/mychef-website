import { createClient } from '@/lib/supabase/server'
import { demoPartners, demoBookings, demoPayouts } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatIDRShort } from '@/lib/utils/currency'
import { formatDateShort } from '@/lib/utils/dates'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import Link from 'next/link'
import { CalendarDays, TrendingUp, Clock, Star, AlertCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PartnerDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: partnerRaw } = await supabase
    .from('partners')
    .select('id, company_name, status, commission_rate')
    .eq('id', user?.id || '')
    .single() as any

  const partner = partnerRaw || demoPartners[0]

  if (!partner) {
    return (
      <FadeIn>
        <div className="py-8 text-center">
          <p className="text-text-muted">Partner profile not found</p>
        </div>
      </FadeIn>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  const [
    { data: bookingsRaw },
    { data: payoutsRaw },
  ] = (await Promise.all([
    supabase
      .from('bookings')
      .select('id, reference, event_date, event_time, guests, status, venue_name, booking_calculations(total_revenue)')
      .eq('partner_id', partner.id)
      .order('event_date', { ascending: true })
      .limit(10),
    supabase
      .from('partner_payouts')
      .select('id, amount, due_date, status')
      .eq('partner_id', partner.id)
      .order('due_date', { ascending: true })
      .limit(10),
  ])) as { data: any[] | null }[]

  const bookings = (bookingsRaw as any[])?.length ? bookingsRaw : demoBookings
  const payouts = (payoutsRaw as any[])?.length ? payoutsRaw : demoPayouts

  const upcomingBookings = bookings?.filter(b => b.event_date && b.event_date >= today) || []
  const totalRevenue = bookings?.reduce((sum, b) => sum + ((b.booking_calculations as any)?.total_revenue || 0), 0) || 0
  const pendingPayouts = payouts?.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0) || 0

  return (
    <div className="space-y-6">
      <FadeIn>
        <Card className="p-4">
          <h1 className="text-lg font-medium">{partner.company_name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant={partner.status}>{partner.status}</Badge>
            <span className="text-xs text-text-muted">{partner.commission_rate}% commission</span>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-accent" />
              <span className="text-xs text-text-muted">Upcoming</span>
            </div>
            <p className="mt-1 text-2xl font-semibold">{upcomingBookings.length}</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-xs text-text-muted">Total Rev</span>
            </div>
            <p className="mt-1 text-2xl font-semibold">{formatIDRShort(totalRevenue)}</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-xs text-text-muted">Pending</span>
            </div>
            <p className="mt-1 text-2xl font-semibold">{formatIDRShort(pendingPayouts)}</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-success" />
              <span className="text-xs text-text-muted">All Bookings</span>
            </div>
            <p className="mt-1 text-2xl font-semibold">{bookings?.length || 0}</p>
          </Card>
        </div>
      </FadeIn>

      <section>
        <FadeIn delay={0.2}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Upcoming Bookings</h2>
        </FadeIn>
        {upcomingBookings.length > 0 ? (
          <StaggerContainer className="space-y-2">
            {upcomingBookings.map((booking) => (
              <StaggerItem key={booking.id}>
                <Link href={`/bookings/${booking.id}`}>
                  <Card className="p-3 transition-colors hover:bg-surface/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant={booking.status}>{booking.status}</Badge>
                          <span className="text-sm">{booking.venue_name || 'No venue'}</span>
                        </div>
                        <p className="mt-1 text-xs text-text-muted">
                          {booking.event_date ? formatDateShort(booking.event_date) : ''}
                          {booking.event_time && ` · ${booking.event_time.slice(0, 5)}`}
                          {booking.guests && ` · ${booking.guests} guests`}
                        </p>
                      </div>
                      {(booking.booking_calculations as any)?.total_revenue && (
                        <p className="text-xs text-accent">{formatIDRShort((booking.booking_calculations as any).total_revenue)}</p>
                      )}
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.2}>
            <p className="py-4 text-center text-sm text-text-muted">No upcoming bookings</p>
          </FadeIn>
        )}
      </section>

      <section>
        <FadeIn delay={0.3}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Payouts</h2>
        </FadeIn>
        {payouts && payouts.length > 0 ? (
          <StaggerContainer className="space-y-2">
            {payouts.map((payout) => (
              <StaggerItem key={payout.id}>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{formatDateShort(payout.due_date)}</p>
                      <p className="text-xs text-text-muted">{formatIDRShort(payout.amount)}</p>
                    </div>
                    <Badge variant={payout.status}>{payout.status}</Badge>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.3}>
            <p className="py-4 text-center text-sm text-text-muted">No payouts</p>
          </FadeIn>
        )}
      </section>
    </div>
  )
}
