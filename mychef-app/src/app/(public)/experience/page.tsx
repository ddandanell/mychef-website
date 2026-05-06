import type { Metadata } from 'next'
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
  title: 'The Experience · Aegean Riviera by myCHEF',
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
      <section className="px-4 py-10 pt-32 text-center md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3 text-[#C9A96E]" />
              <SectionEyebrow text="The Experience" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-[3rem] font-light leading-tight text-[#F5F5F0]">
              What to Expect
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Evening Sequence */}
      <section className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="The Evening Sequence" className="mb-4" />
          </FadeIn>

          <StaggerContainer className="mt-8 space-y-6" stagger={0.08}>
            {eveningSequence.map((item) => (
              <StaggerItem key={item.num} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#2a2a2a]">
                  <span className="font-display text-sm text-[#C9A96E]">{item.num}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <item.Icon className="h-4 w-4 text-[#C9A96E]" />
                    <p className="font-body text-sm font-medium text-[#F5F5F0]">{item.title}</p>
                  </div>
                  <p className="mt-1 font-body text-xs leading-relaxed text-[#888880]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Visible Craft */}
      <section className="bg-[#111111] px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="Visible Craft" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[2.4rem] font-light leading-tight text-[#F5F5F0]">
              What you will see
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880]">
              We do not hide in the kitchen. The counter is the stage. You will watch dough transform,
              flames adjust, and sauce reduce — all in real time.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-8 space-y-4" stagger={0.06}>
            {visibleCraft.map((item, i) => (
              <StaggerItem key={i} className="flex items-start gap-3">
                <div className="mt-1 flex h-2 w-2 shrink-0 items-center justify-center">
                  <span className="block h-1.5 w-1.5 bg-[#C9A96E]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <item.Icon className="h-3.5 w-3.5 text-[#C9A96E]" />
                    <p className="font-body text-sm text-[#F5F5F0]">{item.text}</p>
                  </div>
                  <p className="mt-0.5 font-body text-xs italic text-[#888880]">{item.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Location */}
      <section className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="Where We Serve" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[2.4rem] font-light leading-tight text-[#F5F5F0]">
              Bali&apos;s finest villa locations
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-2">
              {areas.map((area) => (
                <span
                  key={area}
                  className="flex items-center gap-1.5 border border-[#2a2a2a] px-3 py-1.5 font-body text-xs text-[#888880]"
                >
                  <MapPin className="h-3 w-3 text-[#C9A96E]" />
                  {area}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-6 border border-[#2a2a2a] bg-[#111111] p-5">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-[#C9A96E]" />
                <p className="font-body text-sm font-medium text-[#F5F5F0]">Villa Requirements</p>
              </div>
              <p className="mt-2 font-body text-xs leading-relaxed text-[#888880]">
                We need a functional kitchen with at least 4 burners and oven access, plus a dining table
                that seats your party. Outdoor kitchens and poolside tables are welcome. We bring all
                cooking equipment, serving ware, and linens.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-4 flex items-center gap-2">
              <HelpCircle className="h-3.5 w-3.5 text-[#C9A96E]" />
              <SectionEyebrow text="Questions" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[2.4rem] font-light leading-tight text-[#F5F5F0]">
              Before you book
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8">
              <FAQItem
                question="What is the minimum number of guests?"
                answer="Minimum 4 guests per booking. Maximum 20. Larger groups by request."
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
                answer="3 to 5 days recommended. Last-minute under 48 hours — contact WhatsApp directly."
              />
              <FAQItem
                question="What happens if we need to cancel?"
                answer="More than 48 hours before event: full refund. Under 48 hours: 50% cancellation fee applies."
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <GoldDivider className="mt-12" />
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
