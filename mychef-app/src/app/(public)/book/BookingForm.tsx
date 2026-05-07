'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Calculator,
  User,
  Phone,
  Mail,
  Calendar,
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
import { FadeIn } from '@/components/ui/fade-in'
import { PriceCalculator } from '@/components/website/PriceCalculator'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { CONTACT, getWhatsAppUrl } from '@/lib/contact'

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

export default function BookingForm() {
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
    <div>
      {submitted ? (
        <FadeIn>
          <section className="py-20 text-center md:py-32">
            <CheckCircle className="mx-auto h-10 w-10 text-[#C9A96E]" strokeWidth={1} />
            <h2 className="mt-6 font-display text-2xl text-[#C9A96E] md:text-3xl">
              Request Received
            </h2>
            <p className="mx-auto mt-4 max-w-sm font-body text-sm leading-relaxed text-[#888880] md:text-base">
              We have received your booking request and will contact you via email within 4 hours
              to confirm your date and menu details.
            </p>
            <div className="mx-auto mt-8 max-w-sm">
              <h3 className="mb-3 font-body text-xs uppercase tracking-wider text-[#888880]">
                What happens next
              </h3>
              <ol className="space-y-2 text-left">
                <li className="flex items-start gap-3 font-body text-sm text-[#888880]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C9A96E]/30 text-[10px] text-[#C9A96E]">
                    1
                  </span>
                  We review your request (within 4 hours)
                </li>
                <li className="flex items-start gap-3 font-body text-sm text-[#888880]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C9A96E]/30 text-[10px] text-[#C9A96E]">
                    2
                  </span>
                  You receive a confirmation with payment link
                </li>
                <li className="flex items-start gap-3 font-body text-sm text-[#888880]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C9A96E]/30 text-[10px] text-[#C9A96E]">
                    3
                  </span>
                  Pay 25% deposit to lock your date
                </li>
                <li className="flex items-start gap-3 font-body text-sm text-[#888880]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C9A96E]/30 text-[10px] text-[#C9A96E]">
                    4
                  </span>
                  We confirm final menu and dietary details 48 hours before
                </li>
              </ol>
              <a
                href="/cancellation"
                className="mt-4 inline-block font-body text-xs text-[#C9A96E] underline underline-offset-2 transition-colors hover:text-[#d4b882]"
              >
                View our cancellation policy
              </a>
            </div>
            <div className="mt-10 space-y-3">
              <a
                href={getWhatsAppUrl('Hi myCHEF! I would like to book a private dining evening.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-3 bg-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] transition-all duration-500 hover:bg-[#d4b882] active:scale-[0.98]"
              >
                {CONTACT.whatsappNumber ? 'Open WhatsApp' : 'Email Us'}
                <span className="flex h-6 w-6 items-center justify-center bg-[#080808]/10 transition-transform duration-500 group-hover:translate-x-0.5">
                  <Send className="h-3 w-3" strokeWidth={1} />
                </span>
              </a>
              <button
                onClick={handleReset}
                className="inline-flex w-full items-center justify-center gap-2 border border-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:bg-[#C9A96E] hover:text-[#080808] active:scale-[0.98]"
              >
                Make Another Booking
              </button>
            </div>
          </section>
        </FadeIn>
      ) : (
        <>
          {/* Live Price Calculator */}
          <section className="py-10 md:py-16">
            <FadeIn>
              {menuPrice > 0 && guestCount > 0 && (
                <div className="border border-[#2a2a2a]/50 bg-[#111111]/50 p-6 transition-colors duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111] md:p-8">
                  <div className="mb-4 flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-[#C9A96E]" strokeWidth={1} />
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
          <section className="pb-20 md:pb-32">
            <FadeIn>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                      <User className="h-3.5 w-3.5" strokeWidth={1} />
                      First Name
                    </label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder="e.g. Sarah"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                      <User className="h-3.5 w-3.5" strokeWidth={1} />
                      Last Name
                    </label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      placeholder="e.g. Mitchell"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                    <Phone className="h-3.5 w-3.5" strokeWidth={1} />
                    WhatsApp Number
                  </label>
                  <Input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                    placeholder="+62 812 3456 7890 (include country code)"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                    <Mail className="h-3.5 w-3.5" strokeWidth={1} />
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="sarah@email.com"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                      <Calendar className="h-3.5 w-3.5" strokeWidth={1} />
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
                    <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                      <Clock className="h-3.5 w-3.5" strokeWidth={1} />
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
                    <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                      <Users className="h-3.5 w-3.5" strokeWidth={1} />
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
                    <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                      <BookOpen className="h-3.5 w-3.5" strokeWidth={1} />
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
                  <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                    <Home className="h-3.5 w-3.5" strokeWidth={1} />
                    Villa Name & Area
                  </label>
                  <Input
                    value={villaName}
                    onChange={(e) => setVillaName(e.target.value)}
                    required
                    placeholder="Villa name and area, e.g. Villa Tantangan, Canggu"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={1} />
                    Villa Address
                  </label>
                  <Input
                    value={villaAddress}
                    onChange={(e) => setVillaAddress(e.target.value)}
                    required
                    placeholder="Full address for our navigation"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                    <Salad className="h-3.5 w-3.5" strokeWidth={1} />
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
                  <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={1} />
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
                  <label className="mb-1.5 flex items-center gap-1.5 font-body text-sm font-medium text-[#888880]">
                    <FileText className="h-3.5 w-3.5" strokeWidth={1} />
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

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 bg-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] transition-all duration-500 hover:bg-[#d4b882] active:scale-[0.98]"
                >
                  <Send className="h-3.5 w-3.5" strokeWidth={1} />
                  Submit Booking Request →
                </button>
              </form>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 text-center font-body text-xs leading-relaxed text-[#888880]">
                By submitting this form you will receive a booking offer via email within 4 hours.
                A 25% deposit is required to confirm your date.
              </p>
            </FadeIn>
          </section>
        </>
      )}
    </div>
  )
}
