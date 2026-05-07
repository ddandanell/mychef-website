import { Suspense } from 'react'
import { Calendar, Send } from 'lucide-react'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { GoldDivider } from '@/components/website/GoldDivider'
import { FadeIn } from '@/components/ui/fade-in'
import { FAQItem } from '@/components/website/FAQItem'
import { CONTACT, getWhatsAppUrl } from '@/lib/contact'
import BookingForm from './BookingForm'

export default function BookPage() {
  return (
    <div>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-[radial-gradient(ellipse_at_30%_60%,_rgba(201,169,110,0.08)_0%,_transparent_60%)]">
        <div className="relative z-10 flex min-h-[50dvh] flex-col justify-end px-4 pb-20 pt-32 md:min-h-[60dvh] md:px-8 md:pb-28 md:pt-40">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-[#C9A96E]" strokeWidth={1} />
              <SectionEyebrow text="Reservations" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} blur>
            <h1 className="font-display text-[3rem] font-light leading-[1.05] text-[#F5F5F0] md:text-[4.5rem] lg:text-[5.5rem]">
              Book Your <span className="italic text-[#C9A96E]">Evening</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-[#888880] md:text-base">
              Select your date, menu, and number of guests. We will confirm within 4 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-lg px-4 md:px-8">
        {/* Intro */}
        <FadeIn>
          <section className="pt-10 md:pt-16">
            <p className="font-body text-sm leading-relaxed text-[#888880] md:text-base">
              Tell us about your evening and we will take care of the rest — from
              ingredients to cleanup.
            </p>
          </section>
        </FadeIn>

        {/* What&apos;s Included */}
        <FadeIn delay={0.1}>
          <div className="mt-8 border border-[#2a2a2a]/50 bg-[#111111]/50 p-5">
            <h3 className="mb-2 font-display text-sm text-[#F5F5F0]">
              What&apos;s Included
            </h3>
            <p className="font-body text-xs leading-relaxed text-[#888880]">
              Executive chef + 2 sous chefs, all equipment, tableware, linens, setup &amp; breakdown
            </p>
            <p className="mt-1 font-body text-xs leading-relaxed text-[#888880]">
              Not included: 11% tax, beverages, gratuity
            </p>
            <a
              href="/cancellation"
              className="mt-2 inline-block font-body text-xs text-[#C9A96E] underline underline-offset-2 transition-colors hover:text-[#d4b882]"
            >
              View full cancellation policy
            </a>
          </div>
        </FadeIn>

        {/* Booking Form */}
        <Suspense fallback={<div className="min-h-[60vh] bg-[#080808]" />}>
          <BookingForm />
        </Suspense>

        {/* FAQ */}
        <FadeIn delay={0.2}>
          <div className="mt-16 md:mt-24">
            <h2 className="mb-8 font-display text-xl text-[#F5F5F0] md:text-2xl">
              Common Questions
            </h2>
            <div className="space-y-4">
              <FAQItem
                question="How far in advance should I book?"
                answer="3 to 5 days recommended. For last-minute requests under 48 hours, contact us directly."
              />
              <FAQItem
                question="What is the minimum number of guests?"
                answer="Standard bookings require 4 guests. For honeymoons and anniversaries, 2 guests are accepted at a fixed minimum spend of IDR 8,800,000."
              />
              <FAQItem
                question="Can I customise the menu?"
                answer="Menus work best as written. We accommodate allergies and dietary requirements — note them when booking."
              />
              <FAQItem
                question="What happens after I submit?"
                answer="We review your request and respond within 4 hours with availability and a payment link for the 25% deposit."
              />
            </div>
          </div>
        </FadeIn>

        {/* What Happens Next */}
        <FadeIn delay={0.3}>
          <div className="mt-16 md:mt-24">
            <h2 className="mb-6 font-display text-xl text-[#F5F5F0] md:text-2xl">
              What Happens Next
            </h2>
            <ol className="space-y-3">
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
          </div>
        </FadeIn>

        {/* Contact */}
        <FadeIn delay={0.4}>
          <div className="mt-16 pb-20 md:mt-24 md:pb-32">
            <GoldDivider className="py-4" />
            <div className="space-y-4 text-center">
              <p className="font-body text-sm text-[#888880]">
                Prefer to reach us directly?
              </p>
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
              <a
                href="/cancellation"
                className="inline-block font-body text-xs text-[#C9A96E] underline underline-offset-2 transition-colors hover:text-[#d4b882]"
              >
                View our cancellation policy
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
