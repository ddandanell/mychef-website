'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/toast'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewBookingPage() {
  const router = useRouter()
  const supabase = createClient()
  const { showToast } = useToast()

  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([])
  const [menus, setMenus] = useState<{ id: string; name: string; type: string }[]>([])
  const [isNewCustomer, setIsNewCustomer] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    customerId: '',
    newCustomerName: '',
    newCustomerPhone: '',
    newCustomerEmail: '',
    eventDate: '',
    eventTime: '',
    guests: '',
    venueName: '',
    venueAddress: '',
    venueArea: '',
    menuId: '',
    notes: '',
  })

  useEffect(() => {
    async function loadData() {
      const [{ data: c }, { data: m }] = await Promise.all([
        supabase.from('customers').select('id, name').order('name'),
        supabase.from('menus').select('id, name, type').eq('is_active', true).order('name'),
      ])
      if (c) setCustomers(c)
      if (m) setMenus(m)
    }
    loadData()
  }, [supabase])

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      let customerId = form.customerId

      if (isNewCustomer) {
        if (!form.newCustomerName.trim()) {
          showToast('Customer name is required', 'error')
          setLoading(false)
          return
        }
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert({
            name: form.newCustomerName.trim(),
            phone: form.newCustomerPhone.trim() || null,
            email: form.newCustomerEmail.trim() || null,
          } as any)
          .select('id')
          .single() as any

        if (customerError || !newCustomer) {
          showToast('Failed to create customer', 'error')
          setLoading(false)
          return
        }
        customerId = newCustomer.id
      }

      if (!customerId && !isNewCustomer) {
        showToast('Please select or create a customer', 'error')
        setLoading(false)
        return
      }

      const { data: lead, error: leadError } = await supabase
        .from('leads')
        .insert({
          name: isNewCustomer ? form.newCustomerName.trim() : customers.find((c) => c.id === customerId)?.name || 'New Booking',
          phone: isNewCustomer ? form.newCustomerPhone.trim() || null : null,
          email: isNewCustomer ? form.newCustomerEmail.trim() || null : null,
          status: 'new',
          event_date: form.eventDate || null,
          estimated_value: null,
          customer_id: customerId || null,
        } as any)
        .select('id')
        .single() as any

      if (leadError || !lead) {
        showToast('Failed to create lead', 'error')
        setLoading(false)
        return
      }

      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          lead_id: lead.id,
          customer_id: customerId || null,
          event_date: form.eventDate || null,
          event_time: form.eventTime || null,
          guests: form.guests ? parseInt(form.guests) : null,
          venue_name: form.venueName.trim() || null,
          venue_address: form.venueAddress.trim() || null,
          venue_area: form.venueArea.trim() || null,
          status: 'draft',
          notes: form.notes.trim() || null,
        } as any)
        .select('id')
        .single() as any

      if (bookingError || !booking) {
        showToast('Failed to create booking', 'error')
        setLoading(false)
        return
      }

      showToast('Booking created successfully', 'success')
      router.push(`/bookings/${booking.id}`)
    } catch {
      showToast('Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/bookings" className="text-text-muted hover:text-text-primary">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">New Booking</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="space-y-3 p-4">
          <h2 className="text-sm font-medium text-text-muted">Customer</h2>

          <Checkbox
            label="Create new customer"
            checked={isNewCustomer}
            onChange={(e) => setIsNewCustomer((e.target as HTMLInputElement).checked)}
          />

          {isNewCustomer ? (
            <div className="space-y-3">
              <Input label="Name" value={form.newCustomerName} onChange={(e) => update('newCustomerName', e.target.value)} required />
              <Input label="Phone" type="tel" value={form.newCustomerPhone} onChange={(e) => update('newCustomerPhone', e.target.value)} />
              <Input label="Email" type="email" value={form.newCustomerEmail} onChange={(e) => update('newCustomerEmail', e.target.value)} />
            </div>
          ) : (
            <Select
              label="Select Customer"
              options={[{ value: '', label: 'Choose...' }, ...customers.map((c) => ({ value: c.id, label: c.name }))]}
              value={form.customerId}
              onChange={(e) => update('customerId', e.target.value)}
            />
          )}
        </Card>

        <Card className="space-y-3 p-4">
          <h2 className="text-sm font-medium text-text-muted">Event Details</h2>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" type="date" value={form.eventDate} onChange={(e) => update('eventDate', e.target.value)} />
            <Input label="Time" type="time" value={form.eventTime} onChange={(e) => update('eventTime', e.target.value)} />
          </div>
          <Input label="Guests" type="number" min={1} value={form.guests} onChange={(e) => update('guests', e.target.value)} />
        </Card>

        <Card className="space-y-3 p-4">
          <h2 className="text-sm font-medium text-text-muted">Venue</h2>
          <Input label="Venue Name" value={form.venueName} onChange={(e) => update('venueName', e.target.value)} />
          <Input label="Address" value={form.venueAddress} onChange={(e) => update('venueAddress', e.target.value)} />
          <Input label="Area" value={form.venueArea} onChange={(e) => update('venueArea', e.target.value)} />
        </Card>

        <Card className="space-y-3 p-4">
          <h2 className="text-sm font-medium text-text-muted">Menu</h2>
          <Select
            label="Select Menu"
            options={[{ value: '', label: 'Choose...' }, ...menus.map((m) => ({ value: m.id, label: `${m.name} (${m.type})` }))]}
            value={form.menuId}
            onChange={(e) => update('menuId', e.target.value)}
          />
        </Card>

        <Card className="space-y-3 p-4">
          <h2 className="text-sm font-medium text-text-muted">Notes</h2>
          <Input label="Notes" value={form.notes} onChange={(e) => update('notes', e.target.value)} />
        </Card>

        <div className="flex gap-3 pt-2">
          <Button type="submit" isLoading={loading} className="flex-1">
            Create Booking
          </Button>
          <Link href="/bookings" className="flex-1">
            <Button variant="secondary" className="w-full" disabled={loading}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
