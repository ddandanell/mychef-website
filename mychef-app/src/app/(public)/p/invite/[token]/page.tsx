'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDateShort } from '@/lib/utils/dates'
import { Calendar, MapPin, Users } from 'lucide-react'

export default function InvitePage({ params }: { params: { token: string } }) {
  const [booking, setBooking] = useState<any>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dietary, setDietary] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    async function fetchBooking() {
      const { data } = await supabase
        .from('bookings')
        .select('id, event_date, event_time, venue_name, guests, customers(name), partners(company_name, villa_name), menus(name)')
        .eq('offer_token', params.token)
        .single()
      setBooking(data)
    }
    fetchBooking()
  }, [params.token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!booking?.id) return
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: insertError } = await supabase.from('guests').insert({
      booking_id: booking.id,
      name: name.trim(),
      email: email.trim() || null,
      dietary_requirements: dietary.trim() || null,
    } as any)

    if (insertError) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <h1 className="text-xl font-medium text-success">You're on the List!</h1>
          <p className="mt-4 text-text-muted">We look forward to hosting you.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-accent">myCHEF</h1>
          <p className="mt-2 text-sm text-text-muted">Private Dining Invitation</p>
        </div>

        {booking ? (
          <Card className="p-6">
            <h2 className="text-lg font-medium">You're invited to an exclusive dinner</h2>
            <div className="mt-4 space-y-2 text-sm text-text-muted">
              {booking.event_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDateShort(booking.event_date)} {booking.event_time?.slice(0, 5)}</span>
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
            </div>
          </Card>
        ) : (
          <Card className="p-6 text-center text-text-muted">Loading event details...</Card>
        )}

        <Card className="p-6">
          <h3 className="font-medium">RSVP</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <Input
              label="Full Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-muted">Dietary Requirements</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Allergies, preferences, etc."
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-error">{error}</p>}
            <Button type="submit" isLoading={loading} className="w-full">
              Confirm Attendance
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
