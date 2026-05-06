'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'The Experience' },
  { href: '/menus', label: 'The Menus' },
  { href: '/story', label: 'Our Story' },
  { href: '/events', label: 'Private Events' },
  { href: '/book', label: 'Book Your Evening' },
]

export function WebNav() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#2a2a2a] bg-[rgba(8,8,8,0.97)] backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="font-display text-xl font-light tracking-wide text-[#F5F5F0]">
              myCHEF
            </span>
            <span className="font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#C9A96E]">
              Aegean Riviera
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.slice(1, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-[#C9A96E] ${
                  pathname === link.href ? 'text-[#C9A96E]' : 'text-[#888880]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="border border-[#C9A96E] px-4 py-2 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-colors hover:bg-[#C9A96E] hover:text-[#080808]"
            >
              Book Your Evening
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col gap-[5px] md:hidden"
            aria-label="Open menu"
          >
            <span className={`h-px w-6 transition-all ${drawerOpen ? 'bg-[#C9A96E]' : 'bg-[#F5F5F0]'}`} />
            <span className={`h-px w-6 transition-all ${drawerOpen ? 'bg-[#C9A96E]' : 'bg-[#F5F5F0]'}`} />
            <span className={`h-px w-6 transition-all ${drawerOpen ? 'bg-[#C9A96E]' : 'bg-[#F5F5F0]'}`} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 md:hidden ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[rgba(8,8,8,0.98)]" onClick={() => setDrawerOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm border-l border-[#2a2a2a] bg-[#080808] p-8 pt-20 transition-transform duration-300 ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
        >
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute right-4 top-4 font-body text-2xl text-[#888880] hover:text-[#F5F5F0]"
            aria-label="Close menu"
          >
            &times;
          </button>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-2xl font-light transition-colors hover:text-[#C9A96E] ${
                  pathname === link.href ? 'text-[#C9A96E]' : 'text-[#F5F5F0]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-12">
            <p className="font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#C9A96E]">
              Bali, Indonesia
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
