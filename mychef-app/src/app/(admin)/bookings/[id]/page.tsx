import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatIDR } from '@/lib/utils/currency'
import { formatDateShort } from '@/lib/utils/dates'
import { demoBookings } from '@/lib/demo-data'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, MapPin, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function BookingDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: bookingRaw } = await supabase
    .from('bookings')
    .select('*, customers(name, phone, email), partners(company_name), b2b_customers(company_name), booking_calculations(*)')
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

  const { data: itemsRaw } = (await supabase
    .from('booking_items')
    .select('*')
    .eq('booking_id', params.id)
    .order('created_at')) as { data: any[] | null }

  const items = itemsRaw?.length ? itemsRaw : []
  const calc = booking.booking_calculations as any

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
          <div className="flex items-start justify-between">
            <div>
              <Badge variant={booking.status}>{booking.status}</Badge>
              <h2 className="mt-2 text-xl font-medium">
                {(booking.customers as any)?.name || (booking.partners as any)?.company_name || 'Guest'}
              </h2>
            </div>
            {calc?.total_revenue && (
              <p className="text-lg text-accent">{formatIDR(calc.total_revenue)}</p>
            )}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            {booking.event_date && (
              <div className="flex items-center gap-2 text-text-muted">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDateShort(booking.event_date)} {booking.event_time?.slice(0, 5)}</span>
              </div>
            )}
            {booking.venue_name && (
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin className="h-4 w-4" />
                <span>{booking.venue_name}{booking.venue_area && `, ${booking.venue_area}`}</span>
              </div>
            )}
            {booking.guests && (
              <div className="flex items-center gap-2 text-text-muted">
                <Users className="h-4 w-4" />
                <span>{booking.guests} guests</span>
              </div>
            )}
          </div>
        </Card>
      </FadeIn>

      {calc && (
        <FadeIn delay={0.2}>
          <Card className="p-4">
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Financial Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Revenue</span>
                <span>{formatIDR(calc.total_revenue || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Ingredients</span>
                <span className="text-error">-{formatIDR(calc.ingredients_cost || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Staff</span>
                <span className="text-error">-{formatIDR(calc.staff_cost || 0)}</span>
              </div>
              {calc.partner_commission > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Commission</span>
                  <span className="text-error">-{formatIDR(calc.partner_commission || 0)}</span>
                </div>
              )}
              <div className="border-t border-border pt-2">
                <div className="flex justify-between font-medium">
                  <span>Profit</span>
                  <span className={calc.gross_profit >= 0 ? 'text-success' : 'text-error'}>
                    {formatIDR(calc.gross_profit || 0)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>
      )}

      <section>
        <FadeIn delay={0.3}>
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">Items</h3>
        </FadeIn>
        {items && items.length > 0 ? (
          <StaggerContainer className="space-y-2">
            {items.map((item: any) => (
              <StaggerItem key={item.id}>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-text-muted">
                        {item.quantity}x @ {formatIDR(item.unit_price)}
                      </p>
                    </div>
                    <p className="text-sm text-accent">{formatIDR(item.subtotal)}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.3}>
            <p className="py-4 text-center text-sm text-text-muted">No items yet</p>
          </FadeIn>
        )}
      </section>
    </div>
  )
}
