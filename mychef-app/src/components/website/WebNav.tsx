'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar } from 'lucide-react'

const navLinks = [
  { href: '/experience', label: 'Experience' },
  { href: '/menus', label: 'Menus' },
  { href: '/story', label: 'Story' },
  { href: '/events', label: 'Events' },
]

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

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
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4">
          <nav
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? 'border border-[#2a2a2a]/80 bg-[#080808]/80 px-5 py-2.5 backdrop-blur-xl'
                : 'bg-transparent px-0 py-0'
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span className="font-display text-lg font-light tracking-wide text-[#F5F5F0] md:text-xl">
                myCHEF
              </span>
              <span className="font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#C9A96E]">
                Aegean Riviera
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-4 py-2 font-body text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                    pathname === link.href
                      ? 'text-[#C9A96E]'
                      : 'text-[#888880] hover:text-[#F5F5F0]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-px bg-[#C9A96E] transition-transform duration-500 ${
                      pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    style={{ transformOrigin: 'left' }}
                  />
                </Link>
              ))}
              <Link
                href="/book"
                className="group ml-4 inline-flex items-center gap-2 border border-[#C9A96E] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-500 hover:bg-[#C9A96E] hover:text-[#080808] active:scale-[0.98]"
              >
                Book
                <span className="flex h-5 w-5 items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5">
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-[#F5F5F0] transition-colors hover:text-[#C9A96E] md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-[#080808]/90 backdrop-blur-2xl"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="absolute right-0 top-0 h-full w-full max-w-sm border-l border-[#2a2a2a]/50 bg-[#080808]/95 p-8 pt-24"
            >
              <button
                onClick={() => setDrawerOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-[#888880] transition-colors hover:text-[#F5F5F0]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <nav className="flex flex-col gap-1">
                {[{ href: '/', label: 'Home' }, ...navLinks, { href: '/book', label: 'Book Your Evening' }].map(
                  (link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: easeOutExpo }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-3 font-display text-2xl font-light transition-colors ${
                          pathname === link.href ? 'text-[#C9A96E]' : 'text-[#F5F5F0] hover:text-[#C9A96E]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#C9A96E]"
              >
                Bali, Indonesia
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
