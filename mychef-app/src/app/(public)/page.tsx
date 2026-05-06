import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { GoldDivider } from '@/components/website/GoldDivider'
import { IngredientMarquee } from '@/components/website/IngredientMarquee'
import {
  Flame,
  Users,
  Globe,
  Eye,
  UtensilsCrossed,
  Star,
  BookOpen,
  Wine,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aegean Riviera by myCHEF · Mediterranean Fine Dining · Bali',
  description:
    'From Sicily to the Aegean — a complete Mediterranean journey. Handmade pasta, fresh seafood, and fire. Served privately in your Bali villa.',
}

const concepts = [
  {
    icon: Users,
    title: 'Private Setting',
    desc: 'Your villa becomes the venue. No shared dining room. No strangers.',
  },
  {
    icon: Globe,
    title: 'Mediterranean Focus',
    desc: 'Sicilian and Aegean traditions through fresh Indonesian produce.',
  },
  {
    icon: Eye,
    title: 'Visible Craft',
    desc: 'Pasta rolled by hand. Fish filleted at the counter. Fire in real time.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Complete Service',
    desc: 'Tableware, linens, glassware, and service included. Kitchen left spotless.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="grain relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(ellipse_at_30%_60%,_rgba(201,169,110,0.08)_0%,_transparent_60%)]">
        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-4 pb-20 pt-32 md:pb-28 md:pt-40">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2">
              <Flame className="h-3.5 w-3.5 text-[#C9A96E]" strokeWidth={1.5} />
              <SectionEyebrow text="Private Mediterranean Fine Dining · Bali" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} blur>
            <h1 className="font-display text-[3.5rem] font-light leading-[1.05] text-[#F5F5F0] md:text-[5rem] lg:text-[6rem]">
              From Sicily
              <br />
              to the <span className="italic text-[#C9A96E]">Aegean</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-[#888880] md:max-w-md md:text-base">
              A complete Mediterranean journey. Handmade pasta. Fresh seafood. Fire.
              Served privately in your villa.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="group inline-flex items-center gap-3 bg-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] transition-all duration-500 hover:bg-[#d4b882] active:scale-[0.98]"
              >
                Book Your Evening
                <span className="flex h-6 w-6 items-center justify-center bg-[#080808]/10 transition-transform duration-500 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3 w-3" strokeWidth={2} />
                </span>
              </Link>
              <Link
                href="/menus"
                className="group inline-flex items-center gap-3 border border-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:bg-[#C9A96E] hover:text-[#080808] active:scale-[0.98]"
              >
                View Menus
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

      <IngredientMarquee />

      {/* Concept Section */}
      <section className="px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="The Concept" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1} blur>
            <h2 className="font-display text-[2rem] font-light text-[#F5F5F0] md:text-[2.8rem] lg:text-[3.2rem]">
              Not catering.
              <br />
              A private restaurant.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880] md:text-base">
              We do not drop off trays. We arrive early, set your table, cook in your kitchen,
              and serve course by course — just like a restaurant, except the room is yours.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid grid-cols-2 gap-px md:mt-16 md:grid-cols-4" stagger={0.1}>
            {concepts.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group border border-[#2a2a2a]/50 bg-[#111111]/50 p-5 transition-colors duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111] md:p-6">
                  <item.icon
                    className="h-5 w-5 text-[#C9A96E] transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1}
                  />
                  <p className="mt-4 font-body text-sm font-medium text-[#F5F5F0]">{item.title}</p>
                  <p className="mt-1 font-body text-xs leading-relaxed text-[#888880]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonial Band */}
      <section className="border-y border-[#2a2a2a]/30 bg-[#111111]/30 px-4 py-16 md:py-24">
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
              &ldquo;The best private dining experience we have had in Bali.
              The pasta was unforgettable.&rdquo;
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 font-body text-xs uppercase tracking-wider text-[#888880]">
              — Guest, Seminyak Villa
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Two Menus Preview */}
      <section className="px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="Two Menus" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1} blur>
            <h2 className="font-display text-[2rem] font-light text-[#F5F5F0] md:text-[2.8rem]">
              Choose your journey
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-10 grid gap-px md:mt-14 md:grid-cols-2" stagger={0.15}>
            <StaggerItem>
              <div className="group border border-[#2a2a2a]/50 bg-[#111111]/50 p-6 transition-all duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111] md:p-8">
                <BookOpen className="h-5 w-5 text-[#C9A96E]" strokeWidth={1} />
                <p className="mt-6 font-display text-xl text-[#F5F5F0] md:text-2xl">The Riviera Menu</p>
                <p className="mt-1 font-body text-xs text-[#888880]">7 courses</p>
                <p className="mt-4 font-display text-2xl text-[#C9A96E] md:text-3xl">IDR 2.200.000</p>
                <p className="mt-1 font-body text-xs text-[#888880]">per guest</p>
                <Link
                  href="/menus"
                  className="group/btn mt-6 inline-flex items-center gap-2 border border-[#C9A96E] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:bg-[#C9A96E] hover:text-[#080808] active:scale-[0.98]"
                >
                  View Menu
                  <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover/btn:translate-x-0.5" strokeWidth={2} />
                </Link>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="group border border-[#2a2a2a]/50 bg-[#111111]/50 p-6 transition-all duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111] md:p-8">
                <Wine className="h-5 w-5 text-[#C9A96E]" strokeWidth={1} />
                <p className="mt-6 font-display text-xl text-[#F5F5F0] md:text-2xl">The Odyssey Menu</p>
                <p className="mt-1 font-body text-xs text-[#888880]">11 courses + wine pairing</p>
                <p className="mt-4 font-display text-2xl text-[#C9A96E] md:text-3xl">IDR 3.000.000</p>
                <p className="mt-1 font-body text-xs text-[#888880]">per guest</p>
                <Link
                  href="/menus"
                  className="group/btn mt-6 inline-flex items-center gap-2 border border-[#C9A96E] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:bg-[#C9A96E] hover:text-[#080808] active:scale-[0.98]"
                >
                  View Menu
                  <ArrowRight className="h-3 w-3 transition-transform duration-500 group-hover/btn:translate-x-0.5" strokeWidth={2} />
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <p className="mt-6 font-body text-xs text-[#888880]">
              Prices include service and tableware. Wine pairing available on Odyssey Menu. Minimum 4 guests.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA Band */}
      <section className="px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <FadeIn>
            <GoldDivider className="mb-12 md:mb-16" />
          </FadeIn>
          <FadeIn delay={0.1} blur>
            <h2 className="font-display text-2xl font-light text-[#F5F5F0] md:text-3xl lg:text-4xl">
              Ready for your evening?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 font-body text-sm text-[#888880]">
              Book 3 to 5 days ahead for the best availability.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              href="/book"
              className="group mt-8 inline-flex items-center gap-3 bg-[#C9A96E] px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] transition-all duration-500 hover:bg-[#d4b882] active:scale-[0.98]"
            >
              Book Your Evening
              <span className="flex h-7 w-7 items-center justify-center bg-[#080808]/10 transition-transform duration-500 group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
