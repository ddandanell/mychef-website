import { ReactNode } from 'react'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { MarketingShell } from '@/components/website/MarketingShell'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata = {
  title: 'Aegean Riviera by myCHEF · Mediterranean Fine Dining · Bali',
  description:
    'A complete Mediterranean journey — from Sicily to the Aegean. Handmade pasta, fresh seafood, and fire. Served privately in your Bali villa.',
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen bg-[#080808] font-body text-[#F5F5F0] antialiased">
        <MarketingShell>{children}</MarketingShell>
      </body>
    </html>
  )
}
