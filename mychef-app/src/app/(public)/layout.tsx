import { ReactNode } from 'react'
import { MarketingShell } from '@/components/website/MarketingShell'

export const metadata = {
  title: 'Aegean Riviera by myCHEF · Mediterranean Fine Dining · Bali',
  description:
    'A complete Mediterranean journey — from Sicily to the Aegean. Handmade pasta, fresh seafood, and fire. Served privately in your Bali villa.',
  keywords: ['private chef Bali', 'Mediterranean fine dining', 'villa dining Bali', 'private dining Bali', 'chef at home Bali'],
  openGraph: {
    title: 'Aegean Riviera by myCHEF · Mediterranean Fine Dining · Bali',
    description: 'Handmade pasta, fresh seafood, and fire. Served privately in your Bali villa.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aegean Riviera by myCHEF',
    description: 'Handmade pasta, fresh seafood, and fire. Served privately in your Bali villa.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'myCHEF Aegean Riviera',
  description: 'Private Mediterranean fine dining experiences in Bali villas.',
  url: 'https://mychef-it-74fr.vercel.app',
  email: 'booking@mychef.id',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bali',
    addressCountry: 'ID',
  },
  priceRange: '$$$$',
  servesCuisine: 'Mediterranean, Italian, Aegean',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '19:00',
    closes: '23:00',
  },
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080808] font-body text-[#F5F5F0] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketingShell>{children}</MarketingShell>
    </div>
  )
}
