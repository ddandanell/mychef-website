'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Instagram, MapPin, ArrowUp, Mail, LogIn } from 'lucide-react'
import { CONTACT, getWhatsAppUrl } from '@/lib/contact'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'Experience' },
  { href: '/menus', label: 'Menus' },
  { href: '/story', label: 'Story' },
  { href: '/events', label: 'Events' },
  { href: '/book', label: 'Book' },
]

const legalLinks = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/cancellation', label: 'Cancellation' },
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
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src="/images/logo-mychef.webp"
                alt="myCHEF"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-light text-[#F5F5F0] md:text-4xl">
                myCHEF
              </h2>
              <p className="mt-1 font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#C9A96E]">
                Aegean Riviera · Mediterranean Fine Dining · Bali
              </p>
            </div>
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
            href={getWhatsAppUrl('Hi myCHEF! I would like to book a private dining evening.')}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-body text-xs text-[#888880] transition-colors hover:text-[#C9A96E]"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
            {CONTACT.whatsappNumber ? 'WhatsApp' : 'Email Us'}
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-body text-xs text-[#888880] transition-colors hover:text-[#C9A96E]"
          >
            <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} />
            {CONTACT.instagramHandle}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="group flex items-center gap-2 font-body text-xs text-[#888880] transition-colors hover:text-[#C9A96E]"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
            {CONTACT.email}
          </a>
          <span className="flex items-center gap-2 font-body text-xs text-[#888880]">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
            {CONTACT.location}
          </span>
        </div>

        {/* Staff Login */}
        <div className="mt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded border border-[#2a2a2a] px-3 py-1.5 font-body text-[0.65rem] uppercase tracking-wider text-[#888880] transition-all hover:border-[#C9A96E] hover:text-[#C9A96E]"
          >
            <LogIn className="h-3 w-3" strokeWidth={1.5} />
            Staff Login
          </Link>
        </div>

        {/* Legal */}
        <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[0.6rem] uppercase tracking-wider text-[#888880] transition-colors hover:text-[#C9A96E]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#2a2a2a]/50 pt-6 md:flex-row md:items-center">
          <p className="font-body text-[0.65rem] text-[#888880]">
            © {new Date().getFullYear()} myCHEF · Aegean Riviera · All rights reserved
          </p>
          <p className="font-body text-[0.65rem] text-[#888880]">
            Private Mediterranean Fine Dining · Serving Bali villas nightly · Bookings {CONTACT.leadTime} ahead
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
