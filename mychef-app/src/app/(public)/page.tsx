import type { Metadata } from 'next'
import Link from 'next/link'
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
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { IngredientMarquee } from '@/components/website/IngredientMarquee'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

export const metadata: Metadata = {
  title: 'Aegean Riviera by myCHEF · Mediterranean Fine Dining · Bali',
  description:
    'From Sicily to the Aegean — a complete Mediterranean journey. Handmade pasta, fresh seafood, and fire. Served privately in your Bali villa.',
}

const conceptItems = [
  {
    icon: Users,
    title: 'Private Setting',
    desc: 'Your villa becomes the venue. No shared dining room. No strangers. Just your guests and the kitchen.',
  },
  {
    icon: Globe,
    title: 'Mediterranean Focus',
    desc: 'Sicilian and Aegean traditions interpreted through fresh Indonesian produce and imported specialties.',
  },
  {
    icon: Eye,
    title: 'Visible Craft',
    desc: 'Pasta rolled by hand. Fish filleted at the counter. Fire managed in real time. You see it all.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Complete Service',
    desc: 'Tableware, linens, glassware, and service included. We leave the kitchen cleaner than we found it.',
  },
]

const menuCards = [
  {
    icon: BookOpen,
    name: 'The Riviera Menu',
    courses: '7 courses',
    price: 'IDR 2.200.000',
  },
  {
    icon: Wine,
    name: 'The Odyssey Menu',
    courses: '11 courses + wine pairing',
    price: 'IDR 3.000.000',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="grain relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[radial-gradient(ellipse_at_30%_60%,_rgba(201,169,110,0.08)_0%,_transparent_60%)]">
        <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col justify-end px-4 pb-24 pt-32 md:px-8">
          <FadeIn>
            <div className="mb-4 inline-flex items-center gap-2">
              <Flame className="h-3 w-3 text-[#C9A96E]" strokeWidth={2.5} />
              <SectionEyebrow text="Private Mediterranean Fine Dining · Bali" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-[3.2rem] font-light leading-[1.05] text-[#F5F5F0] md:text-[4.5rem]">
              From Sicily / to the /<br />
              <span className="italic text-[#C9A96E]">Aegean</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-xs font-body text-sm text-[#888880] md:max-w-sm">
              A complete Mediterranean journey. Handmade pasta. Fresh seafood. Fire. Served privately in your villa.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A96E] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] transition-colors hover:bg-[#d4b882]"
              >
                Book Your Evening
              </Link>
              <Link
                href="/menus"
                className="inline-flex items-center justify-center gap-2 border border-[#C9A96E] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#080808]"
              >
                View Menus
              </Link>
            </div>
          </FadeIn>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 right-4 flex flex-col items-center gap-2 md:bottom-8 md:right-8">
            <div className="h-8 w-px bg-[#C9A96E] animate-scroll-pulse" />
            <span className="font-body text-[0.55rem] uppercase tracking-[0.2em] text-[#888880]">Scroll</span>
          </div>
        </div>
      </section>

      <IngredientMarquee />

      {/* Concept Section */}
      <section className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="The Concept" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[2.4rem] font-light text-[#F5F5F0]">
              Not catering. A private restaurant.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880]">
              We do not drop off trays. We arrive early, set your table, cook in your kitchen,
              and serve course by course — just like a restaurant, except the room is yours.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-10 grid grid-cols-2 gap-px bg-[#2a2a2a] md:grid-cols-4" stagger={0.08}>
            {conceptItems.map((item) => {
              const Icon = item.icon
              return (
                <StaggerItem key={item.title} className="bg-[#080808] p-5 md:p-6">
                  <Icon className="h-5 w-5 text-[#C9A96E]" strokeWidth={1.5} />
                  <p className="mt-4 font-display text-base text-[#F5F5F0]">{item.title}</p>
                  <p className="mt-1 font-body text-xs leading-relaxed text-[#888880]">{item.desc}</p>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonial Band */}
      <section className="bg-[#111111] px-4 py-10 text-center md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#C9A96E] text-[#C9A96E]" />
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-4 max-w-sm font-display text-xl italic text-[#F5F5F0] md:max-w-md md:text-2xl">
              &ldquo;The best private dining experience we have had in Bali. The pasta was unforgettable.&rdquo;
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 font-body text-xs text-[#888880]">— Guest, Seminyak Villa</p>
          </FadeIn>
        </div>
      </section>

      {/* Two Menus Preview */}
      <section className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="Two Menus" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[2.4rem] font-light text-[#F5F5F0]">Choose your journey</h2>
          </FadeIn>

          <StaggerContainer className="mt-8 grid gap-px bg-[#2a2a2a] md:grid-cols-2" stagger={0.12}>
            {menuCards.map((card) => {
              const Icon = card.icon
              return (
                <StaggerItem key={card.name} className="bg-[#111111] p-6 md:p-8">
                  <Icon className="h-6 w-6 text-[#C9A96E]" strokeWidth={1.5} />
                  <p className="mt-4 font-display text-xl text-[#F5F5F0]">{card.name}</p>
                  <p className="mt-1 font-body text-xs text-[#888880]">{card.courses}</p>
                  <p className="mt-4 font-display text-2xl text-[#C9A96E]">{card.price}</p>
                  <p className="mt-1 font-body text-xs text-[#888880]">per guest</p>
                  <Link
                    href="/menus"
                    className="mt-6 inline-flex items-center gap-2 border border-[#C9A96E] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#080808]"
                  >
                    View Menu
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <p className="mt-6 font-body text-xs text-[#888880]">
              Prices include service and tableware. Wine pairing available on Odyssey Menu. Minimum 4 guests.
              Gratuity not included.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA Band */}
      <section className="px-4 py-10 text-center md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="font-display text-2xl font-light text-[#F5F5F0] md:text-3xl">Ready for your evening?</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-3 font-body text-sm text-[#888880]">Book 3 to 5 days ahead for the best availability.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href="/book"
              className="mt-6 inline-flex items-center gap-2 bg-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] transition-colors hover:bg-[#d4b882]"
            >
              Book Your Evening
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
