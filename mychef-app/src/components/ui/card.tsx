'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hasGoldBorder?: boolean
  highlight?: boolean
  onClick?: () => void
}

export function Card({ children, className, hasGoldBorder, highlight, onClick }: CardProps) {
  const showGold = hasGoldBorder || highlight
  return (
    <motion.div
      className={cn(
        'rounded-xl border border-border bg-surface p-4 transition-colors',
        showGold && 'border-l-2 border-l-accent',
        className
      )}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
