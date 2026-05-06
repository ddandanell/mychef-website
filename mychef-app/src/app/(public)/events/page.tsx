import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { GoldDivider } from '@/components/website/GoldDivider'
import { FadeIn } from '@/components/ui/fade-in'
import { Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Private Events · Aegean Riviera by myCHEF',
  description:
    'Honeymoon, birthdays, corporate dinners, villa partnerships, and multi-night retreats. Book a private Mediterranean fine dining event in your Bali villa.',
}

const eventTypes = [
  {
    number: '01',
    title: 'Honeymoon & Romance',
    description:
      'A private dinner for two, candlelight, handmade pasta, and wine. The Aegean way of saying "I love you."',
    occasion: 'honeymoon',
  },
  {
    number: '02',
    title: 'Birthday & Celebrations',
    description:
      'A structured theatrical experience for groups of 4–20. The evening unfolds like a story — with you as the honored guest.',
    occasion: 'birthday',
  },
  {
    number: '03',
    title: 'Corporate & Board Dinners',
    description:
      'The Mediterranean table is the oldest business conversation. Impress clients, align teams, or celebrate milestones.',
    occasion: 'corporate',
  },
  {
    number: '04',
    title: 'Villa Partnerships',
    description:
      'Offer myCHEF as an exclusive dining service to your villa guests. Join our commission program and elevate your property.',
    occasion: '',
  },
  {
    number: '05',
    title: 'Retreats & Multi-Night Programs',
    description:
      'Anchor a multi-day program with 2–3 Mediterranean evenings. Each night a different menu, each morning a deeper connection.',
    occasion: 'retreat',
  },
]

export default function EventsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-4 pt-32 pb-16 text-center">
        <FadeIn>
          <SectionEyebrow text="Private Events" />
          <h1 className="mt-4 font-display text-[3rem] font-light leading-tight text-[#F5F5F0]">
            Dinner as an Event
          </h1>
          <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880]">
            Every occasion deserves a setting that matches it. We design the evening around your
            event — not the other way around.
          </p>
        </FadeIn>
      </section>

      {/* Event Types */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-lg space-y-6">
          {eventTypes.map((event, i) => (
            <FadeIn key={event.number} delay={i * 0.05}>
              <div
                className={`border border-[#2a2a2a] p-6 ${
                  i % 2 === 0 ? 'bg-[#111111]' : 'bg-[#080808]'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-sm text-[#C9A96E]">{event.number}</span>
                  {event.occasion && (
                    <Link
                      href={`/book?occasion=${event.occasion}`}
                      className="font-body text-[0.6rem] font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-colors hover:text-[#d4b882]"
                    >
                      Book this →
                    </Link>
                  )}
                </div>
                <h3 className="mt-2 font-display text-xl text-[#F5F5F0]">{event.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#888880]">
                  {event.description}
                </p>
                <GoldDivider className="mt-6" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Custom Event CTA */}
      <section className="px-4 py-12 text-center">
        <FadeIn>
          <p className="font-body text-sm text-[#888880]">Interested in a custom event?</p>
          <a
            href="https://wa.me/6281234567890?text=Hi%20myCHEF!%20I'd%20like%20to%20discuss%20a%20custom%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block border border-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#080808]"
          >
            Contact Us on WhatsApp →
          </a>
        </FadeIn>
      </section>

      {/* Testimonial */}
      <section className="bg-[#111111] px-4 py-16 text-center">
        <FadeIn>
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#C9A96E] text-[#C9A96E]" />
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-md font-display text-xl font-light italic leading-relaxed text-[#F5F5F0]">
            &ldquo;We booked a myCHEF dinner for our board retreat in Canggu. The food was
            extraordinary.&rdquo;
          </p>
          <p className="mt-4 font-body text-xs text-[#888880]">— Corporate Client</p>
        </FadeIn>
      </section>
    </div>
  )
}
