import type { Metadata } from 'next'
import Link from 'next/link'
import {
  PartyPopper,
  Heart,
  Cake,
  Briefcase,
  Home,
  CalendarDays,
  MessageCircle,
  Star,
} from 'lucide-react'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { GoldDivider } from '@/components/website/GoldDivider'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

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
    Icon: Heart,
  },
  {
    number: '02',
    title: 'Birthday & Celebrations',
    description:
      'A structured theatrical experience for groups of 4–20. The evening unfolds like a story — with you as the honored guest.',
    occasion: 'birthday',
    Icon: Cake,
  },
  {
    number: '03',
    title: 'Corporate & Board Dinners',
    description:
      'The Mediterranean table is the oldest business conversation. Impress clients, align teams, or celebrate milestones.',
    occasion: 'corporate',
    Icon: Briefcase,
  },
  {
    number: '04',
    title: 'Villa Partnerships',
    description:
      'Offer myCHEF as an exclusive dining service to your villa guests. Join our commission program and elevate your property.',
    occasion: '',
    Icon: Home,
  },
  {
    number: '05',
    title: 'Retreats & Multi-Night Programs',
    description:
      'Anchor a multi-day program with 2–3 Mediterranean evenings. Each night a different menu, each morning a deeper connection.',
    occasion: 'retreat',
    Icon: CalendarDays,
  },
]

export default function EventsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-4 py-10 pt-32 text-center md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-4 flex items-center justify-center gap-2">
              <PartyPopper className="h-3.5 w-3.5 text-[#C9A96E]" />
              <SectionEyebrow text="Private Events" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-[3rem] font-light leading-tight text-[#F5F5F0]">
              Dinner as an Event
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880]">
              Every occasion deserves a setting that matches it. We design the evening around your
              event — not the other way around.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Event Types */}
      <section className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-lg">
          <StaggerContainer className="space-y-6" stagger={0.08}>
            {eventTypes.map((event) => (
              <StaggerItem key={event.number}>
                <div className="border border-[#2a2a2a] bg-[#111111] p-6">
                  <event.Icon className="h-8 w-8 text-[#C9A96E]" />
                  <div className="mt-4 flex items-baseline justify-between">
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Custom Event CTA */}
      <section className="px-4 py-10 text-center md:px-8 md:py-16">
        <FadeIn>
          <p className="font-body text-sm text-[#888880]">Interested in a custom event?</p>
          <a
            href="https://wa.me/6281234567890?text=Hi%20myCHEF!%20I'd%20like%20to%20discuss%20a%20custom%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 border border-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#080808]"
          >
            <MessageCircle className="h-4 w-4" />
            Contact Us on WhatsApp →
          </a>
        </FadeIn>
      </section>

      {/* Testimonial */}
      <section className="bg-[#111111] px-4 py-10 text-center md:px-8 md:py-16">
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
