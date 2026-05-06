const items = [
  'Handmade Pasta',
  'Fresh Lobster',
  'Sicilian Crudo',
  'Fire-Grilled Fish',
  'Aegean Olive Oil',
  'Amalfi Lemon',
  'Greek Feta',
  'Bottarga',
  'Burrata',
  'Saffron Bisque',
  'Charcoal & Salt',
  'Mediterranean Wine',
]

export function IngredientMarquee() {
  const content = items.map((item, i) => (
    <span key={i} className="mx-4 whitespace-nowrap">
      <span className="text-[#F5F5F0]">{item}</span>
      <span className="text-[#C9A96E] mx-4">·</span>
    </span>
  ))

  return (
    <div className="relative overflow-hidden border-y border-[#2a2a2a] bg-[#111111] py-3">
      <div className="animate-marquee flex w-max">
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  )
}
