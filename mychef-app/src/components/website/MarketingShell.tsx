'use client'

import { ReactNode, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { WebNav } from './WebNav'
import { WebFooter } from './WebFooter'
import { WAFloat } from './WAFloat'

const marketingPaths = ['/', '/experience', '/menus', '/story', '/events', '/book']

export function MarketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR / static generation, pathname is null.
  // Wait until client hydration to avoid mismatch.
  if (!mounted) {
    return <>{children}</>
  }

  const isMarketing = pathname ? marketingPaths.includes(pathname) : false

  if (!isMarketing) {
    return <>{children}</>
  }

  return (
    <>
      <WebNav />
      <main>{children}</main>
      <WebFooter />
      <WAFloat />
    </>
  )
}
