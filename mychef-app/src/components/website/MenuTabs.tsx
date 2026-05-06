'use client'

import { useState } from 'react'
import { SectionEyebrow } from './SectionEyebrow'
import { GoldDivider } from './GoldDivider'
import { FadeIn } from '@/components/ui/fade-in'
import Link from 'next/link'

interface Course {
  number: string
  title: string
  desc: string
  alternate?: string
}

const rivieraCourses: Course[] = [
  { number: '01', title: 'The First Coast', desc: 'crisp cannolo with whipped ricotta, lemon zest, basil oil, and bottarga' },
  { number: '02', title: 'Raw From The Sea', desc: 'line-caught fish crudo with Amalfi lemon, sea salt, capers, extra virgin olive oil', alternate: 'Upgrade: tuna tartare with caviar, smoked olive oil, citrus' },
  { number: '03', title: 'The Island Garden', desc: 'burrata or Greek feta with heirloom tomato, grilled peach or fig, basil, oregano, aged balsamic, olive oil' },
  { number: '04', title: 'Handmade Pasta at the Table', desc: 'lobster ravioli with ricotta, lemon, saffron shellfish bisque, basil oil', alternate: 'tagliolini with crab, chili, lemon, white wine, bottarga' },
  { number: '05', title: 'Fire From The Coast', desc: 'charcoal-grilled catch with fennel, lemon, capers, Greek olive oil, herb sauce', alternate: 'butter-poached lobster with lemon beurre blanc and zucchini flower' },
  { number: '06', title: 'Citrus Reset', desc: 'lemon granita with olive oil, sea salt, and mint' },
  { number: '07', title: 'The Golden Coast', desc: 'olive oil cake with mascarpone cream, roasted fig, honey, pistachio, citrus', alternate: 'Greek coffee tiramisu with dark chocolate and sea salt' },
]

const odysseyCourses: Course[] = [
  { number: '01', title: 'The Arrival Ritual', desc: 'welcome drink, chef introduction, parmesan shell with ricotta, lemon, basil, bottarga' },
  { number: '02', title: 'Oyster, Sea, Gold', desc: 'fresh oyster with champagne vinegar, cucumber, lemon, caviar', alternate: 'scallop tartlet with caviar and smoked olive oil' },
  { number: '03', title: 'Crudo of Three Coasts', desc: 'three preparations: Sicily (tuna, blood orange, caper, olive oil), Amalfi (white fish, lemon, basil, sea salt), Aegean (scallop, cucumber, green olive, oregano)' },
  { number: '04', title: 'Shellfish and Smoke', desc: 'charred king prawn / langoustine / lobster tail with smoked tomato, oregano, lemon, chili oil, saffron' },
  { number: '05', title: 'The Bread and Olive Oil Ceremony', desc: 'handmade focaccia, Greek flatbread, cultured butter, premium olive oil, sea salt, whipped ricotta or feta cream' },
  { number: '06', title: 'The Island Garden', desc: 'zucchini flower filled with ricotta and herbs, tomato water, basil, olive oil, aged cheese', alternate: 'charred eggplant, Greek yogurt, tomato, herbs, pine nuts' },
  { number: '07', title: 'Handmade Pasta I: Sicily', desc: 'tagliolini with crab, lemon, chili, white wine, bottarga, toasted breadcrumbs' },
  { number: '08', title: 'Handmade Pasta II: Amalfi', desc: 'lobster ravioli with saffron shellfish bisque, basil oil, lemon zest, parmesan' },
  { number: '09', title: 'The Main Sea Course', desc: 'charcoal-grilled turbot / snapper / sea bass with fennel, capers, lemon, olive oil, herb sauce', alternate: 'butter-poached lobster with lemon beurre blanc, white asparagus, basil' },
  { number: '10', title: 'Land and Fire', desc: 'milk-fed lamb with rosemary, smoked eggplant, Greek yogurt, oregano, lamb jus', alternate: 'wagyu with black olive, potato mille-feuille, rosemary, red wine jus' },
  { number: '11', title: 'The Last Coast', desc: 'olive oil cake, mascarpone cream, roasted fig, honey, pistachio, citrus, sea salt. Petit fours' },
]

const wines = [
  'Sicilian Grillo — crisp, saline, opens the crudo courses',
  'Etna Bianco — volcanic minerality with the shellfish and smoke',
  'Fiano di Avellino — rich white to carry the pasta and risotto',
  'Greco di Tufo — aromatic backbone for the island garden courses',
  'Aglianico — structured red for the lamb or wagyu finish',
  'Passito di Pantelleria — sweet, sun-dried closure with dessert',
]

function CourseItem({ number, title, desc, alternate }: Course) {
  return (
    <div className="flex gap-4">
      <span className="w-8 shrink-0 font-display text-lg text-gold">{number}</span>
      <div className="flex-1">
        <h3 className="font-body text-sm font-medium text-white">{title}</h3>
        <p className="mt-1 font-body text-xs leading-relaxed text-muted">{desc}</p>
        {alternate && <p className="mt-1 font-body text-xs italic text-gold-dim">Alt: {alternate}</p>}
      </div>
    </div>
  )
}

export function MenuTabs() {
  const [activeMenu, setActiveMenu] = useState<'riviera' | 'odyssey'>('riviera')

  return (
    <div>
      {/* Tab Toggle */}
      <section className="px-4 pb-10">
        <FadeIn delay={0.1}>
          <div className="mx-auto flex max-w-md">
            <button
              onClick={() => setActiveMenu('riviera')}
              className={`flex-1 py-3 font-body text-xs font-medium uppercase tracking-wider transition-colors ${
                activeMenu === 'riviera'
                  ? 'bg-gold text-black'
                  : 'border border-[#2a2a2a] bg-surface text-muted'
              }`}
            >
              The Riviera — 7 Courses
            </button>
            <button
              onClick={() => setActiveMenu('odyssey')}
              className={`flex-1 py-3 font-body text-xs font-medium uppercase tracking-wider transition-colors ${
                activeMenu === 'odyssey'
                  ? 'bg-gold text-black'
                  : 'border border-[#2a2a2a] bg-surface text-muted'
              }`}
            >
              The Odyssey — 11 Courses
            </button>
          </div>
        </FadeIn>
      </section>

      {/* Riviera Panel */}
      {activeMenu === 'riviera' && (
        <section className="px-4 pb-16">
          <FadeIn>
            <div className="mx-auto max-w-xl">
              <h2 className="text-center font-display text-2xl italic text-white">The Riviera Menu</h2>
              <p className="mt-2 text-center font-body text-xs text-muted">Seven courses through Sicily, Italy, Greece & the Aegean</p>
              <p className="mt-4 text-center font-display text-xl text-gold">IDR 2.200.000 per person · minimum 4 guests</p>
              <GoldDivider className="my-10" />
              <div className="space-y-8">
                {rivieraCourses.map((c) => (
                  <CourseItem key={c.number} {...c} />
                ))}
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* Odyssey Panel */}
      {activeMenu === 'odyssey' && (
        <section className="px-4 pb-16">
          <FadeIn>
            <div className="mx-auto max-w-xl">
              <h2 className="text-center font-display text-2xl italic text-white">The Odyssey Menu</h2>
              <p className="mt-2 text-center font-body text-xs text-muted">Eleven courses · The flagship · Premium wine pairing</p>
              <p className="mt-4 text-center font-display text-xl text-gold">IDR 3.000.000 per person · minimum 4 guests · wine pairing available</p>
              <GoldDivider className="my-10" />
              <div className="space-y-8">
                {odysseyCourses.map((c) => (
                  <CourseItem key={c.number} {...c} />
                ))}
              </div>
              <GoldDivider className="my-10" />
              <div className="border border-[#2a2a2a] bg-surface p-5">
                <h3 className="font-display text-lg text-gold">Wine Pairing Journey</h3>
                <ul className="mt-4 list-disc space-y-2 pl-4 font-body text-xs text-muted">
                  {wines.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="px-4 pb-20">
        <FadeIn>
          <div className="mx-auto max-w-xl">
            <p className="text-center font-body text-[0.65rem] uppercase tracking-wider text-muted">
              All menus are prepared fresh in your villa. Dietary restrictions accommodated with 48 hours notice.
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex w-full items-center justify-center bg-gold py-3 font-body text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-gold-light"
            >
              Book Your Evening →
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
