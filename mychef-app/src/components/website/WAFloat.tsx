'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function WAFloat() {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: 1.2 }}
      href="https://wa.me/6281234567890?text=Hi%20myCHEF!%20I%20would%20like%20to%20book%20a%20private%20dining%20evening."
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center border border-[#C9A96E]/30 bg-[#080808]/90 text-[#C9A96E] backdrop-blur-xl transition-all duration-500 hover:border-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#080808] md:bottom-8 md:right-8"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
    </motion.a>
  )
}
