import { ReactNode } from 'react'
import { MarketingShell } from '@/components/website/MarketingShell'

export const metadata = {
  title: 'Aegean Riviera by myCHEF · Mediterranean Fine Dining · Bali',
  description:
    'A complete Mediterranean journey — from Sicily to the Aegean. Handmade pasta, fresh seafood, and fire. Served privately in your Bali villa.',
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080808] font-body text-[#F5F5F0] antialiased">
      <MarketingShell>{children}</MarketingShell>
    </div>
  )
}
