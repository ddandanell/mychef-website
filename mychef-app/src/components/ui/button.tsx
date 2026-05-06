'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-accent text-background hover:bg-accent/90',
    secondary: 'bg-surface text-text-primary border border-border hover:bg-border/50',
    ghost: 'bg-transparent text-text-muted hover:text-text-primary hover:bg-surface',
    danger: 'bg-error/20 text-error hover:bg-error/30',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <motion.div
      className="inline-block"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
    >
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    </motion.div>
  )
}
