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
  ArrowRight,
} from 'lucide-react'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { GoldDivider } from '@/components/website/GoldDivider'
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
      'A private dinner for two, candlelight, handmade pasta, and wine. The Aegean way of saying "I love you."',
    occasion: 'honeymoon',
    Icon: Heart,
  },
  {
    number: '02',
    title: 'Birthday & Celebrations',
    description:
      'A structured theatrical experience for groups of 4\u201320. The evening unfolds like a story \u2014 with you as the honored guest.',
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
      'Anchor a multi-day program with 2\u20133 Mediterranean evenings. Each night a different menu, each morning a deeper connection.',
    occasion: 'retreat',
    Icon: CalendarDays,
  },
]

export default function EventsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="grain relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(ellipse_at_30%_60%,_rgba(201,169,110,0.08)_0%,_transparent_60%)]">
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
              event \u2014 not the other way around.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="group inline-flex items-center gap-3 bg-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] transition-all duration-500 hover:bg-[#d4b882] active:scale-[0.98]"
              >
                Plan Your Event
                <span className="flex h-6 w-6 items-center justify-center bg-[#080808]/10 transition-transform duration-500 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3 w-3" strokeWidth={2} />
                </span>
              </Link>
              <Link
                href="/experience"
                className="group inline-flex items-center gap-3 border border-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:bg-[#C9A96E] hover:text-[#080808] active:scale-[0.98]"
              >
                The Experience
                <span className="flex h-6 w-6 items-center justify-center border border-[#C9A96E]/30 transition-all duration-500 group-hover:border-[#080808]/20">
                  <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2} />
                </span>
              </Link>
            </div>
          </FadeIn>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 right-4 flex flex-col items-center gap-2 md:bottom-12 md:right-8">
            <div className="h-8 w-px animate-scroll-pulse bg-[#C9A96E]" />
            <span className="font-body text-[0.55rem] uppercase tracking-[0.2em] text-[#888880]">
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="Occasions" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1} blur>
            <h2 className="font-display text-[2rem] font-light text-[#F5F5F0] md:text-[2.8rem] lg:text-[3.2rem]">
              Designed around you
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880] md:text-base">
              From intimate dinners for two to corporate board retreats \u2014 every event is
              shaped to its purpose.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-px md:mt-16 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {eventTypes.map((event) => (
              <StaggerItem key={event.number}>
                <div className="group border border-[#2a2a2a]/50 bg-[#111111]/50 p-6 transition-all duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111] md:p-8">
                  <event.Icon
                    className="h-8 w-8 text-[#C9A96E] transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1}
                  />
                  <div className="mt-6 flex items-baseline justify-between">
                    <span className="font-display text-sm text-[#C9A96E]">{event.number}</span>
                    {event.occasion && (
                      <Link
                        href={`/book?occasion=${event.occasion}`}
                        className="inline-flex items-center gap-1 font-body text-[0.6rem] font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:text-[#d4b882]"
                      >
                        Book this
                        <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2} />
                      </Link>
                    )}
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
          <FadeIn>
            <GoldDivider className="mb-12 md:mb-16" />
          </FadeIn>
          <FadeIn delay={0.1} blur>
            <h2 className="font-display text-2xl font-light text-[#F5F5F0] md:text-3xl lg:text-4xl">
              Something else in mind?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 font-body text-sm text-[#888880]">
              Tell us what you are celebrating. We will design an evening around it.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a
              href="https://wa.me/6281234567890?text=Hi%20myCHEF!%20I'd%20like%20to%20discuss%20a%20custom%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 border border-[#C9A96E] px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:bg-[#C9A96E] hover:text-[#080808] active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1} />
              Contact Us on WhatsApp
              <span className="flex h-6 w-6 items-center justify-center border border-[#C9A96E]/30 transition-all duration-500 group-hover:border-[#080808]/20">
                <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2} />
              </span>
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
              extraordinary.&rdquo;
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
