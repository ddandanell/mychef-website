import { formatIDR, formatIDRShort } from '@/lib/utils/currency'
import { cn } from '@/lib/utils'

interface IDRDisplayProps {
  amount: number | null | undefined
  size?: 'sm' | 'md' | 'lg'
  short?: boolean
  className?: string
}

export function IDRDisplay({ amount, size = 'md', short, className }: IDRDisplayProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl font-medium',
  }

  return (
    <span className={cn('tabular-nums', sizes[size], className)}>
      {short ? formatIDRShort(amount) : formatIDR(amount)}
    </span>
  )
}
