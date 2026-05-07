// Contact configuration — update these with real business details before launch
export const CONTACT = {
  // Replace with verified WhatsApp Business number when available
  // Format: 628123456789 (no +, no spaces, country code required)
  whatsappNumber: '6282237565997',
  whatsappDisplay: '+62 822 3756 5997',

  // Primary contact method until WhatsApp is verified
  email: 'booking@mychef.id',

  // Social handles — verify these accounts exist and are active
  instagram: 'https://instagram.com/mychef.id',
  instagramHandle: '@mychef.id',

  // Business location
  location: 'Bali, Indonesia',
  serviceArea: 'Seminyak, Canggu, Uluwatu, Ubud, Sanur',

  // Response time promise
  responseTime: '4 hours',

  // Booking lead time
  leadTime: '3 to 5 days',
} as const

export function getWhatsAppUrl(message?: string, number?: string): string {
  const targetNumber = number || CONTACT.whatsappNumber
  if (!targetNumber) {
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(message || 'Booking Request')}`
  }
  const base = `https://wa.me/${targetNumber}`
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`
  }
  return base
}
