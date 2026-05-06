import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-text-muted">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
          error && 'border-error focus:border-error focus:ring-error',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
