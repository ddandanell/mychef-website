'use client'

import { useState, useEffect } from 'react'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setVisible(false)
  }

  if (!mounted || !visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] border-t border-[#2a2a2a]/50 bg-[#080808]/95 px-4 py-4 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <p className="font-body text-xs leading-relaxed text-[#888880]">
          We use essential cookies for site functionality and anonymised analytics to improve your
          experience. By continuing, you agree to our{' '}
          <a href="/privacy" className="text-[#C9A96E] hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 border border-[#C9A96E] px-5 py-2 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:bg-[#C9A96E] hover:text-[#080808]"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
