import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatIDR } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/dates'
import { demoBookings } from '@/lib/demo-data'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock, MapPin, Users, FileText } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PartnerBookingDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: bookingRaw } = await supabase
    .from('bookings')
    .select('*, booking_calculations(*), booking_items(*)')
    .eq('id', params.id)
    .single() as any

  const booking = bookingRaw || demoBookings.find(b => b.id === params.id)

  if (!booking) {
    return (
      <FadeIn>
        <p className="py-8 text-center text-text-muted">Booking not found</p>
      </FadeIn>
    )
  }

  const calc = booking.booking_calculations as any
  const items = (booking.booking_items as any[]) || []

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center gap-2">
          <Link href="/bookings">
            <ArrowLeft className="h-5 w-5 text-text-muted" />
          </Link>
          <h1 className="text-lg font-medium">Booking #{booking.reference}</h1>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <Badge variant={booking.status}>{booking.status}</Badge>
            {calc?.total_revenue && (
              <span className="text-lg font-semibold text-accent">
                {formatIDR(calc.total_revenue)}
              </span>
            )}
          </div>
        </Card>
      </FadeIn>

      <section>
        <FadeIn delay={0.2}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Event Details</h2>
        </FadeIn>
        <FadeIn delay={0.25}>
          <Card className="space-y-3 p-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-text-muted">Date</p>
                <p className="text-sm">{booking.event_date ? formatDate(booking.event_date) : '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-text-muted">Time</p>
                <p className="text-sm">
                  {booking.event_time ? booking.event_time.slice(0, 5) : '-'}
                  {booking.event_end_time && ` - ${booking.event_end_time.slice(0, 5)}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-text-muted">Guests</p>
                <p className="text-sm">{booking.guests || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-text-muted">Venue</p>
                <p className="text-sm">{booking.venue_name || '-'}</p>
                {booking.venue_address && (
                  <p className="text-xs text-text-muted">{booking.venue_address}</p>
                )}
                {booking.venue_area && (
                  <p className="text-xs text-text-muted">{booking.venue_area}</p>
                )}
              </div>
            </div>
            {booking.notes && (
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-4 w-4 text-accent" />
                <div>
                  <p className="text-xs text-text-muted">Notes</p>
                  <p className="text-sm whitespace-pre-wrap">{booking.notes}</p>
                </div>
              </div>
            )}
          </Card>
        </FadeIn>
      </section>

      {items.length > 0 && (
        <section>
          <FadeIn delay={0.3}>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Menu & Items</h2>
          </FadeIn>
          <FadeIn delay={0.35}>
            <Card className="divide-y divide-border">
              {items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-3">
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-text-muted">
                      {item.quantity} &times; {formatIDR(item.unit_price)}
                    </p>
                  </div>
                  <span className="text-sm font-medium">{formatIDR(item.subtotal)}</span>
                </div>
              ))}
            </Card>
          </FadeIn>
        </section>
      )}

      {calc && (
        <section>
          <FadeIn delay={0.4}>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Financial Summary</h2>
          </FadeIn>
          <FadeIn delay={0.45}>
            <Card className="space-y-2 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Total Revenue</span>
                <span className="font-medium">{formatIDR(calc.total_revenue)}</span>
              </div>
              {calc.food_revenue > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Food</span>
                  <span>{formatIDR(calc.food_revenue)}</span>
                </div>
              )}
              {calc.drink_revenue > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Drinks</span>
                  <span>{formatIDR(calc.drink_revenue)}</span>
                </div>
              )}
              {calc.partner_commission > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Partner Commission</span>
                  <span className="text-accent">{formatIDR(calc.partner_commission)}</span>
                </div>
              )}
              <div className="border-t border-border pt-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Gross Profit</span>
                  <span className={calc.gross_profit >= 0 ? 'text-success' : 'text-error'}>
                    {formatIDR(calc.gross_profit)}
                  </span>
                </div>
              </div>
            </Card>
          </FadeIn>
        </section>
      )}
    </div>
  )
}
