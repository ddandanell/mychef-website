'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const sourceOptions = [
  { value: '', label: 'Select source...' },
  { value: 'direct', label: 'Direct' },
  { value: 'villa_partner', label: 'Villa Partner' },
  { value: 'referral', label: 'Referral' },
  { value: 'other', label: 'Other' },
]

export default function NewLeadPage() {
  const router = useRouter()
  const supabase = createClient()
  const { showToast } = useToast()

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    whatsapp: '',
    source: '',
    eventDate: '',
    estimatedValue: '',
    notes: '',
  })

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    if (!form.name.trim()) {
      showToast('Name is required', 'error')
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: form.name.trim(),
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        whatsapp: form.whatsapp.trim() || null,
        source: (form.source as any) || null,
        event_date: form.eventDate || null,
        estimated_value: form.estimatedValue ? parseFloat(form.estimatedValue) : null,
        status: 'new',
      } as any)
      .select('id')
      .single() as any

    if (error || !data) {
      showToast('Failed to create lead', 'error')
      setLoading(false)
      return
    }

    showToast('Lead created successfully', 'success')
    router.push(`/leads/${data.id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/leads" className="text-text-muted hover:text-text-primary">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">New Lead</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="space-y-3 p-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
          <Input
            label="WhatsApp"
            type="tel"
            value={form.whatsapp}
            onChange={(e) => update('whatsapp', e.target.value)}
          />
        </Card>

        <Card className="space-y-3 p-4">
          <Select
            label="Source"
            options={sourceOptions}
            value={form.source}
            onChange={(e) => update('source', e.target.value)}
          />
          <Input
            label="Event Date"
            type="date"
            value={form.eventDate}
            onChange={(e) => update('eventDate', e.target.value)}
          />
          <Input
            label="Estimated Value (IDR)"
            type="number"
            min={0}
            value={form.estimatedValue}
            onChange={(e) => update('estimatedValue', e.target.value)}
          />
        </Card>

        <Card className="space-y-3 p-4">
          <Input
            label="Notes"
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
          />
        </Card>

        <div className="flex gap-3 pt-2">
          <Button type="submit" isLoading={loading} className="flex-1">
            Create Lead
          </Button>
          <Link href="/leads" className="flex-1">
            <Button variant="secondary" className="w-full" disabled={loading}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
