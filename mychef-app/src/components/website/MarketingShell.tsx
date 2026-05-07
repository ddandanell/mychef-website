'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { WebNav } from './WebNav'
import { WebFooter } from './WebFooter'
import { WAFloat } from './WAFloat'
import { CookieBanner } from './CookieBanner'

const marketingPaths = ['/', '/experience', '/menus', '/story', '/events', '/book']

export function MarketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // During SSR, pathname is null. Default to showing the marketing shell
  // for the static marketing pages since they are the primary use case.
  const isMarketing = pathname === null || marketingPaths.includes(pathname)

  if (!isMarketing) {
    return <>{children}</>
  }

  return (
    <>
      <WebNav />
      <main>{children}</main>
      <WebFooter />
      <WAFloat />
      <CookieBanner />
    </>
  )
}
