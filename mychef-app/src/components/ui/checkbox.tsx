'use client'

import { cn } from '@/lib/utils'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent',
          className
        )}
        {...props}
      />
      {label && <span className="text-sm text-text-primary">{label}</span>}
    </label>
  )
}
