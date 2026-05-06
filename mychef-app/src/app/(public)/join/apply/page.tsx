'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeIn } from '@/components/ui/fade-in'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  ChefHat,
  UtensilsCrossed,
  Wine,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Qualification checkboxes
  const [hasKitchen, setHasKitchen] = useState(false)
  const [hasDiningSetup, setHasDiningSetup] = useState(false)
  const [meetsStandard, setMeetsStandard] = useState(false)
  const allChecked = hasKitchen && hasDiningSetup && meetsStandard

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!allChecked) {
      setError('Please confirm all requirements to proceed.')
      return
    }
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { error: insertError } = await supabase.from('partner_prospects').insert({
      company_name: formData.get('company_name') as string,
      contact_name: formData.get('contact_name') as string,
      phone: formData.get('phone') as string,
      whatsapp: formData.get('whatsapp') as string,
      email: formData.get('email') as string,
      area: formData.get('area') as string,
      notes: `Qualifications: Kitchen=${hasKitchen}, Dining=${hasDiningSetup}, Standard=${meetsStandard}`,
      status: 'prospect',
    } as any)

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <FadeIn>
          <Card className="max-w-md p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-xl font-medium text-accent">Application Received</h2>
            <p className="mt-4 text-text-muted">
              Thank you for your interest in becoming a myCHEF partner. Our team reviews every application personally. You will hear from us within 48 hours.
            </p>
            <Link href="/">
              <Button variant="secondary" className="mt-6">
                Back to Home
              </Button>
            </Link>
          </Card>
        </FadeIn>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <FadeIn>
        <div className="mb-6 flex items-center gap-2">
          <Link href="/join">
            <ArrowLeft className="h-5 w-5 text-text-muted" />
          </Link>
          <h1 className="text-lg font-medium">Partner Application</h1>
        </div>
      </FadeIn>

      {/* Qualification Requirements */}
      <FadeIn delay={0.05}>
        <Card className="mb-4 p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <h2 className="text-sm font-medium">Qualification Requirements</h2>
          </div>
          <p className="mb-4 text-xs text-text-muted">
            To maintain the myCHEF experience standard, every partner villa must meet the following requirements. Please confirm each item.
          </p>

          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-surface/80">
              <input
                type="checkbox"
                checked={hasKitchen}
                onChange={(e) => setHasKitchen(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent"
              />
              <div className="flex items-start gap-2">
                <ChefHat className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium">Functional Kitchen</p>
                  <p className="text-xs text-text-muted">
                    My villa has a usable kitchen with adequate counter space, sink, stove/oven, and refrigeration suitable for professional meal preparation.
                  </p>
                </div>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-surface/80">
              <input
                type="checkbox"
                checked={hasDiningSetup}
                onChange={(e) => setHasDiningSetup(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent"
              />
              <div className="flex items-start gap-2">
                <UtensilsCrossed className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium">Dining Area Setup</p>
                  <p className="text-xs text-text-muted">
                    My villa has a nicely presented dining area with a proper table, quality seating, and suitable lighting for an intimate fine dining experience.
                  </p>
                </div>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-surface/80">
              <input
                type="checkbox"
                checked={meetsStandard}
                onChange={(e) => setMeetsStandard(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent"
              />
              <div className="flex items-start gap-2">
                <Wine className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium">Experience Standard</p>
                  <p className="text-xs text-text-muted">
                    I understand that myCHEF represents a premium dining experience. My villa and its setup align with the level of service and atmosphere expected for fine dining events.
                  </p>
                </div>
              </div>
            </label>
          </div>

          {!allChecked && (
            <p className="mt-3 text-xs text-warning">
              All three requirements must be confirmed before you can submit your application.
            </p>
          )}
        </Card>
      </FadeIn>

      {/* Application Form */}
      <FadeIn delay={0.1}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-wide text-text-muted">
            Villa Information
          </h2>

          <Input name="company_name" placeholder="Villa / Company Name" required />
          <Input name="contact_name" placeholder="Your Name" required />
          <Input name="phone" placeholder="Phone Number" type="tel" />
          <Input name="whatsapp" placeholder="WhatsApp (if different)" type="tel" />
          <Input name="email" placeholder="Email Address" type="email" />
          <Input name="area" placeholder="Area in Bali (e.g. Canggu, Uluwatu)" />

          {error && <p className="text-sm text-error">{error}</p>}

          <Button
            type="submit"
            isLoading={loading}
            disabled={!allChecked}
            className="w-full"
          >
            Submit Application
            <ChevronRight className="h-4 w-4" />
          </Button>
        </form>
      </FadeIn>
    </div>
  )
}
