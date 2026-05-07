import type { Metadata } from 'next'
import { SectionEyebrow } from '@/components/website/SectionEyebrow'
import { FadeIn } from '@/components/ui/fade-in'

export const metadata: Metadata = {
  title: 'Terms & Conditions · Aegean Riviera by myCHEF',
  description:
    'Booking terms, cancellation policy, and conditions for private Mediterranean fine dining experiences in Bali.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:py-32">
      <FadeIn>
        <SectionEyebrow text="Legal" className="mb-4" />
        <h1 className="font-display text-3xl font-light text-[#F5F5F0] md:text-4xl">
          Terms & Conditions
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-10 space-y-8 font-body text-sm leading-relaxed text-[#888880]">
          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">Booking & Confirmation</h2>
            <p className="mt-2">
              All bookings are tentative until confirmed with a 25% deposit. Deposits are payable via
              bank transfer or secure payment link. Final guest count and menu selection must be
              confirmed 48 hours before the event.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">Cancellation Policy</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>More than 7 days before: full refund minus 5% processing fee.</li>
              <li>3–7 days before: 50% refund of deposit.</li>
              <li>Under 48 hours: deposit is non-refundable.</li>
              <li>Force majeure (severe weather, villa closure): deposit transferable to a new date within 6 months.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">Villa Requirements</h2>
            <p className="mt-2">
              The villa must provide a functional kitchen with at least 4 burners, oven access, and a
              dining area that seats your party. Outdoor kitchens and poolside tables are welcome. We
              bring all cooking equipment, serving ware, and linens.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">Dietary Restrictions</h2>
            <p className="mt-2">
              We accommodate allergies and dietary requirements with 48 hours notice. Severe allergies
              must be disclosed at booking. While we take every precaution, we cannot guarantee a
              completely allergen-free environment in private villa kitchens.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">Pricing</h2>
            <p className="mt-2">
              All prices are in Indonesian Rupiah (IDR) and include service. Government tax (11%) and
              gratuity are not included. Wine pairing and beverages are charged separately. Travel
              surcharge may apply for venues outside central Bali (Ubud, Uluwatu, North Bali).
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-[#F5F5F0]">Liability</h2>
            <p className="mt-2">
              myCHEF carries public liability insurance. We are not responsible for damage to villa
              property caused by pre-existing conditions or third-party contractors. Guests are
              responsible for the behaviour of their party.
            </p>
          </section>
        </div>
      </FadeIn>
    </div>
  )
}
