import type { Metadata } from 'next'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { FadeIn } from '@/components/ui/fade-in'
import { Clock, CalendarX, ShieldCheck, RotateCcw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cancellation Policy · Aegean Riviera by myCHEF',
  description:
    'Clear cancellation and refund terms for private Mediterranean fine dining bookings in Bali.',
}

export default function CancellationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:py-32">
      <FadeIn>
        <SectionEyebrow text="Booking" className="mb-4" />
        <h1 className="font-display text-3xl font-light text-[#F5F5F0] md:text-4xl">
          Cancellation Policy
        </h1>
        <p className="mt-4 font-body text-sm leading-relaxed text-[#888880]">
          We understand plans change. Our policy is designed to be fair to both our guests and our
          team, who begin preparation days before your evening.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-10 space-y-6">
          {[
            {
              icon: Clock,
              title: 'More than 7 days before',
              desc: 'Full refund of your deposit minus a 5% processing fee. No questions asked.',
            },
            {
              icon: CalendarX,
              title: '3–7 days before',
              desc: '50% refund of your deposit. The remainder covers ingredients and staffing already committed.',
            },
            {
              icon: ShieldCheck,
              title: 'Under 48 hours',
              desc: 'Deposit is non-refundable. Our team has already sourced ingredients and reserved the date.',
            },
            {
              icon: RotateCcw,
              title: 'Force majeure',
              desc: 'Severe weather, villa closure, or medical emergency: deposit is transferable to a new date within 6 months.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border border-[#2a2a2a]/50 bg-[#111111]/50 p-6 transition-colors duration-500 hover:border-[#C9A96E]/20 hover:bg-[#111111] md:p-8"
            >
              <div className="flex items-start gap-4">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A96E]" strokeWidth={1} />
                <div>
                  <h2 className="font-display text-lg text-[#F5F5F0]">{item.title}</h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-[#888880]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-10 border-l border-[#C9A96E]/30 py-2 pl-5">
          <p className="font-body text-sm italic text-[#888880]">
            Questions? Contact us at{' '}
            <a href="mailto:booking@mychef.id" className="text-[#C9A96E] hover:underline">
              booking@mychef.id
            </a>{' '}
            and we will respond within 4 hours.
          </p>
        </div>
      </FadeIn>
    </div>
  )
}
