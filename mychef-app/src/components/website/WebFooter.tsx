'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Instagram, MapPin, ArrowUp, Mail } from 'lucide-react'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'Experience' },
  { href: '/menus', label: 'Menus' },
  { href: '/story', label: 'Story' },
  { href: '/events', label: 'Events' },
  { href: '/book', label: 'Book' },
]

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function WebFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      className="border-t border-[#2a2a2a]/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        {/* Top */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-light text-[#F5F5F0] md:text-4xl">
              myCHEF
            </h2>
            <p className="mt-2 font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#C9A96E]">
              Aegean Riviera · Mediterranean Fine Dining · Bali
            </p>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.1em] text-[#888880] transition-colors hover:text-[#C9A96E]"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center border border-[#2a2a2a] transition-all duration-500 group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E]/10">
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </span>
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#2a2a2a]/50 pt-8">
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

        {/* Contact */}
        <div className="mt-8 flex flex-wrap gap-6">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-body text-xs text-[#888880] transition-colors hover:text-[#C9A96E]"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
            WhatsApp
          </a>
          <a
            href="https://instagram.com/mychef.id"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-body text-xs text-[#888880] transition-colors hover:text-[#C9A96E]"
          >
            <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} />
            Instagram
          </a>
          <span className="flex items-center gap-2 font-body text-xs text-[#888880]">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
            Bali, Indonesia
          </span>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#2a2a2a]/50 pt-6 md:flex-row md:items-center">
          <p className="font-body text-[0.65rem] text-[#888880]">
            © 2026 myCHEF · Aegean Riviera · All rights reserved
          </p>
          <p className="font-body text-[0.65rem] text-[#888880]">
            Private Mediterranean Fine Dining
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
