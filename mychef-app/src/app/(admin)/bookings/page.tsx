import { createClient } from '@/lib/supabase/server'
import { demoBookings } from '@/lib/demo-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatIDRShort } from '@/lib/utils/currency'
import { formatDateShort } from '@/lib/utils/dates'
import { Fab } from '@/components/ui/fab'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import Link from 'next/link'
import { Search } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function BookingsPage({ searchParams }: { searchParams: { q?: string; status?: string } }) {
  const supabase = await createClient()
  const query = searchParams.q || ''
  const statusFilter = searchParams.status || ''

  let dbQuery = supabase
    .from('bookings')
    .select('id, reference, status, event_date, event_time, guests, venue_name, venue_area, customers(name), booking_calculations(total_revenue)')
    .order('event_date', { ascending: true })
    .limit(50)

  if (query) {
    dbQuery = dbQuery.or(`reference.ilike.%${query}%,venue_name.ilike.%${query}%`)
  }
  if (statusFilter) {
    dbQuery = dbQuery.eq('status', statusFilter)
  }

  const { data: bookingsRaw } = (await dbQuery) as { data: any[] | null }
  const bookings = (bookingsRaw as any[])?.length ? bookingsRaw : demoBookings

  const statusOptions = ['draft', 'offer_sent', 'awaiting_payment', 'confirmed', 'completed', 'cancelled']

  return (
    <div className="space-y-4">
      <FadeIn>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-text-muted" />
          <form className="flex-1" action="/bookings">
            <Input
              name="q"
              placeholder="Search bookings..."
              defaultValue={query}
              className="h-9"
            />
          </form>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          <Link
            href="/bookings"
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${!statusFilter ? 'bg-accent text-background' : 'bg-surface text-text-muted'}`}
          >
            All
          </Link>
          {statusOptions.map((s) => (
            <Link
              key={s}
              href={`/bookings?status=${s}`}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${statusFilter === s ? 'bg-accent text-background' : 'bg-surface text-text-muted'}`}
            >
              {s}
            </Link>
          ))}
        </div>
      </FadeIn>

      {bookings && bookings.length > 0 ? (
        <StaggerContainer className="space-y-2">
          {bookings.map((booking) => (
            <StaggerItem key={booking.id}>
              <Link href={`/bookings/${booking.id}`}>
                <Card className="p-3 transition-colors hover:bg-surface/80">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-muted">#{booking.reference}</span>
                        <Badge variant={booking.status}>{booking.status}</Badge>
                      </div>
                      <p className="mt-1 truncate text-sm font-medium">
                        {(booking.customers as any)?.name || booking.venue_name || 'No venue'}
                      </p>
                      <p className="text-xs text-text-muted">
                        {booking.event_date ? formatDateShort(booking.event_date) : 'No date'}
                        {booking.event_time && ` · ${booking.event_time.slice(0, 5)}`}
                        {booking.guests && ` · ${booking.guests} guests`}
                      </p>
                    </div>
                    <div className="ml-2 text-right">
                      {(booking.booking_calculations as any)?.total_revenue ? (
                        <p className="text-xs text-accent">{formatIDRShort((booking.booking_calculations as any).total_revenue)}</p>
                      ) : null}
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

      <Fab href="/bookings/new" />
    </div>
  )
}
