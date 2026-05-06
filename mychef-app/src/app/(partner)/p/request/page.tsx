'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import { FadeIn } from '@/components/ui/fade-in'

export default function PartnerRequestPage() {
  const supabase = createClient()
  const { showToast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    event_date: '',
    event_time: '',
    guests: '',
    venue_name: '',
    notes: '',
    menu_preference: '',
  })

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      showToast('Not authenticated', 'error')
      setIsSubmitting(false)
      return
    }

    const notesParts: string[] = []
    if (form.menu_preference) {
      notesParts.push(`Menu preference: ${form.menu_preference}`)
    }
    if (form.notes) {
      notesParts.push(form.notes)
    }

    const { error } = await supabase
      .from('bookings')
      .insert({
        partner_id: user.id,
        status: 'draft',
        event_date: form.event_date || null,
        event_time: form.event_time || null,
        guests: form.guests ? parseInt(form.guests, 10) : null,
        venue_name: form.venue_name || null,
        notes: notesParts.join('\n\n') || null,
        min_guests: form.guests ? parseInt(form.guests, 10) : null,
      } as any)

    setIsSubmitting(false)

    if (error) {
      showToast(error.message, 'error')
      return
    }

    showToast('Booking request submitted', 'success')
    router.push('/bookings')
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <FadeIn>
        <h1 className="text-lg font-medium">New Booking Request</h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Event Date"
              type="date"
              value={form.event_date}
              onChange={(e) => handleChange('event_date', e.target.value)}
              required
            />

            <Input
              label="Event Time"
              type="time"
              value={form.event_time}
              onChange={(e) => handleChange('event_time', e.target.value)}
            />

            <Input
              label="Number of Guests"
              type="number"
              min={1}
              value={form.guests}
              onChange={(e) => handleChange('guests', e.target.value)}
              placeholder="e.g. 8"
            />

            <Input
              label="Venue Name"
              type="text"
              value={form.venue_name}
              onChange={(e) => handleChange('venue_name', e.target.value)}
              placeholder="Villa name or location"
            />

            <Select
              label="Menu Preference"
              value={form.menu_preference}
              onChange={(e) => handleChange('menu_preference', e.target.value)}
              options={[
                { value: '', label: 'Select preference' },
                { value: '7_course', label: '7 Course' },
                { value: '11_course', label: '11 Course' },
                { value: 'custom', label: 'Custom' },
              ]}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-muted">Notes</label>
              <textarea
                className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                rows={4}
                value={form.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Any special requests or details..."
              />
            </div>

            <Button type="submit" isLoading={isSubmitting} className="w-full">
              Submit Request
            </Button>
          </form>
        </Card>
      </FadeIn>
    </div>
  )
}
