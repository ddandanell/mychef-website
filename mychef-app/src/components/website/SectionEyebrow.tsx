interface SectionEyebrowProps {
  text: string
  className?: string
}

export function SectionEyebrow({ text, className = '' }: SectionEyebrowProps) {
  return (
    <span
      className={`inline-block text-[0.58rem] font-medium uppercase tracking-[0.25em] text-[#C9A96E] font-body ${className}`}
    >
      {text}
    </span>
  )
}
