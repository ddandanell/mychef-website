import { createClient } from '@/lib/supabase/server'
import { demoPartners, demoBookings } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatIDRShort } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/dates'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import Link from 'next/link'
import { CalendarDays, Users, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PartnerBookingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: partnerRaw } = await supabase
    .from('partners')
    .select('id')
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

  const { data: bookingsRaw } = (await supabase
    .from('bookings')
    .select('id, reference, event_date, event_time, guests, status, venue_name, booking_calculations(total_revenue)')
    .eq('partner_id', partner.id)
    .order('event_date', { ascending: false })) as { data: any[] | null }
  const bookings = (bookingsRaw as any[])?.length ? bookingsRaw : demoBookings

  return (
    <div className="space-y-4">
      <FadeIn>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">Bookings</h1>
          <span className="text-xs text-text-muted">{bookings?.length || 0} total</span>
        </div>
      </FadeIn>

      {bookings && bookings.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {bookings.map((booking) => (
            <StaggerItem key={booking.id}>
              <Link href={`/bookings/${booking.id}`}>
                <Card className="p-3 transition-colors hover:bg-surface/80">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge status={booking.status}>{booking.status}</Badge>
                        <span className="truncate text-sm font-medium">#{booking.reference}</span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
                        {booking.event_date && (
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {formatDate(booking.event_date)}
                            {booking.event_time && ` · ${booking.event_time.slice(0, 5)}`}
                          </span>
                        )}
                        {booking.guests && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {booking.guests} guests
                          </span>
                        )}
                        {booking.venue_name && (
                          <span className="truncate">{booking.venue_name}</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-2 flex flex-col items-end gap-1">
                      {(booking.booking_calculations as any)?.total_revenue ? (
                        <span className="text-sm font-medium text-accent">
                          {formatIDRShort((booking.booking_calculations as any).total_revenue)}
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">-</span>
                      )}
                      <ArrowRight className="h-4 w-4 text-text-muted" />
                    </div>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn>
          <p className="py-8 text-center text-sm text-text-muted">No bookings found</p>
        </FadeIn>
      )}
    </div>
  )
}
