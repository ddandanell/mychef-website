import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Sparkles,
  Clock,
  Wine,
  Salad,
  ChefHat,
  Flame,
  Coffee,
  CircleDot,
  Fish,
  Droplets,
  Table,
  Leaf,
  MapPin,
  Home,
  HelpCircle,
} from 'lucide-react'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { GoldDivider } from '@/components/website/GoldDivider'
import { FAQItem } from '@/components/website/FAQItem'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

export const metadata: Metadata = {
  title: 'The Experience \u00b7 Aegean Riviera by myCHEF',
  description:
    'What to expect from a private Mediterranean fine dining evening in your Bali villa. Arrival, courses, visible craft, and complete service.',
}

const eveningSequence = [
  {
    num: 'I',
    title: 'Arrival & Setup',
    desc: 'We arrive two hours before service. Table set. Kitchen prepped. Music chosen.',
    Icon: Clock,
  },
  {
    num: 'II',
    title: 'Welcome Aperitivo',
    desc: 'Sicilian olives, warm focaccia, and a chilled glass while we finish behind the counter.',
    Icon: Wine,
  },
  {
    num: 'III',
    title: 'Antipasti',
    desc: 'Raw, grilled, and marinated bites served to the table as conversation starts.',
    Icon: Salad,
  },
  {
    num: 'IV',
    title: 'Primi',
    desc: 'Handmade pasta. The heart of the meal. Served with explanation of origin and technique.',
    Icon: ChefHat,
  },
  {
    num: 'V',
    title: 'Secondi',
    desc: 'Fire-grilled fish or slow-braised protein. Accompanied by seasonal vegetables.',
    Icon: Flame,
  },
  {
    num: 'VI',
    title: 'Dolce & Digestivo',
    desc: 'Dessert, espresso, and a final pour. We clean while you finish the evening.',
    Icon: Coffee,
  },
]

const visibleCraft = [
  {
    text: 'Pasta dough rolled and cut by hand',
    sub: 'Tagliatelle, pappardelle, stuffed shapes',
    Icon: CircleDot,
  },
  {
    text: 'Whole fish filleted at the counter',
    sub: 'Mediterranean sea bass, red snapper, barramundi',
    Icon: Fish,
  },
  {
    text: 'Fire management and charcoal timing',
    sub: 'Oak and coconut husk, adjusted per course',
    Icon: Flame,
  },
  {
    text: 'Sauce reduction and emulsions',
    sub: 'Butter, wine, stock, and olive oil in motion',
    Icon: Droplets,
  },
  {
    text: 'Table setting and course presentation',
    sub: 'Ceramic, linen, and silverware for each dish',
    Icon: Table,
  },
  {
    text: 'Wine decanting and pouring',
    sub: 'Temperature-checked, timed with courses',
    Icon: Wine,
  },
  {
    text: 'Final plating and garnish',
    sub: 'Herbs, oils, and salts applied at the last second',
    Icon: Leaf,
  },
  {
    text: 'Kitchen breakdown and reset',
    sub: 'Cleaned and restored before we leave',
    Icon: Sparkles,
  },
]

const areas = [
  'Seminyak',
  'Canggu',
  'Uluwatu',
  'Ubud',
  'Nusa Dua',
  'Sanur',
  'Jimbaran',
  'Pererenan',
]

export default function ExperiencePage() {
  return (
    <div>
      {/* Hero */}
      <section className="grain relative min-h-[100dvh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/fire-grill.jpg"
            alt="Fire-grilled cooking"
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
              <Sparkles className="h-3.5 w-3.5 text-[#C9A96E]" strokeWidth={1} />
              <SectionEyebrow text="The Experience" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} blur>
            <h1 className="font-display text-[3.5rem] font-light leading-[1.05] text-[#F5F5F0] md:text-[5rem] lg:text-[6rem]">
              What to
              <br />
              <span className="italic text-[#C9A96E]">Expect</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-[#888880] md:max-w-md md:text-base">
              A complete evening from arrival to digestivo. Handmade pasta, fire-grilled fish,
              and visible craft — all in your villa.
            </p>
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

      {/* Evening Sequence */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="The Evening Sequence" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1} blur>
            <h2 className="font-display text-[2rem] font-light text-[#F5F5F0] md:text-[2.8rem] lg:text-[3.2rem]">
              Six movements
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880] md:text-base">
              The evening unfolds like a story — each course a chapter, each technique a detail
              you witness in real time.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-px md:mt-16 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {eveningSequence.map((item) => (
              <StaggerItem key={item.num}>
                <div className="group border border-[#2a2a2a]/50 bg-[#111111]/50 p-5 transition-colors duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111] md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#2a2a2a]">
                      <span className="font-display text-sm text-[#C9A96E]">{item.num}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <item.Icon
                          className="h-4 w-4 text-[#C9A96E] transition-transform duration-500 group-hover:scale-110"
                          strokeWidth={1}
                        />
                        <p className="font-body text-sm font-medium text-[#F5F5F0]">{item.title}</p>
                      </div>
                      <p className="mt-1 font-body text-xs leading-relaxed text-[#888880]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Visible Craft */}
      <section className="border-y border-[#2a2a2a]/30 bg-[#111111]/30 px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {/* Image */}
            <FadeIn>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/fire-grill-action.webp"
                  alt="Chef fire-grilling sea bass over open flames"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
            {/* Text */}
            <div className="flex flex-col justify-center">
              <FadeIn>
                <SectionEyebrow text="Visible Craft" className="mb-4" />
              </FadeIn>
              <FadeIn delay={0.1} blur>
                <h2 className="font-display text-[2rem] font-light text-[#F5F5F0] md:text-[2.8rem] lg:text-[3.2rem]">
                  What you will see
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880] md:text-base">
                  We do not hide in the kitchen. The counter is the stage. You will watch dough transform,
                  flames adjust, and sauce reduce — all in real time.
                </p>
              </FadeIn>
            </div>
          </div>

          <StaggerContainer className="mt-12 grid gap-px md:mt-16 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {visibleCraft.map((item, i) => (
              <StaggerItem key={i}>
                <div className="group border border-[#2a2a2a]/50 bg-[#111111]/50 p-5 transition-colors duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111] md:p-6">
                  <div className="flex items-center gap-3">
                    <span className="block h-1.5 w-1.5 shrink-0 bg-[#C9A96E]" />
                    <item.Icon
                      className="h-4 w-4 text-[#C9A96E] transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1}
                    />
                    <p className="font-body text-sm text-[#F5F5F0]">{item.text}</p>
                  </div>
                  <p className="mt-2 pl-5 font-body text-xs italic text-[#888880]">{item.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Location */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="Where We Serve" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1} blur>
            <h2 className="font-display text-[2rem] font-light text-[#F5F5F0] md:text-[2.8rem] lg:text-[3.2rem]">
              Bali&apos;s finest villa locations
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880] md:text-base">
              We travel across the island to bring the Aegean to your door.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-10 flex flex-wrap gap-2 md:mt-14" stagger={0.05}>
            {areas.map((area) => (
              <StaggerItem key={area}>
                <span className="inline-flex items-center gap-1.5 border border-[#2a2a2a]/50 bg-[#111111]/50 px-3 py-1.5 font-body text-xs text-[#888880] transition-colors duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111]">
                  <MapPin className="h-3 w-3 text-[#C9A96E]" strokeWidth={1} />
                  {area}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-10 border border-[#2a2a2a]/50 bg-[#111111]/50 p-6 transition-colors duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111] md:p-8">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-[#C9A96E]" strokeWidth={1} />
                <p className="font-body text-sm font-medium text-[#F5F5F0]">Villa Requirements</p>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#888880]">
                We need a functional kitchen with at least 4 burners and oven access, plus a dining table
                that seats your party. Outdoor kitchens and poolside tables are welcome. We bring all
                cooking equipment, serving ware, and linens.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-[#2a2a2a]/30 bg-[#111111]/30 px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-4 inline-flex items-center gap-2">
              <HelpCircle className="h-3.5 w-3.5 text-[#C9A96E]" strokeWidth={1} />
              <SectionEyebrow text="Questions" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} blur>
            <h2 className="font-display text-[2rem] font-light text-[#F5F5F0] md:text-[2.8rem] lg:text-[3.2rem]">
              Before you book
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 md:mt-14">
              <FAQItem
                question="What is the minimum number of guests?"
                answer="Standard bookings require a minimum of 4 guests. For intimate occasions such as honeymoons or anniversaries, we accept 2 guests at a fixed minimum spend of IDR 8,800,000. Maximum 20. Larger groups by request."
              />
              <FAQItem
                question="Do you bring all the equipment?"
                answer="Yes. We bring everything — cooking equipment, serving ware, linens. Villa needs only kitchen and dining area."
              />
              <FAQItem
                question="Can we customise the menu?"
                answer="Menus work best as written. We accommodate allergies and dietary requirements — note them at booking."
              />
              <FAQItem
                question="Is wine pairing available on both menus?"
                answer="Premium wine pairing is on The Odyssey Menu. Individual bottle recommendations available on Riviera Menu."
              />
              <FAQItem
                question="How far in advance should we book?"
                answer="3 to 5 days recommended. Last-minute under 48 hours — contact email directly."
              />
              <FAQItem
                question="What happens if we need to cancel?"
                answer="More than 48 hours before event: full refund. Under 48 hours: 50% cancellation fee applies."
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <GoldDivider className="mt-12 md:mt-16" />
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
