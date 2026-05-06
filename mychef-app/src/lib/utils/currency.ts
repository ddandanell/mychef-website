export function formatIDR(amount: number | null | undefined): string {
  if (amount == null) return 'IDR 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatIDRShort(amount: number | null | undefined): string {
  if (amount == null) return 'IDR 0'
  if (amount >= 1_000_000_000) return `IDR ${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000) return `IDR ${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `IDR ${Math.round(amount / 1_000)}K`
  return formatIDR(amount)
}
