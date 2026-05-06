'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Calendar,
  Calculator,
  User,
  Phone,
  Mail,
  Clock,
  Users,
  BookOpen,
  Home,
  MapPin,
  Salad,
  Sparkles,
  FileText,
  Send,
  CheckCircle,
} from 'lucide-react'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { GoldDivider } from '@/components/website/GoldDivider'
import { FadeIn } from '@/components/ui/fade-in'
import { PriceCalculator } from '@/components/website/PriceCalculator'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

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

  const inputClass =
    'rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0] placeholder:text-[#888880]/50 focus:border-[#C9A96E] focus:ring-[#C9A96E]'
  const selectClass =
    'rounded-none border-[#2a2a2a] bg-[#111111] text-[#F5F5F0] focus:border-[#C9A96E] focus:ring-[#C9A96E]'
  const textareaClass =
    'w-full resize-none rounded-none border border-[#2a2a2a] bg-[#111111] px-3 py-2.5 text-sm text-[#F5F5F0] placeholder:text-[#888880]/50 focus:border-[#C9A96E] focus:outline-none focus:ring-1 focus:ring-[#C9A96E]'

  return (
    <div className="mx-auto max-w-lg">
      {/* Hero */}
      <section className="px-4 pb-10 pt-32 text-center md:px-8 md:pb-16">
        <FadeIn>
          <SectionEyebrow text="Reservations" />
          <div className="mt-4 flex items-center justify-center gap-3">
            <Calendar className="h-5 w-5 text-[#C9A96E]" strokeWidth={1.5} />
            <h1 className="font-display text-[2.5rem] font-light leading-tight text-[#F5F5F0] md:text-[3rem]">
              Book Your Evening
            </h1>
          </div>
          <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880]">
            Select your date, menu, and number of guests. We will confirm within 4 hours.
          </p>
        </FadeIn>
      </section>

      {submitted ? (
        <FadeIn>
          <section className="px-4 py-10 text-center md:px-8 md:py-16">
            <CheckCircle className="mx-auto h-10 w-10 text-[#C9A96E]" strokeWidth={1.5} />
            <h2 className="mt-4 font-display text-2xl text-[#C9A96E]">Request Received</h2>
            <p className="mx-auto mt-4 max-w-sm font-body text-sm leading-relaxed text-[#888880]">
              We have received your booking request and will contact you via WhatsApp within 4 hours
              to confirm your date and menu details.
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
          <section className="px-4 py-6 md:px-8">
            <FadeIn>
              {menuPrice > 0 && guestCount > 0 && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                    <span className="font-body text-xs uppercase tracking-wider text-[#888880]">
                      Price Estimate
                    </span>
                  </div>
                  <PriceCalculator menuPrice={menuPrice} guests={guestCount} />
                </div>
              )}
            </FadeIn>
          </section>

          {/* Booking Form */}
          <section className="px-4 py-6 md:px-8">
            <FadeIn>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                      <User className="h-3.5 w-3.5" strokeWidth={1.5} />
                      First Name
                    </label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                      <User className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Last Name
                    </label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                    <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                    WhatsApp Number
                  </label>
                  <Input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                      <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Preferred Date
                    </label>
                    <Input
                      type="date"
                      min={(() => {
                        const d = new Date()
                        d.setDate(d.getDate() + 3)
                        return d.toISOString().split('T')[0]
                      })()}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                      <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Preferred Time
                    </label>
                    <Select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      options={timeOptions}
                      className={selectClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                      <Users className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Number of Guests
                    </label>
                    <Select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      options={guestOptions}
                      className={selectClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                      <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Menu Selection
                    </label>
                    <Select
                      value={menu}
                      onChange={(e) => setMenu(e.target.value)}
                      options={menuOptions}
                      className={selectClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                    <Home className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Villa Name & Area
                  </label>
                  <Input
                    value={villaName}
                    onChange={(e) => setVillaName(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Villa Address
                  </label>
                  <Input
                    value={villaAddress}
                    onChange={(e) => setVillaAddress(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                    <Salad className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Dietary Requirements
                  </label>
                  <textarea
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    rows={3}
                    placeholder="Allergies, restrictions, preferences..."
                    className={textareaClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Occasion
                  </label>
                  <Select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    options={occasionOptions}
                    className={selectClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#888880]">
                    <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Additional Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Anything else we should know..."
                    className={textareaClass}
                  />
                </div>

                <GoldDivider className="py-2" />

                <Button
                  type="submit"
                  className="w-full rounded-none bg-[#C9A96E] py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] hover:bg-[#d4b882]"
                >
                  <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Submit Booking Request →
                </Button>
              </form>
            </FadeIn>
          </section>
        </>
      )}

      {/* Booking Note */}
      <section className="px-4 pb-10 pt-4 text-center md:px-8 md:pb-16">
        <p className="font-body text-xs leading-relaxed text-[#888880]">
          By submitting this form you will receive a booking offer via WhatsApp within 4 hours. A 25%
          deposit is required to confirm your date.
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
