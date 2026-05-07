'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Mail, Send, ArrowLeft, Sparkles } from 'lucide-react'
import { CONTACT, getWhatsAppUrl } from '@/lib/contact'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type FlowId = 'new' | 'existing' | 'event' | 'corporate'

interface Message {
  id: string
  from: 'concierge' | 'user'
  text: string
  options?: Option[]
  input?: { placeholder: string; key: string }
}

interface Option {
  label: string
  value: string
  next?: string
}

interface FlowStep {
  id: string
  question: string
  options?: Option[]
  input?: { placeholder: string; key: string }
}

/* ------------------------------------------------------------------ */
/*  Flow definitions                                                   */
/* ------------------------------------------------------------------ */

const FLOWS: Record<FlowId, FlowStep[]> = {
  new: [
    {
      id: 'guests',
      question: 'How many guests?',
      options: [
        { label: '2 guests', value: '2' },
        { label: '4 guests', value: '4' },
        { label: '6 guests', value: '6' },
        { label: '8 guests', value: '8' },
        { label: '10 guests', value: '10' },
        { label: '10+ guests', value: '10+' },
      ],
    },
    {
      id: 'date',
      question: 'When?',
      options: [
        { label: 'This week', value: 'this week' },
        { label: 'Next week', value: 'next week' },
        { label: 'Within 2 weeks', value: 'within 2 weeks' },
        { label: 'Specific date', value: 'specific date', next: 'date-input' },
      ],
    },
    {
      id: 'date-input',
      question: 'Which date works for you?',
      input: { placeholder: 'e.g. 15 June 2026', key: 'dateText' },
    },
    {
      id: 'menu',
      question: 'Menu tier?',
      options: [
        { label: 'Riviera · 2.2M IDR', value: 'Riviera (2.2M IDR)' },
        { label: 'Odyssey · 3M IDR', value: 'Odyssey (3M IDR)' },
        { label: 'Unsure — advise me', value: 'Unsure — advise me' },
      ],
    },
    {
      id: 'location',
      question: 'Villa location?',
      options: [
        { label: 'Seminyak', value: 'Seminyak' },
        { label: 'Canggu', value: 'Canggu' },
        { label: 'Uluwatu', value: 'Uluwatu' },
        { label: 'Ubud', value: 'Ubud' },
        { label: 'Sanur', value: 'Sanur' },
        { label: 'Other', value: 'Other', next: 'location-input' },
      ],
    },
    {
      id: 'location-input',
      question: 'Where?',
      input: { placeholder: 'Villa name or area', key: 'locationText' },
    },
    {
      id: 'dietary',
      question: 'Any dietary restrictions or allergies we should know about?',
      input: { placeholder: 'e.g. gluten-free, shellfish allergy, halal — or type "none"', key: 'dietary' },
    },
    {
      id: 'occasion-followup',
      question: 'Is this a special occasion?',
      options: [
        { label: 'Birthday', value: 'Birthday' },
        { label: 'Anniversary', value: 'Anniversary' },
        { label: 'Date night', value: 'Date night' },
        { label: 'Business dinner', value: 'Business dinner' },
        { label: 'Just because', value: 'Just because' },
      ],
    },
    {
      id: 'notes',
      question: 'Anything else we should know?',
      input: { placeholder: 'e.g. surprise cake, wine preference, preferred start time — or type "no"', key: 'notes' },
    },
  ],
  existing: [
    {
      id: 'need',
      question: 'What do you need?',
      options: [
        { label: 'Modify booking', value: 'Modify booking' },
        { label: 'Confirm details', value: 'Confirm details' },
        { label: 'Dietary requirements', value: 'Dietary requirements' },
        { label: 'Other question', value: 'Other question' },
      ],
    },
    {
      id: 'reference',
      question: 'Booking reference or email?',
      input: { placeholder: 'e.g. BOOK-2026-001 or your email', key: 'reference' },
    },
    {
      id: 'details',
      question: 'Tell us more about what you need.',
      input: { placeholder: 'e.g. add 2 guests, change to gluten-free menu, confirm pickup time', key: 'details' },
    },
  ],
  event: [
    {
      id: 'occasion',
      question: 'Occasion?',
      options: [
        { label: 'Birthday', value: 'Birthday' },
        { label: 'Anniversary', value: 'Anniversary' },
        { label: 'Proposal', value: 'Proposal' },
        { label: 'Corporate dinner', value: 'Corporate dinner' },
        { label: 'Other', value: 'Other' },
      ],
    },
    {
      id: 'guests',
      question: 'How many guests?',
      options: [
        { label: '6–10', value: '6-10' },
        { label: '10–20', value: '10-20' },
        { label: '20–50', value: '20-50' },
        { label: '50+', value: '50+' },
      ],
    },
    {
      id: 'timeline',
      question: 'Preferred timeline?',
      options: [
        { label: 'Within 1 week', value: 'Within 1 week' },
        { label: '2–4 weeks', value: '2-4 weeks' },
        { label: '1–3 months', value: '1-3 months' },
        { label: 'Flexible', value: 'Flexible' },
      ],
    },
    {
      id: 'vibe',
      question: 'What is the vibe you are going for?',
      options: [
        { label: 'Intimate & refined', value: 'Intimate & refined' },
        { label: 'Lively celebration', value: 'Lively celebration' },
        { label: 'Formal dinner', value: 'Formal dinner' },
        { label: 'Surprise / romantic', value: 'Surprise / romantic' },
      ],
    },
    {
      id: 'requests',
      question: 'Any specific dishes, cuisines, or requests in mind?',
      input: { placeholder: 'e.g. seafood tower, vegan options, live band — or type "open to suggestions"', key: 'requests' },
    },
  ],
  corporate: [
    {
      id: 'type',
      question: 'Inquiry type?',
      options: [
        { label: 'Villa partnership', value: 'Villa partnership' },
        { label: 'Corporate event', value: 'Corporate event' },
        { label: 'Recurring service', value: 'Recurring service' },
        { label: 'Press / Media', value: 'Press / Media' },
      ],
    },
    {
      id: 'company',
      question: 'Company or property name?',
      input: { placeholder: 'e.g. The Edge Villa, Bali', key: 'company' },
    },
    {
      id: 'frequency',
      question: 'How many events per month are you planning?',
      options: [
        { label: '1–2', value: '1-2 per month' },
        { label: '3–5', value: '3-5 per month' },
        { label: '6–10', value: '6-10 per month' },
        { label: '10+', value: '10+ per month' },
        { label: 'One-time only', value: 'One-time only' },
      ],
    },
    {
      id: 'requirements',
      question: 'Any specific requirements or context?',
      input: { placeholder: 'e.g. branded menus, dietary policies, preferred chefs, budget range', key: 'requirements' },
    },
  ],
}

const ENTRY_OPTIONS: { flow: FlowId; num: string; title: string; desc: string }[] = [
  { flow: 'new', num: '01', title: 'New Reservation', desc: 'Book a private evening' },
  { flow: 'existing', num: '02', title: 'Existing Reservation', desc: 'Modify or confirm' },
  { flow: 'event', num: '03', title: 'Event Consultation', desc: 'Birthdays, proposals, bespoke' },
  { flow: 'corporate', num: '04', title: 'Corporate & Retainer', desc: 'Partnerships, contracts' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const uid = () => Math.random().toString(36).slice(2, 10)

/* ---------- routing config ---------- */
const FLOW_ROUTING: Record<FlowId, { label: string; number?: string }> = {
  new: { label: 'NEW RESERVATION' },
  existing: { label: 'EXISTING RESERVATION' },
  event: { label: 'EVENT CONSULTATION' },
  corporate: { label: 'CORPORATE & RETAINER' },
}

function generateHandoverMessage(flow: FlowId, answers: Record<string, string>): string {
  const tag = FLOW_ROUTING[flow].label
  const lines: string[] = [`[${tag}]`]

  switch (flow) {
    case 'new':
      lines.push('Hi myCHEF, I would like to book a private dining evening.')
      if (answers.guests) lines.push(`Guests: ${answers.guests}`)
      if (answers.date || answers.dateText) lines.push(`Date: ${answers.dateText || answers.date}`)
      if (answers.menu) lines.push(`Menu: ${answers.menu}`)
      if (answers.location || answers.locationText) lines.push(`Location: ${answers.locationText || answers.location}`)
      if (answers.dietary) lines.push(`Dietary: ${answers.dietary}`)
      if (answers.occasionFollowup) lines.push(`Occasion: ${answers.occasionFollowup}`)
      if (answers.notes && answers.notes.toLowerCase() !== 'no') lines.push(`Notes: ${answers.notes}`)
      break
    case 'existing':
      lines.push('Hi myCHEF, I have an existing reservation I need help with.')
      if (answers.need) lines.push(`Request: ${answers.need}`)
      if (answers.reference) lines.push(`Reference: ${answers.reference}`)
      if (answers.details) lines.push(`Details: ${answers.details}`)
      break
    case 'event':
      lines.push('Hi myCHEF, I would like to discuss a private event.')
      if (answers.occasion) lines.push(`Occasion: ${answers.occasion}`)
      if (answers.guests) lines.push(`Guests: ${answers.guests}`)
      if (answers.timeline) lines.push(`Timeline: ${answers.timeline}`)
      if (answers.vibe) lines.push(`Vibe: ${answers.vibe}`)
      if (answers.requests && answers.requests.toLowerCase() !== 'open to suggestions') lines.push(`Requests: ${answers.requests}`)
      break
    case 'corporate':
      lines.push('Hi myCHEF, I would like to discuss a corporate inquiry.')
      if (answers.type) lines.push(`Type: ${answers.type}`)
      if (answers.company) lines.push(`Company: ${answers.company}`)
      if (answers.frequency) lines.push(`Frequency: ${answers.frequency}`)
      if (answers.requirements) lines.push(`Requirements: ${answers.requirements}`)
      break
  }

  lines.push('Please let me know the next steps.')
  return lines.join('\n')
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function WAFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [flow, setFlow] = useState<FlowId | null>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [inputValue, setInputValue] = useState('')
  const [showTyping, setShowTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const isEmail = !CONTACT.whatsappNumber

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, showTyping])

  /* ---------- open / reset ---------- */

  const openWidget = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      setShowTyping(true)
      setTimeout(() => {
        setShowTyping(false)
        setMessages([
          {
            id: uid(),
            from: 'concierge',
            text: 'Welcome to Aegean Riviera.\n\nHow may I direct your inquiry?',
          },
        ])
      }, 1200)
    }
  }

  const reset = () => {
    setFlow(null)
    setStepIndex(0)
    setAnswers({})
    setInputValue('')
    setMessages([
      {
        id: uid(),
        from: 'concierge',
        text: 'Welcome to Aegean Riviera.\n\nHow may I direct your inquiry?',
      },
    ])
  }

  /* ---------- send message helpers ---------- */

  const addUserMessage = (text: string) => {
    setMessages((m) => [...m, { id: uid(), from: 'user', text }])
  }

  const addConciergeMessage = (text: string, options?: Option[], input?: { placeholder: string; key: string }) => {
    setShowTyping(true)
    setTimeout(() => {
      setShowTyping(false)
      setMessages((m) => [...m, { id: uid(), from: 'concierge', text, options, input }])
    }, 800)
  }

  /* ---------- flow navigation ---------- */

  const startFlow = (f: FlowId) => {
    setFlow(f)
    setStepIndex(0)
    setAnswers({})
    const firstStep = FLOWS[f][0]
    addConciergeMessage(firstStep.question, firstStep.options, firstStep.input)
  }

  const handleOptionSelect = (option: Option) => {
    if (!flow) return
    const currentStep = FLOWS[flow][stepIndex]
    addUserMessage(option.label)

    const newAnswers = { ...answers, [currentStep.id]: option.value }
    setAnswers(newAnswers)

    // Determine next step
    let nextIdx = stepIndex + 1
    if (option.next) {
      nextIdx = FLOWS[flow].findIndex((s) => s.id === option.next)
    }

    if (nextIdx >= FLOWS[flow].length) {
      showHandover(flow, newAnswers)
    } else {
      setStepIndex(nextIdx)
      const nextStep = FLOWS[flow][nextIdx]
      addConciergeMessage(nextStep.question, nextStep.options, nextStep.input)
    }
  }

  const handleInputSubmit = () => {
    if (!flow || !inputValue.trim()) return
    const currentStep = FLOWS[flow][stepIndex]
    addUserMessage(inputValue.trim())

    const newAnswers = { ...answers, [currentStep.input!.key]: inputValue.trim() }
    setAnswers(newAnswers)
    setInputValue('')

    const nextIdx = stepIndex + 1
    if (nextIdx >= FLOWS[flow].length) {
      showHandover(flow, newAnswers)
    } else {
      setStepIndex(nextIdx)
      const nextStep = FLOWS[flow][nextIdx]
      addConciergeMessage(nextStep.question, nextStep.options, nextStep.input)
    }
  }

  const showHandover = (f: FlowId, ans: Record<string, string>) => {
    const msg = generateHandoverMessage(f, ans)
    setShowTyping(true)
    setTimeout(() => {
      setShowTyping(false)
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          from: 'concierge',
          text: 'Thank you. I have everything needed.\n\nOpening your private line now.',
        },
      ])
      setTimeout(() => {
        const routing = FLOW_ROUTING[f]
        window.open(getWhatsAppUrl(msg, routing.number), '_blank')
      }, 600)
    }, 1200)
  }

  /* ---------- skip to direct ---------- */

  const skipToDirect = () => {
    window.open(getWhatsAppUrl('Hi myCHEF! I would like to book a private dining evening.', CONTACT.whatsappNumber), '_blank')
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <>
      {/* ====== Launcher button ====== */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="launcher"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            onClick={openWidget}
            className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center border border-[#c9a96e]/40 bg-[#080808]/90 text-[#c9a96e] backdrop-blur-xl transition-all duration-500 hover:border-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#080808] md:bottom-8 md:right-8"
            aria-label="Open concierge"
          >
            <Sparkles className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ====== Chat panel ====== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 flex w-[92vw] max-w-[380px] flex-col overflow-hidden border border-[#2a2a2a] bg-[#080808] shadow-2xl md:bottom-8 md:right-8"
            style={{
              boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 60px rgba(201,169,110,0.08)',
              height: 'min(70vh, 560px)',
            }}
          >
            {/* --- Header --- */}
            <div className="relative flex items-center justify-between border-b border-[#2a2a2a] bg-[#080808]/80 px-4 py-3 backdrop-blur-xl">
              {/* Radial glow */}
              <div
                className="pointer-events-none absolute right-0 top-0 h-32 w-32 opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(201,169,110,0.4) 0%, transparent 70%)',
                }}
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 opacity-10"
                style={{
                  background: 'radial-gradient(circle, rgba(201,169,110,0.3) 0%, transparent 70%)',
                }}
              />

              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <span
                    className="flex h-9 w-9 items-center justify-center text-lg font-medium italic text-[#c9a96e]"
                    style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
                  >
                    m
                  </span>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9a96e] opacity-40" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#c9a96e]" />
                  </span>
                </div>
                <div>
                  <p
                    className="text-sm font-medium tracking-wide text-[#F5F5F0]"
                    style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                  >
                    Aegean Riviera
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#888880]">a private line</p>
                </div>
              </div>

              <div className="relative flex items-center gap-2">
                {flow && (
                  <button
                    onClick={reset}
                    className="flex h-8 w-8 items-center justify-center text-[#888880] transition-colors hover:text-[#c9a96e]"
                    aria-label="Back to menu"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center text-[#888880] transition-colors hover:text-[#F5F5F0]"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* --- Messages --- */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
              {messages.map((msg, idx) => (
                <div key={msg.id} className="mb-4">
                  {/* Bubble */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className={`max-w-[85%] ${msg.from === 'concierge' ? '' : 'ml-auto'}`}
                  >
                    <div
                      className={`inline-block px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        msg.from === 'concierge'
                          ? 'rounded-[2px_14px_14px_14px] border border-[#2a2a2a]/60 bg-[#111] text-[#F5F5F0]/90'
                          : 'rounded-[14px_14px_2px_14px] bg-[#c9a96e] text-[#080808]'
                      }`}
                      style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                    >
                      {msg.text.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < msg.text.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Options (only for last concierge message) */}
                  {msg.from === 'concierge' &&
                    msg.options &&
                    idx === messages.length - 1 &&
                    !showTyping && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {},
                          visible: { transition: { staggerChildren: 0.06 } },
                        }}
                        className="mt-3 grid grid-cols-1 gap-1.5"
                      >
                        {/* Entry menu is special: bigger cards */}
                        {!flow
                          ? msg.options.map((opt) => (
                              <motion.button
                                key={opt.value}
                                variants={{
                                  hidden: { opacity: 0, y: 8 },
                                  visible: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.3 }}
                                onClick={() => startFlow(opt.value as FlowId)}
                                className="group flex items-start gap-3 border border-[#2a2a2a] bg-transparent px-3.5 py-3 text-left transition-all duration-300 hover:border-[#c9a96e]/50 hover:bg-[#c9a96e]/5"
                              >
                                <span className="mt-0.5 text-[10px] font-medium text-[#c9a96e]/60 transition-colors group-hover:text-[#c9a96e]">
                                  {ENTRY_OPTIONS.find((e) => e.flow === opt.value)?.num}
                                </span>
                                <div>
                                  <p className="text-[13px] font-medium text-[#F5F5F0] transition-colors group-hover:text-[#c9a96e]">
                                    {opt.label}
                                  </p>
                                  <p className="text-[11px] text-[#888880]">
                                    {ENTRY_OPTIONS.find((e) => e.flow === opt.value)?.desc}
                                  </p>
                                </div>
                              </motion.button>
                            ))
                          : msg.options.map((opt) => (
                              <motion.button
                                key={opt.value}
                                variants={{
                                  hidden: { opacity: 0, y: 8 },
                                  visible: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.3 }}
                                onClick={() => handleOptionSelect(opt)}
                                className="group relative border border-[#2a2a2a] bg-transparent px-3.5 py-2.5 text-left text-[12px] text-[#F5F5F0]/80 transition-all duration-300 hover:border-[#c9a96e]/40 hover:bg-[#c9a96e]/5 hover:pl-4 hover:text-[#F5F5F0]"
                              >
                                <span className="absolute bottom-0 left-0 top-0 w-[2px] origin-bottom scale-y-0 bg-[#c9a96e] transition-transform duration-300 group-hover:scale-y-100" />
                                {opt.label}
                              </motion.button>
                            ))}
                      </motion.div>
                    )}

                  {/* Text input */}
                  {msg.from === 'concierge' &&
                    msg.input &&
                    idx === messages.length - 1 &&
                    !showTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 flex gap-2"
                      >
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
                          placeholder={msg.input.placeholder}
                          className="flex-1 border border-[#2a2a2a] bg-[#111]/60 px-3 py-2 text-[12px] text-[#F5F5F0] outline-none transition-colors placeholder:text-[#888880]/50 focus:border-[#c9a96e]/50"
                          style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                          autoFocus
                        />
                        <button
                          onClick={handleInputSubmit}
                          disabled={!inputValue.trim()}
                          className="flex h-[38px] w-[38px] items-center justify-center border border-[#c9a96e]/40 text-[#c9a96e] transition-all hover:bg-[#c9a96e] hover:text-[#080808] disabled:opacity-30"
                        >
                          <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </motion.div>
                    )}
                </div>
              ))}

              {/* Typing indicator */}
              {showTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 flex gap-1.5"
                >
                  <div className="rounded-[2px_14px_14px_14px] border border-[#2a2a2a]/60 bg-[#111] px-3.5 py-3">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9a96e]/60" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9a96e]/60" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9a96e]/60" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Skip link */}
              {messages.length > 0 && !flow && !showTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 text-center"
                >
                  <button
                    onClick={skipToDirect}
                    className="text-[11px] text-[#888880]/60 underline underline-offset-2 transition-colors hover:text-[#c9a96e]"
                  >
                    Skip — message us directly
                  </button>
                </motion.div>
              )}
            </div>

            {/* --- Footer --- */}
            <div className="flex items-center justify-center gap-2 border-t border-[#2a2a2a]/60 px-4 py-2.5">
              {isEmail ? (
                <Mail className="h-3 w-3 text-[#888880]/40" strokeWidth={1.5} />
              ) : (
                <MessageCircle className="h-3 w-3 text-[#25D366]/60" strokeWidth={1.5} />
              )}
              <span className="text-[10px] uppercase tracking-[0.12em] text-[#888880]/40">
                {isEmail ? 'Email handover' : 'Encrypted · WhatsApp handover'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
