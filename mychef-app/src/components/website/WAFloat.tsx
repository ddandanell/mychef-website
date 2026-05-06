'use client'

import { MessageCircle } from 'lucide-react'

export function WAFloat() {
  return (
    <a
      href="https://wa.me/6281234567890?text=Hi%20myCHEF!%20I'd%20like%20to%20know%20more%20about%20Aegean%20Riviera."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-[#2a2a2a] bg-[#080808] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9A96E]"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 text-[#C9A96E]" />
    </a>
  )
}
