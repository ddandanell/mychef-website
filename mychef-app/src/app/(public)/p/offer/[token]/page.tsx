import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatIDR } from '@/lib/utils/currency'
import { formatDateShort } from '@/lib/utils/dates'
import Link from 'next/link'
import { Clock, Users, MapPin, CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function OfferPage({ params }: { params: { token: string } }) {
  const supabase = await createClient()

  const { data: booking } = await supabase
    .from('bookings')
    .select('*, customers(name), menus(name, type, price_per_person, description), partners(company_name, villa_name)')
    .eq('offer_token', params.token)
    .single() as any

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <h1 className="text-xl font-medium text-error">Invalid Offer</h1>
          <p className="mt-4 text-text-muted">This offer link is no longer valid.</p>
        </Card>
      </div>
    )
  }

  const isExpired = booking.offer_expires_at && new Date(booking.offer_expires_at) < new Date()
  const menu = booking.menus as any
  const customerName = (booking.customers as any)?.name || 'Guest'

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-accent">myCHEF</h1>
          <p className="mt-2 text-sm text-text-muted">Exclusive Private Dining Experience</p>
        </div>

        <Card className="p-6">
          <div className="mb-4">
            <Badge variant={booking.status}>{booking.status}</Badge>
          </div>

          <h2 className="text-xl font-medium">Personalized Offer for {customerName}</h2>

          {menu && (
            <div className="mt-4">
              <h3 className="font-medium">{menu.name}</h3>
              <p className="mt-1 text-sm text-text-muted">{menu.description}</p>
              <p className="mt-2 text-lg text-accent">
                {formatIDR(menu.price_per_person)} <span className="text-sm text-text-muted">per person</span>
              </p>
            </div>
          )}

          <div className="mt-4 space-y-2 text-sm">
            {booking.event_date && (
              <div className="flex items-center gap-2 text-text-muted">
                <Clock className="h-4 w-4" />
                <span>{formatDateShort(booking.event_date)} {booking.event_time?.slice(0, 5)}</span>
              </div>
            )}
            {booking.guests && (
              <div className="flex items-center gap-2 text-text-muted">
                <Users className="h-4 w-4" />
                <span>{booking.guests} guests</span>
              </div>
            )}
            {booking.venue_name && (
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin className="h-4 w-4" />
                <span>{booking.venue_name}</span>
              </div>
            )}
          </div>

          {booking.offer_expires_at && (
            <p className="mt-4 text-xs text-warning">
              Offer expires: {formatDateShort(booking.offer_expires_at)}
            </p>
          )}

          {isExpired ? (
            <div className="mt-6 text-center">
              <p className="text-error">This offer has expired</p>
              <p className="mt-2 text-sm text-text-muted">Please contact us for a new quote</p>
            </div>
          ) : (
            <div className="mt-6">
              <Link href={`/p/pay/${booking.id}`}>
                <Button className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Accept Offer & Pay
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
