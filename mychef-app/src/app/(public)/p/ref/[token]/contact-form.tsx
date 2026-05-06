'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ContactFormProps {
  token: string
}

export function ContactForm({ token }: ContactFormProps) {
  const supabase = createClient()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    setLoading(true)
    setError(null)

    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        name: name.trim(),
        email: email.trim() || null,
        whatsapp: phone.trim() || null,
        source: 'referral',
      } as any)
      .select('id')
      .single() as any

    if (leadError || !lead) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    if (message.trim()) {
      await supabase.from('lead_notes').insert({
        lead_id: lead.id,
        note: `Referral token: ${token}\nMessage: ${message.trim()}`,
      } as any)
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-xl font-medium text-success">Thank You!</h2>
        <p className="mt-4 text-text-muted">We'll be in touch soon.</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          placeholder="Your full name"
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
        <Input
          label="Phone / WhatsApp"
          placeholder="+62 ..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-muted">Message</label>
          <textarea
            rows={3}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="How can we help you?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" isLoading={loading} className="w-full">
          Send Message
        </Button>
      </form>
    </Card>
  )
}
