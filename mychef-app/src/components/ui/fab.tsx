'use client'

import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  href?: string
}

export function FAB({ icon, className, href, ...props }: FABProps) {
  const classes = cn(
    'fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background shadow-lg transition-transform hover:scale-105 active:scale-95',
    className
  )
  const content = icon || <Plus className="h-6 w-6" />
  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}

export function Fab({ icon, className, href, ...props }: FABProps) {
  const classes = cn(
    'fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background shadow-lg transition-transform hover:scale-105 active:scale-95',
    className
  )
  const content = icon || <Plus className="h-6 w-6" />
  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}
