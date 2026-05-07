import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Users,
  Award,
  MapPin,
  Quote,
  ChefHat,
  Sparkles,
  Handshake,
  BookOpen,
  Crown,
  GraduationCap,
} from 'lucide-react'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { GoldDivider } from '@/components/website/GoldDivider'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in'

export const metadata: Metadata = {
  title: 'Our Story · Aegean Riviera by myCHEF',
  description:
    'Meet Marco Ferrara and Luca Romano — the chefs behind myCHEF. Sicilian craft, Neapolitan pasta mastery, and 30+ years of fine dining experience in Bali.',
}

const timeline = [
  {
    icon: Sparkles,
    title: '2019 — The First Table',
    desc: 'Marco hosts a private dinner for six friends in a Seminyak villa. No restaurant. No reservations. Just fire, fish, and conversation.',
  },
  {
    icon: Handshake,
    title: '2021 — The Naples Connection',
    desc: 'Luca joins after a chance meeting in Jakarta. They agree: pasta must be handmade at the table. The myCHEF concept crystallizes.',
  },
  {
    icon: BookOpen,
    title: '2023 — The Riviera Menu',
    desc: 'The seven-course tasting menu debuts, built around Sicily, Amalfi, and the Aegean. Word spreads through villas, not reviews.',
  },
  {
    icon: Crown,
    title: '2025 — Aegean Riviera',
    desc: 'The Odyssey is added. A full brigade of trained sous chefs. Over 240 private dinners hosted across 38 villas.',
  },
  {
    icon: Sparkles,
    title: '2026 — The Standard',
    desc: 'Two menus. One team. One table per evening. The benchmark for private Mediterranean dining in Bali.',
  },
]

export default function StoryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-[radial-gradient(ellipse_at_30%_60%,_rgba(201,169,110,0.08)_0%,_transparent_60%)]">
        <div className="relative z-10 flex min-h-[50dvh] flex-col justify-end px-4 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-[#C9A96E]" strokeWidth={1} />
              <SectionEyebrow text="Our Story" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} blur>
            <h1 className="font-display text-[3rem] font-light leading-[1.05] text-[#F5F5F0] md:text-[4.5rem] lg:text-[5.5rem]">
              The Chefs Behind
              <br />
              the <span className="italic text-[#C9A96E]">Table</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-[#888880] md:text-base">
              Two chefs. Two coasts of Italy. One standard for private dining in Bali.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Chef 1 — Marco Ferrara */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mx-auto max-w-xl">
              <div className="group relative aspect-[3/4] overflow-hidden border border-[#2a2a2a]/50 transition-all duration-500 hover:border-[#C9A96E]/20">
                <Image
                  src="/images/chef-marco.webp"
                  alt="Chef Marco Ferrara at work in a Bali villa kitchen"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#C9A96E]" strokeWidth={1} />
                    <SectionEyebrow text="Executive Chef & Co-Founder" />
                  </div>
                  <h2 className="font-display text-3xl font-light text-[#F5F5F0] md:text-4xl">
                    Marco Ferrara
                  </h2>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-[#888880]" strokeWidth={1} />
                  <p className="font-body text-xs uppercase tracking-wider text-[#888880]">
                    Sicily, Italy · 3 Michelin Properties · 18 years
                  </p>
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed text-[#888880] md:text-base">
                  Marco grew up in Palermo, where the market vendors knew him by name before he could
                  reach the counter. By fifteen he was staging in Milan. By twenty-five he was running
                  the pass at a two-Michelin-star kitchen on the Amalfi Coast. He believes every dish
                  should tell you where it came from — and who made it.
                </p>
                <blockquote className="mt-8 border-l border-[#C9A96E]/30 py-2 pl-5">
                  <Quote className="mb-3 h-4 w-4 text-[#C9A96E]" strokeWidth={1} />
                  <p className="font-display text-lg italic leading-snug text-[#C9A96E] md:text-xl">
                    &ldquo;Fine dining is not about distance between chef and guest. It is about closing it.&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-6xl px-4 md:px-8" />

      {/* Chef 2 — Luca Romano */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mx-auto max-w-xl">
              <div className="group relative aspect-[3/4] overflow-hidden border border-[#2a2a2a]/50 transition-all duration-500 hover:border-[#C9A96E]/20">
                <Image
                  src="/images/chef-luca.webp"
                  alt="Chef Luca Romano rolling handmade pasta"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="mb-2 flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-[#C9A96E]" strokeWidth={1} />
                    <SectionEyebrow text="Chef & Culinary Director" />
                  </div>
                  <h2 className="font-display text-3xl font-light text-[#F5F5F0] md:text-4xl">
                    Luca Romano
                  </h2>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-[#888880]" strokeWidth={1} />
                  <p className="font-body text-xs uppercase tracking-wider text-[#888880]">
                    Naples, Italy · Pasta specialist · Bali-based
                  </p>
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed text-[#888880] md:text-base">
                  Luca arrived in Bali with a suitcase of bronze-die pasta shapes and a notebook of dough
                  ratios. In Naples he trained under masters of sfoglia — the art of hand-rolled pasta
                  sheets so thin they read like silk. Today he leads the myCHEF kitchen with a singular
                  obsession: pasta made at the table, in front of the guest, within seconds of hitting
                  the plate.
                </p>
                <blockquote className="mt-8 border-l border-[#C9A96E]/30 py-2 pl-5">
                  <Quote className="mb-3 h-4 w-4 text-[#C9A96E]" strokeWidth={1} />
                  <p className="font-display text-lg italic leading-snug text-[#C9A96E] md:text-xl">
                    &ldquo;The best pasta is not made in a factory. It is made in the moment you need it.&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How myCHEF Was Born */}
      <section className="border-y border-[#2a2a2a]/30 px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionEyebrow text="How It Started" className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.1} blur>
            <h2 className="font-display text-[2rem] font-light text-[#F5F5F0] md:text-[2.8rem] lg:text-[3.2rem]">
              Why Bali. Why now.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#888880] md:text-base">
              myCHEF was born from a simple contradiction: Bali has some of the most beautiful private
              villas in the world, yet the dining experience inside them rarely matches the setting.
              Marco and Luca decided to change that — one villa, one table, one evening at a time.
            </p>
          </FadeIn>

          <StaggerContainer
            className="relative mx-auto mt-14 max-w-xl border-l border-[#C9A96E]/30 pl-6 md:mt-20"
            stagger={0.12}
          >
            {timeline.map((item) => (
              <StaggerItem key={item.title}>
                <div className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[29px] top-0 flex h-5 w-5 items-center justify-center bg-[#C9A96E]">
                    <item.icon className="h-3.5 w-3.5 text-[#080808]" strokeWidth={1} />
                  </span>
                  <h3 className="font-body text-sm font-medium text-[#F5F5F0]">{item.title}</h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-[#888880] md:text-sm">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Training Section */}
      <section className="bg-[#111111]/30 px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#C9A96E]" strokeWidth={1} />
              <h2 className="font-display text-2xl font-light italic text-[#F5F5F0] md:text-3xl">
                Italian craft. Bali hands.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-lg font-body text-sm leading-relaxed text-[#888880] md:text-base">
              Every myCHEF brigade member is trained in-house by Marco and Luca. Not just recipes —
              technique, timing, plating under pressure, and the invisible art of reading a room. Our
              team brings together Italian culinary standards with deep local knowledge of Balinese
              ingredients and villa service. The result is something that can only happen here.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
