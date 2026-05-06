import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { GoldDivider } from '@/components/website/GoldDivider'
import { IngredientMarquee } from '@/components/website/IngredientMarquee'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

export const metadata: Metadata = {
  title: 'Aegean Riviera by myCHEF · Mediterranean Fine Dining · Bali',
  description:
    'From Sicily to the Aegean — a complete Mediterranean journey. Handmade pasta, fresh seafood, and fire. Served privately in your Bali villa.',
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="grain relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[radial-gradient(ellipse_at_30%_60%,_rgba(201,169,110,0.08)_0%,_transparent_60%)]">
        <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col justify-end px-4 pb-24 pt-32">
          <FadeIn>
            <SectionEyebrow text="Private Mediterranean Fine Dining · Bali" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-[3.2rem] font-light leading-[1.05] text-[#F5F5F0]">
              From Sicily / to the /<br />
              <span className="italic text-[#C9A96E]">Aegean</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-xs font-body text-sm text-[#888880]">
              A complete Mediterranean journey. Handmade pasta. Fresh seafood. Fire. Served privately in your villa.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-[#C9A96E] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] transition-colors hover:bg-[#d4b882]"
              >
                Book Your Evening
              </Link>
              <Link
                href="/menus"
                className="inline-flex items-center justify-center border border-[#C9A96E] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#080808]"
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
      <section className="px-4 py-16">
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

          <StaggerContainer className="mt-10" stagger={0.08}>
            {[
              {
                num: 'I',
                title: 'Private Setting',
                desc: 'Your villa becomes the venue. No shared dining room. No strangers. Just your guests and the kitchen.',
              },
              {
                num: 'II',
                title: 'Mediterranean Focus',
                desc: 'Sicilian and Aegean traditions interpreted through fresh Indonesian produce and imported specialties.',
              },
              {
                num: 'III',
                title: 'Visible Craft',
                desc: 'Pasta rolled by hand. Fish filleted at the counter. Fire managed in real time. You see it all.',
              },
              {
                num: 'IV',
                title: 'Complete Service',
                desc: 'Tableware, linens, glassware, and service included. We leave the kitchen cleaner than we found it.',
              },
            ].map((item) => (
              <StaggerItem key={item.num} className="mt-4 border-t border-[#2a2a2a] pt-4 first:mt-0 first:border-t-0 first:pt-0">
                <div className="flex gap-4">
                  <span className="font-display text-lg text-[#C9A96E]">{item.num}</span>
                  <div>
                    <p className="font-body text-sm font-medium text-[#F5F5F0]">{item.title}</p>
                    <p className="mt-1 font-body text-xs text-[#888880]">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonial Band */}
      <section className="bg-[#111111] py-12 text-center">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sm text-[#C9A96E]">
                  ★
                </span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-4 max-w-sm font-display text-xl italic text-[#F5F5F0]">
              &ldquo;The best private dining experience we have had in Bali. The pasta was unforgettable.&rdquo;
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 font-body text-xs text-[#888880]">— Guest, Seminyak Villa</p>
          </FadeIn>
        </div>
      </section>

      {/* Two Menus Preview */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="Two Menus" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[2.4rem] font-light text-[#F5F5F0]">Choose your journey</h2>
          </FadeIn>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <FadeIn delay={0.2} direction="up">
              <div className="border border-[#2a2a2a] bg-[#111111] p-6">
                <p className="font-display text-xl text-[#F5F5F0]">The Riviera Menu</p>
                <p className="mt-1 font-body text-xs text-[#888880]">7 courses</p>
                <p className="mt-4 font-display text-2xl text-[#C9A96E]">IDR 2.200.000</p>
                <p className="mt-1 font-body text-xs text-[#888880]">per guest</p>
                <Link
                  href="/menus"
                  className="mt-6 inline-flex items-center justify-center border border-[#C9A96E] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#080808]"
                >
                  View Menu
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="up">
              <div className="border border-[#2a2a2a] bg-[#111111] p-6">
                <p className="font-display text-xl text-[#F5F5F0]">The Odyssey Menu</p>
                <p className="mt-1 font-body text-xs text-[#888880]">11 courses + wine pairing</p>
                <p className="mt-4 font-display text-2xl text-[#C9A96E]">IDR 3.000.000</p>
                <p className="mt-1 font-body text-xs text-[#888880]">per guest</p>
                <Link
                  href="/menus"
                  className="mt-6 inline-flex items-center justify-center border border-[#C9A96E] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#080808]"
                >
                  View Menu
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <p className="mt-6 font-body text-xs text-[#888880]">
              Prices include service and tableware. Wine pairing available on Odyssey Menu. Minimum 4 guests.
              Gratuity not included.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <GoldDivider className="mb-12" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-2xl font-light text-[#F5F5F0]">Ready for your evening?</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-3 font-body text-sm text-[#888880]">Book 3 to 5 days ahead for the best availability.</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              href="/book"
              className="mt-6 inline-flex items-center justify-center bg-[#C9A96E] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#080808] transition-colors hover:bg-[#d4b882]"
            >
              Book Your Evening →
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
