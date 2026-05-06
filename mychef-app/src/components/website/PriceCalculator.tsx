'use client'

interface PriceCalculatorProps {
  menuPrice: number
  guests: number
}

export function PriceCalculator({ menuPrice, guests }: PriceCalculatorProps) {
  const total = menuPrice * guests
  const deposit = Math.round(total * 0.25)

  const fmt = (n: number) =>
    'IDR ' + n.toLocaleString('id-ID').replace(/,/g, '.')

  return (
    <div className="border border-[#2a2a2a] bg-[#111111] p-5">
      <div className="space-y-3 font-body text-sm">
        <div className="flex justify-between">
          <span className="text-[#888880]">Price per person</span>
          <span className="font-display text-base text-[#C9A96E]">{fmt(menuPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#888880]">Guests</span>
          <span className="text-[#F5F5F0]">{guests}</span>
        </div>
        <div className="h-px bg-[#2a2a2a]" />
        <div className="flex justify-between">
          <span className="text-[#888880]">Total</span>
          <span className="font-display text-lg text-[#C9A96E]">{fmt(total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#888880]">Deposit (25%)</span>
          <span className="text-[#F5F5F0]">{fmt(deposit)}</span>
        </div>
      </div>
    </div>
  )
}
