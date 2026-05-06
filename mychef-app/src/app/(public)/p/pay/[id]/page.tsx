'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatIDR } from '@/lib/utils/currency'
import { useRouter } from 'next/navigation'

export default function PaymentPage({ params }: { params: { id: string } }) {
  const [method, setMethod] = useState<'local_bank' | 'international' | 'wise'>('local_bank')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const { error } = await (supabase
      .from('bookings') as any)
      .update({
        payment_method: method,
        payment_submitted_at: new Date().toISOString(),
        status: 'payment_submitted',
      })
      .eq('id', params.id)

    if (!error) {
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <h1 className="text-xl font-medium text-success">Payment Submitted</h1>
          <p className="mt-4 text-text-muted">
            Thank you! We will verify your payment within 24 hours.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-accent">Payment</h1>
          <p className="mt-2 text-sm text-text-muted">Complete your booking</p>
        </div>

        <Card className="p-6">
          <h2 className="font-medium">Select Payment Method</h2>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => setMethod('local_bank')}
              className={`w-full rounded-lg border p-4 text-left transition-colors ${
                method === 'local_bank' ? 'border-accent bg-accent/10' : 'border-border'
              }`}
            >
              <p className="font-medium">Local Bank Transfer (IDR)</p>
              <p className="text-xs text-text-muted">BCA, Mandiri, BNI</p>
            </button>
            <button
              onClick={() => setMethod('international')}
              className={`w-full rounded-lg border p-4 text-left transition-colors ${
                method === 'international' ? 'border-accent bg-accent/10' : 'border-border'
              }`}
            >
              <p className="font-medium">International Wire Transfer</p>
              <p className="text-xs text-text-muted">USD/EUR/GBP</p>
            </button>
            <button
              onClick={() => setMethod('wise')}
              className={`w-full rounded-lg border p-4 text-left transition-colors ${
                method === 'wise' ? 'border-accent bg-accent/10' : 'border-border'
              }`}
            >
              <p className="font-medium">Wise Transfer</p>
              <p className="text-xs text-text-muted">Fast international transfer</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="rounded-lg bg-surface p-4">
              <p className="text-sm text-text-muted">Bank details will be displayed after confirmation</p>
            </div>
            <Button type="submit" isLoading={loading} className="w-full">
              I Have Made the Payment
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
