import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Your Evening · Aegean Riviera by myCHEF',
  description:
    'Reserve your private Mediterranean fine dining experience in Bali. Select your menu, date, and guests. Confirmation within 4 hours via email.',
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
