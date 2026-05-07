import type { Metadata } from 'next'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { FadeIn } from '@/components/ui/fade-in'

export const metadata: Metadata = {
  title: 'Privacy Policy · Aegean Riviera by myCHEF',
  description:
    'How myCHEF collects, uses, and protects your personal data when you book a private dining experience in Bali.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:py-32">
      <FadeIn>
        <SectionEyebrow text="Legal" className="mb-4" />
        <h1 className="font-display text-3xl font-light text-[#F5F5F0] md:text-4xl">
          Privacy Policy
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-10 space-y-8 font-body text-sm leading-relaxed text-[#888880]">
          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">What We Collect</h2>
            <p className="mt-2">
              When you book or enquire, we collect your name, email, WhatsApp number, preferred date,
              guest count, villa address, and dietary requirements. This is necessary to confirm your
              booking and prepare your menu.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">How We Use Your Data</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>To confirm your booking and send menu details.</li>
              <li>To contact you about dietary requirements or villa access.</li>
              <li>To send a post-event follow-up (opt-out available).</li>
              <li>We do not sell or share your data with third parties for marketing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">Data Storage</h2>
            <p className="mt-2">
              Your data is stored securely via our booking platform (Supabase) with encryption at rest.
              We retain booking records for 2 years for tax and insurance purposes, then delete them
              automatically.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">Cookies & Analytics</h2>
            <p className="mt-2">
              We use essential cookies for site functionality and anonymised analytics to improve our
              service. We do not use third-party advertising cookies. You can disable non-essential
              cookies via your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">Your Rights</h2>
            <p className="mt-2">
              You have the right to access, correct, or delete your personal data. Contact us at
              booking@mychef.id to make a request. We will respond within 14 days.
            </p>
          </section>
        </div>
      </FadeIn>
    </div>
  )
}
