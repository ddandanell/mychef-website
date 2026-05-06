import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateShort } from '@/lib/utils/dates'
import { Calendar, Clock, MapPin, Users, Utensils } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function InvitationPage({ params }: { params: { token: string } }) {
  const supabase = await createClient()

  const { data: booking } = await supabase
    .from('bookings')
    .select('event_date, event_time, venue_name, venue_address, guests, customers(name), partners(company_name, villa_name), menus(name, description)')
    .eq('offer_token', params.token)
    .single() as any

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <h1 className="text-xl font-medium text-error">Invitation Not Found</h1>
          <p className="mt-4 text-text-muted">This invitation link is invalid.</p>
        </Card>
      </div>
    )
  }

  const customerName = (booking.customers as any)?.name || 'Guest'
  const partner = booking.partners as any
  const menu = booking.menus as any

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-accent">myCHEF</h1>
          <p className="mt-2 text-sm text-text-muted">Exclusive Private Dining</p>
        </div>

        <Card className="p-8 text-center">
          <Badge status="confirmed" className="mb-4">Invitation</Badge>
          <h2 className="text-2xl font-medium text-text-primary">You're Invited</h2>
          <p className="mt-2 text-accent">{customerName}</p>

          <div className="my-6 space-y-3 border-y border-border py-6 text-sm text-text-muted">
            {booking.event_date && (
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{formatDateShort(booking.event_date)}</span>
              </div>
            )}
            {booking.event_time && (
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span>{booking.event_time.slice(0, 5)}</span>
              </div>
            )}
            {booking.venue_name && (
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{booking.venue_name}</span>
              </div>
            )}
            {booking.venue_address && (
              <p className="text-xs">{booking.venue_address}</p>
            )}
            {booking.guests && (
              <div className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <span>{booking.guests} guests</span>
              </div>
            )}
          </div>

          {menu && (
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-text-primary">
                <Utensils className="h-4 w-4 text-accent" />
                <span>{menu.name}</span>
              </div>
              {menu.description && (
                <p className="text-xs text-text-muted">{menu.description}</p>
              )}
            </div>
          )}

          {partner?.villa_name && (
            <p className="mt-6 text-xs text-text-muted">Hosted at {partner.villa_name}</p>
          )}
        </Card>
      </div>
    </div>
  )
}
