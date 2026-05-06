import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'list-item'
}

export function Skeleton({ className, variant = 'text', ...props }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded',
    card: 'h-32 w-full rounded-xl',
    'list-item': 'h-16 w-full rounded-lg',
  }

  return (
    <div
      className={cn('animate-pulse bg-border/50', variants[variant], className)}
      {...props}
    />
  )
}
