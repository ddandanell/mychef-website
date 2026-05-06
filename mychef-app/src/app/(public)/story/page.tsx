import type { Metadata } from 'next'
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
import { FadeIn } from '@/components/ui/fade-in'

export const metadata: Metadata = {
  title: 'Our Story · Aegean Riviera by myCHEF',
  description:
    'Meet Marco Ferrara and Luca Romano — the chefs behind myCHEF. Sicilian craft, Neapolitan pasta mastery, and 30+ years of fine dining experience in Bali.',
}

export default function StoryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-4 pb-10 pt-32 text-center md:px-8 md:pb-16">
        <FadeIn>
          <SectionEyebrow text="Our Story" />
          <div className="mt-4 flex items-center justify-center gap-3">
            <Users className="h-5 w-5 text-[#C9A96E]" strokeWidth={1.5} />
            <h1 className="font-display text-[2.5rem] font-light leading-tight text-[#F5F5F0] md:text-[3rem]">
              The Chefs Behind the Table
            </h1>
          </div>
        </FadeIn>
      </section>

      {/* Chef 1 — Marco Ferrara */}
      <section className="px-4 py-10 md:px-8 md:py-16">
        <FadeIn>
          <div className="mx-auto max-w-xl">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#111111]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.15)_0%,_transparent_70%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <SectionEyebrow text="Executive Chef & Co-Founder" className="mb-2" />
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#C9A96E]" strokeWidth={1.5} />
                  <h2 className="font-display text-3xl font-light text-[#F5F5F0]">Marco Ferrara</h2>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-[#888880]" strokeWidth={1.5} />
                <p className="font-body text-xs uppercase tracking-wider text-[#888880]">
                  Sicily, Italy · Head Judge · 3 Michelin Properties · 18 years fine dining
                </p>
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-[#888880]">
                Marco grew up in Palermo, where the market vendors knew him by name before he could
                reach the counter. By fifteen he was staging in Milan. By twenty-five he was running
                the pass at a two-Michelin-star kitchen on the Amalfi Coast. He believes every dish
                should tell you where it came from — and who made it.
              </p>
              <blockquote className="mt-6 border-l-2 border-[#C9A96E] pl-4">
                <Quote className="mb-2 h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                <p className="font-display text-lg italic leading-snug text-[#C9A96E]">
                  "Fine dining is not about distance between chef and guest. It is about closing it."
                </p>
              </blockquote>
            </div>
          </div>
        </FadeIn>
      </section>

      <GoldDivider className="mx-auto max-w-xl px-4 md:px-8" />

      {/* Chef 2 — Luca Romano */}
      <section className="px-4 py-10 md:px-8 md:py-16">
        <FadeIn>
          <div className="mx-auto max-w-xl">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#111111]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(160,140,100,0.12)_0%,_transparent_70%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <SectionEyebrow text="Chef & Culinary Director" className="mb-2" />
                <div className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-[#C9A96E]" strokeWidth={1.5} />
                  <h2 className="font-display text-3xl font-light text-[#F5F5F0]">Luca Romano</h2>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-[#888880]" strokeWidth={1.5} />
                <p className="font-body text-xs uppercase tracking-wider text-[#888880]">
                  Naples, Italy · Award-winning restaurant chef · Pasta specialist · Bali-based
                </p>
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-[#888880]">
                Luca arrived in Bali with a suitcase of bronze-die pasta shapes and a notebook of dough
                ratios. In Naples he trained under masters of sfoglia — the art of hand-rolled pasta
                sheets so thin they read like silk. Today he leads the myCHEF kitchen with a singular
                obsession: pasta made at the table, in front of the guest, within seconds of hitting
                the plate.
              </p>
              <blockquote className="mt-6 border-l-2 border-[#C9A96E] pl-4">
                <Quote className="mb-2 h-4 w-4 text-[#C9A96E]" strokeWidth={1.5} />
                <p className="font-display text-lg italic leading-snug text-[#C9A96E]">
                  "The best pasta is not made in a factory. It is made in the moment you need it."
                </p>
              </blockquote>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* How myCHEF Was Born */}
      <section className="px-4 py-10 md:px-8 md:py-16">
        <FadeIn>
          <div className="mx-auto max-w-xl">
            <SectionEyebrow text="How It Started" />
            <h2 className="mt-4 font-display text-3xl font-light text-[#F5F5F0]">Why Bali. Why now.</h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-[#888880]">
              myCHEF was born from a simple contradiction: Bali has some of the most beautiful private
              villas in the world, yet the dining experience inside them rarely matches the setting.
              Marco and Luca decided to change that — one villa, one table, one evening at a time.
            </p>

            <div className="relative mt-10 space-y-8 border-l border-[#C9A96E]/30 pl-6">
              <TimelineItem
                icon={<Sparkles className="h-3.5 w-3.5 text-[#080808]" strokeWidth={2} />}
                title="2019 — The First Table"
                desc="Marco hosts a private dinner for six friends in a Seminyak villa. No restaurant. No reservations. Just fire, fish, and conversation."
              />
              <TimelineItem
                icon={<Handshake className="h-3.5 w-3.5 text-[#080808]" strokeWidth={2} />}
                title="2021 — The Naples Connection"
                desc="Luca joins after a chance meeting in Jakarta. They agree: pasta must be handmade at the table. The myCHEF concept crystallizes."
              />
              <TimelineItem
                icon={<BookOpen className="h-3.5 w-3.5 text-[#080808]" strokeWidth={2} />}
                title="2023 — The Riviera Menu"
                desc="The seven-course tasting menu debuts, built around Sicily, Amalfi, and the Aegean. Word spreads through villas, not reviews."
              />
              <TimelineItem
                icon={<Crown className="h-3.5 w-3.5 text-[#080808]" strokeWidth={2} />}
                title="2025 — Aegean Riviera"
                desc="The Odyssey is added. A full brigade of trained Indonesian sous chefs. The myCHEF standard becomes the benchmark for villa dining in Bali."
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Training Section */}
      <section className="bg-[#111111] px-4 py-10 md:px-8 md:py-16">
        <FadeIn>
          <div className="mx-auto max-w-xl text-center">
            <div className="flex items-center justify-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#C9A96E]" strokeWidth={1.5} />
              <h2 className="font-display text-2xl italic text-[#F5F5F0]">Italian craft. Bali hands.</h2>
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-[#888880]">
              Every myCHEF sous chef is trained in-house by Marco and Luca. Not just recipes —
              technique, timing, plating under pressure, and the invisible art of reading a room. The
              team is Indonesian, the standards are Italian, and the result is something that can only
              happen here.
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

function TimelineItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="relative">
      <span className="absolute -left-[29px] top-0 flex h-5 w-5 items-center justify-center bg-[#C9A96E]">
        {icon}
      </span>
      <h3 className="font-body text-sm font-medium text-[#F5F5F0]">{title}</h3>
      <p className="mt-1 font-body text-xs leading-relaxed text-[#888880]">{desc}</p>
    </div>
  )
}
