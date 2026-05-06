import type { Metadata } from 'next'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { FadeIn } from '@/components/ui/fade-in'
import { MenuTabs } from '@/components/website/MenuTabs'

export const metadata: Metadata = {
  title: 'The Menus · Aegean Riviera by myCHEF',
  description:
    'The Riviera Menu — 7 courses. The Odyssey Menu — 11 courses with premium wine pairing. Mediterranean fine dining served privately in your Bali villa.',
}

export default function MenusPage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-4 pb-16 pt-32 text-center">
        <FadeIn>
          <SectionEyebrow text="The Menus" />
          <h1 className="font-display text-[3rem] font-light leading-tight text-white">
            Riviera & Odyssey
          </h1>
        </FadeIn>
      </section>

      <MenuTabs />
    </div>
  )
}
