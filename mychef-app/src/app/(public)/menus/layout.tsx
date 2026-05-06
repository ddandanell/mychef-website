import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Menus · Aegean Riviera by myCHEF',
  description:
    'The Riviera Menu — 7 courses. The Odyssey Menu — 11 courses with premium wine pairing. Mediterranean fine dining served privately in your Bali villa.',
}

export default function MenusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
