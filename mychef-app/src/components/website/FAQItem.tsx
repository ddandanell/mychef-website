'use client'

import { useState } from 'react'

interface FAQItemProps {
  question: string
  answer: string
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#2a2a2a]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-body text-sm font-medium text-[#F5F5F0]">{question}</span>
        <span className={`ml-4 text-lg text-[#C9A96E] transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '200px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="pb-4 font-body text-sm leading-relaxed text-[#888880]">{answer}</p>
      </div>
    </div>
  )
}
