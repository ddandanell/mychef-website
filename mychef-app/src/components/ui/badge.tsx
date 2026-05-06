import { cn } from '@/lib/utils'

const variants: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-purple-500/20 text-purple-400',
  qualified: 'bg-indigo-500/20 text-indigo-400',
  offer_sent: 'bg-yellow-500/20 text-yellow-400',
  offer_viewed: 'bg-orange-500/20 text-orange-400',
  offer_accepted: 'bg-emerald-500/20 text-emerald-400',
  awaiting_payment: 'bg-pink-500/20 text-pink-400',
  payment_submitted: 'bg-cyan-500/20 text-cyan-400',
  payment_confirmed: 'bg-teal-500/20 text-teal-400',
  confirmed: 'bg-success/20 text-success',
  completed: 'bg-gray-500/20 text-gray-400',
  cancelled: 'bg-error/20 text-error',
  lost: 'bg-gray-500/20 text-gray-500',
  draft: 'bg-gray-600/20 text-gray-400',
  hot: 'bg-accent/20 text-accent',
  pending: 'bg-warning/20 text-warning',
  paid: 'bg-success/20 text-success',
  overdue: 'bg-error/20 text-error',
  prospect: 'bg-blue-500/20 text-blue-400',
  interested: 'bg-emerald-500/20 text-emerald-400',
  onboarding_sent: 'bg-purple-500/20 text-purple-400',
  converted: 'bg-success/20 text-success',
  active: 'bg-success/20 text-success',
  invited: 'bg-gray-500/20 text-gray-400',
  approved: 'bg-blue-500/20 text-blue-400',
  suspended: 'bg-error/20 text-error',
}

interface BadgeProps {
  children: React.ReactNode
  status?: string
  variant?: string
  className?: string
}

export function Badge({ children, status, variant, className }: BadgeProps) {
  const key = status || variant
  const style = key ? variants[key] || variants.new : variants.new

  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', style, className)}>
      {children}
    </span>
  )
}
