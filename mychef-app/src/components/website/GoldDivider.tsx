interface GoldDividerProps {
  className?: string
}

export function GoldDivider({ className = '' }: GoldDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-[#2a2a2a]" />
      <span className="text-[#C9A96E] text-xs">&#10022;</span>
      <div className="h-px flex-1 bg-[#2a2a2a]" />
    </div>
  )
}
