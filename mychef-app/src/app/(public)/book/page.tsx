'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { GoldDivider } from '@/components/website/GoldDivider'
import { FadeIn } from '@/components/ui/fade-in'
import { PriceCalculator } from '@/components/website/PriceCalculator'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const today = new Date()
today.setDate(today.getDate() + 3)
const minDate = today.toISOString().split('T')[0]

const menuOptions = [
  { value: 'riviera', label: 'Riviera 7-course — IDR 2.200.000' },
  { value: 'odyssey', label: 'Odyssey 11-course — IDR 3.000.000' },
]

const timeOptions = [
  { value: '19:00', label: '19:00 Sunset start' },
  { value: '19:30', label: '19:30 Evening start' },
  { value: '20:00', label: '20:00 Late evening' },
]

const guestOptions = Array.from({ length: 17 }, (_, i) => ({
  value: String(i + 4),
  label: String(i + 4),
}))

const occasionOptions = [
  { value: '', label: 'Select occasion (optional)' },
  { value: 'personal', label: 'Personal dinner' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'retreat', label: 'Retreat' },
  { value: 'other', label: 'Other' },
]

const menuPrices: Record<string, number> = {
  riviera: 2_200_000,
  odyssey: 3_000_000,
}

function BookForm() {
  const searchParams = useSearchParams()
  const occasionParam = searchParams.get('occasion') || ''

  const [submitted, setSubmitted] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('19:00')
  const [guests, setGuests] = useState('4')
  const [menu, setMenu] = useState('riviera')
  const [villaName, setVillaName] = useState('')
  const [villaAddress, setVillaAddress] = useState('')
  const [dietary, setDietary] = useState('')
  const [occasion, setOccasion] = useState(occasionParam)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (occasionParam) setOccasion(occasionParam)
  }, [occasionParam])

  const menuPrice = menuPrices[menu] ?? 0
  const guestCount = Number(guests) || 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFirstName('')
    setLastName('')
    setWhatsapp('')
    setEmail('')
    setDate('')
    setTime('19:00')
    setGuests('4')
    setMenu('riviera')
    setVillaName('')
    setVillaAddress('')
    setDietary('')
    setOccasion('')
    setNotes('')
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Hero */}
      <section className="px-4 pt-32 pb-16 text-center">
        <FadeIn>
          <SectionEyebrow text="Reservations" />
          <h1 className="mt-4 font-display text-[3rem] font-light leading-tight text-[#F5F5F0]">
            Book Your Evening
          </h1>
          <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880]">
            Select your date, menu, and number of guests. We will confirm
            within 4 hours.
          </p>
        </FadeIn>
      </section>

      {submitted ? (
        <FadeIn>
          <section className="px-4 py-16 text-center">
            <span className="font-display text-3xl text-[#C9A96E]">✦</span>
            <h2 className="mt-4 font-display text-2xl text-[#C9A96E]">
              Request Received
            </h2>
            <p className="mx-auto mt-4 max-w-sm font-body text-sm leading-relaxed text-[#888880]">
              We have received your booking request and will contact you via
              WhatsApp within 4 hours to confirm your date and menu details.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center bg-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] transition-colors hover:bg-[#d4b882]"
              >
                Open WhatsApp →
              </a>
              <button
                onClick={handleReset}
                className="inline-flex w-full items-center justify-center border border-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#080808]"
              >
                Make Another Booking
              </button>
            </div>
          </section>
        </FadeIn>
      ) : (
        <>
          {/* Live Price Calculator */}
          <section className="px-4 py-6">
            <FadeIn>
              {menuPrice > 0 && guestCount > 0 && (
                <PriceCalculator
                  menuPrice={menuPrice}
                  guests={guestCount}
                />
              )}
            </FadeIn>
          </section>

          {/* Booking Form */}
          <section className="px-4 py-6">
            <FadeIn>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                  />
                  <Input
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                  />
                </div>

                <Input
                  label="WhatsApp Number"
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                  className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                />

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Preferred Date"
                    type="date"
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                  />
                  <Select
                    label="Preferred Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    options={timeOptions}
                    className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Select
                    label="Number of Guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    options={guestOptions}
                    className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                  />
                  <Select
                    label="Menu Selection"
                    value={menu}
                    onChange={(e) => setMenu(e.target.value)}
                    options={menuOptions}
                    className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                  />
                </div>

                <Input
                  label="Villa Name & Area"
                  value={villaName}
                  onChange={(e) => setVillaName(e.target.value)}
                  required
                  className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                />

                <Input
                  label="Villa Address"
                  value={villaAddress}
                  onChange={(e) => setVillaAddress(e.target.value)}
                  required
                  className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#888880]">
                    Dietary Requirements
                  </label>
                  <textarea
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    rows={3}
                    placeholder="Allergies, restrictions, preferences..."
                    className="w-full resize-none rounded-none border border-[#2a2a2a] bg-[#111111] px-3 py-2.5 text-sm text-[#F5F5F0] placeholder:text-[#888880]/50 focus:border-[#C9A96E] focus:outline-none focus:ring-1 focus:ring-[#C9A96E]"
                  />
                </div>

                <Select
                  label="Occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  options={occasionOptions}
                  className="rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0]"
                />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#888880]">
                    Additional Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Anything else we should know..."
                    className="w-full resize-none rounded-none border border-[#2a2a2a] bg-[#111111] px-3 py-2.5 text-sm text-[#F5F5F0] placeholder:text-[#888880]/50 focus:border-[#C9A96E] focus:outline-none focus:ring-1 focus:ring-[#C9A96E]"
                  />
                </div>

                <GoldDivider className="py-2" />

                <Button
                  type="submit"
                  className="w-full rounded-none bg-[#C9A96E] py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] hover:bg-[#d4b882]"
                >
                  Submit Booking Request →
                </Button>
              </form>
            </FadeIn>
          </section>
        </>
      )}

      {/* Booking Note */}
      <section className="px-4 pb-16 pt-4 text-center">
        <p className="font-body text-xs leading-relaxed text-[#888880]">
          By submitting this form you will receive a booking offer via WhatsApp
          within 4 hours. A 25% deposit is required to confirm your date.
        </p>
      </section>
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <BookForm />
    </Suspense>
  )
}
