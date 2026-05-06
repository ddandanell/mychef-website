import type { Metadata } from 'next'
import Image from 'next/image'
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
  ArrowRight,
} from 'lucide-react'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

export const metadata: Metadata = {
  title: 'Private Events \u00b7 Aegean Riviera by myCHEF',
  description:
    'Honeymoon, birthdays, corporate dinners, villa partnerships, and multi-night retreats. Book a private Mediterranean fine dining event in your Bali villa.',
}

const eventTypes = [
  {
    number: '01',
    title: 'Honeymoon & Romance',
    description:
      'A private dinner for two, candlelight, handmade pasta, and wine.',
    occasion: 'honeymoon',
    Icon: Heart,
  },
  {
    number: '02',
    title: 'Birthday & Celebrations',
    description:
      'A structured theatrical experience for groups of 4\u201320.',
    occasion: 'birthday',
    Icon: Cake,
  },
  {
    number: '03',
    title: 'Corporate & Board Dinners',
    description:
      'The Mediterranean table is the oldest business conversation.',
    occasion: 'corporate',
    Icon: Briefcase,
  },
  {
    number: '04',
    title: 'Villa Partnerships',
    description:
      'Offer myCHEF as an exclusive dining service to your villa guests.',
    occasion: 'villa',
    Icon: Home,
  },
  {
    number: '05',
    title: 'Retreats & Multi-Night',
    description:
      'Anchor a multi-day program with 2\u20133 Mediterranean evenings.',
    occasion: 'retreat',
    Icon: CalendarDays,
  },
]

export default function EventsPage() {
  return (
    <div className="bg-[#080808]">
      {/* Hero */}
      <section className="grain relative min-h-[100dvh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/table-candles.jpg"
            alt="Elegant candlelit dinner setting"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,_rgba(201,169,110,0.08)_0%,_transparent_60%)]" />
        </div>
        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-4 pb-20 pt-32 md:pb-28 md:pt-40">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2">
              <PartyPopper className="h-3.5 w-3.5 text-[#C9A96E]" strokeWidth={1} />
              <SectionEyebrow text="Private Events" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} blur>
            <h1 className="font-display text-[3.5rem] font-light leading-[1.05] text-[#F5F5F0] md:text-[5rem] lg:text-[6rem]">
              Dinner as an
              <br />
              <span className="italic text-[#C9A96E]">Event</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-[#888880] md:max-w-md md:text-base">
              Every occasion deserves a setting that matches it. We design the evening around your
              event — not the other way around.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Event Types */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <StaggerContainer className="grid gap-px md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {eventTypes.map((event) => (
              <StaggerItem key={event.number}>
                <div className="group border border-[#2a2a2a]/50 bg-[#111111]/50 p-6 transition-all duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111] md:p-8">
                  <event.Icon
                    className="h-8 w-8 text-[#C9A96E] transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1}
                  />
                  <div className="mt-6 flex items-baseline justify-between">
                    <span className="font-display text-sm text-[#C9A96E]">{event.number}</span>
                    <Link
                      href={`/book?occasion=${event.occasion}`}
                      className="inline-flex items-center gap-1 font-body text-[0.6rem] font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:text-[#d4b882]"
                    >
                      Book this
                      <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1} />
                    </Link>
                  </div>
                  <h3 className="mt-3 font-display text-xl text-[#F5F5F0] md:text-2xl">
                    {event.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-[#888880]">
                    {event.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Custom Event CTA */}
      <section className="border-y border-[#2a2a2a]/30 bg-[#111111]/30 px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <FadeIn delay={0.1} blur>
            <h2 className="font-display text-2xl font-light text-[#F5F5F0] md:text-3xl lg:text-4xl">
              Interested in a custom event?
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a
              href="https://wa.me/6281234567890?text=Hi%20myCHEF!%20I'd%20like%20to%20discuss%20a%20custom%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 border border-[#C9A96E] px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:bg-[#C9A96E] hover:text-[#080808] active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1} />
              WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <FadeIn>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#C9A96E] text-[#C9A96E]"
                  strokeWidth={1}
                />
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1} blur>
            <p className="mx-auto mt-6 max-w-md font-display text-xl italic leading-relaxed text-[#F5F5F0] md:max-w-lg md:text-2xl">
              &ldquo;We booked a myCHEF dinner for our board retreat in Canggu. The food was
              extraordinary, the pacing intentional, and the evening became the highlight of our
              trip.&rdquo;
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 font-body text-xs uppercase tracking-wider text-[#888880]">
              &mdash; Corporate Client
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
