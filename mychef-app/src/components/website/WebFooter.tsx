'use client'

import Link from 'next/link'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'The Experience' },
  { href: '/menus', label: 'The Menus' },
  { href: '/story', label: 'Our Story' },
  { href: '/events', label: 'Private Events' },
  { href: '/book', label: 'Book Your Evening' },
]

export function WebFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#111111]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-light text-[#F5F5F0]">myCHEF</h2>
          <p className="mt-2 font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#C9A96E]">
            Aegean Riviera · Mediterranean Fine Dining · Bali
          </p>
        </div>

        <nav className="mb-8 flex flex-wrap gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-xs font-medium uppercase tracking-[0.1em] text-[#888880] transition-colors hover:text-[#C9A96E]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mb-8 space-y-1 font-body text-xs text-[#888880]">
          <p>
            WhatsApp:{" "}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A96E] hover:underline"
            >
              +62 812 3456 7890
            </a>
          </p>
          <p>
            Instagram:{" "}
            <a
              href="https://instagram.com/mychef.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A96E] hover:underline"
            >
              @mychef.id
            </a>
          </p>
          <p>Location: Bali, Indonesia</p>
        </div>

        <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-6">
          <p className="font-body text-[0.65rem] text-[#888880]">
            © 2026 myCHEF · Aegean Riviera · All rights reserved
          </p>
          <button
            onClick={scrollToTop}
            className="font-body text-xs font-medium uppercase tracking-[0.1em] text-[#888880] transition-colors hover:text-[#C9A96E]"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
