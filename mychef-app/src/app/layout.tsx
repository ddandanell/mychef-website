import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'myCHEF — Aegean Riviera · Private Mediterranean Fine Dining · Bali',
  description:
    'A private Mediterranean fine-dining journey served inside luxury Bali villas. Handmade pasta, fresh seafood, fire, olive oil, wine. From Sicily to the Aegean — in your villa.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-[#080808] font-sans text-[#F5F5F0] antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
