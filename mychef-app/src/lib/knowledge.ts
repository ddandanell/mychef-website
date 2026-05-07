/**
 * Aegean Riviera by myCHEF — Knowledge Base
 * Used by AI concierge to answer guest questions naturally.
 */

export interface KnowledgeDoc {
  id: string
  category: string
  title: string
  content: string
  keywords: string[]
}

export const KNOWLEDGE_BASE: KnowledgeDoc[] = [
  {
    id: 'brand-overview',
    category: 'brand',
    title: 'About Aegean Riviera by myCHEF',
    content:
      'Aegean Riviera by myCHEF is a premium private Mediterranean fine-dining experience served inside luxury Bali villas. ' +
      'We bring Sicily to the Aegean — handmade pasta, fresh seafood, open fire, olive oil, wine. ' +
      'Not catering. A private restaurant that happens to be in your villa. ' +
      'Founded by David Dandanell. Head chefs: Marco Ferrara (Sicily) and Luca Romano (Aegean).',
    keywords: ['about', 'who are you', 'what is', 'mychef', 'aegean riviera', 'story', 'founder'],
  },
  {
    id: 'menu-riviera',
    category: 'menu',
    title: 'Riviera Menu · 2.2M IDR per guest',
    content:
      'The Riviera menu is our signature journey. 2.2M IDR per guest. ' +
      'Features handmade pasta (tagliatelle, ravioli), fresh Mediterranean seafood, ' +
      'fire-grilled proteins, seasonal vegetables, estate olive oil, artisan bread. ' +
      'Wine pairing available. 8-10 courses. Approximately 3 hours.',
    keywords: ['riviera', 'menu', '2.2', 'price', 'cost', 'what is included', 'courses', 'signature'],
  },
  {
    id: 'menu-odyssey',
    category: 'menu',
    title: 'Odyssey Menu · 3M IDR per guest',
    content:
      'The Odyssey menu is our elevated experience. 3M IDR per guest. ' +
      'Features premium ingredients: langoustine, wagyu, white truffle (seasonal), ' +
      'caviar service, extended wine pairing with rare vintages. ' +
      '10-12 courses. Approximately 4 hours. Sommelier-guided wine journey.',
    keywords: ['odyssey', 'menu', '3m', '3 million', 'premium', 'luxury', 'wagyu', 'truffle', 'caviar'],
  },
  {
    id: 'pricing',
    category: 'pricing',
    title: 'Pricing & What Is Included',
    content:
      'Riviera: 2.2M IDR per guest. Odyssey: 3M IDR per guest. ' +
      'Both include: chef arrival 3 hours before service, all ingredients sourced same day, ' +
      'table setting with candles and flowers, full service during dinner, kitchen cleanup. ' +
      'Not included: villa rental, alcohol beyond pairing, extra service staff for large groups. ' +
      'Minimum 2 guests. No hidden fees.',
    keywords: ['price', 'cost', 'how much', 'idr', 'included', 'what is included', 'minimum', 'fee'],
  },
  {
    id: 'booking-process',
    category: 'process',
    title: 'How Booking Works',
    content:
      '1. Inquiry via WhatsApp or concierge widget. ' +
      '2. We confirm date, guests, menu, villa location within 4 hours. ' +
      '3. 50% deposit to secure the date. ' +
      '4. Final menu confirmation 3 days before. ' +
      '5. Chef team arrives 3 hours before service. ' +
      '6. You enjoy. We clean. ' +
      'Lead time: 3 to 5 days recommended. Last-minute possible subject to availability.',
    keywords: ['how to book', 'process', 'steps', 'deposit', 'how does it work', 'lead time', 'last minute'],
  },
  {
    id: 'dietary',
    category: 'menu',
    title: 'Dietary Requirements & Allergies',
    content:
      'We accommodate all dietary requirements with advance notice. ' +
      'Gluten-free pasta, vegetarian menus, vegan options, halal, kosher-style, ' +
      'shellfish-free, nut-free. ' +
      'Please inform us at least 3 days before. ' +
      'Our kitchen is not allergen-certified but we take every precaution.',
    keywords: ['dietary', 'allergy', 'allergies', 'gluten', 'vegan', 'vegetarian', 'halal', 'kosher', 'nut-free'],
  },
  {
    id: 'locations',
    category: 'service',
    title: 'Service Areas & Villa Locations',
    content:
      'We serve luxury villas across Bali: Seminyak, Canggu, Uluwatu, Ubud, Sanur. ' +
      'Chef team travels with all equipment and ingredients. ' +
      'We need a functional kitchen or outdoor grill area. ' +
      'For venues outside these areas, please ask — we may accommodate for larger events.',
    keywords: ['where', 'location', 'area', 'seminyak', 'canggu', 'uluwatu', 'ubud', 'sanur', 'villa', 'travel'],
  },
  {
    id: 'chef-marco',
    category: 'team',
    title: 'Chef Marco Ferrara',
    content:
      'Marco Ferrara is our Sicilian head chef. 20+ years experience in Michelin-starred kitchens ' +
      'across Palermo, Taormina, and Milan. Specialist in handmade pasta, seafood, and fire cooking. ' +
      'Trained under Chef Carmelo Trentacosti at Il Duomo. ' +
      'Philosophy: "The fire tells you when it is ready. You do not tell the fire."',
    keywords: ['marco', 'chef marco', 'ferrara', 'sicily', 'sicilian', 'head chef'],
  },
  {
    id: 'chef-luca',
    category: 'team',
    title: 'Chef Luca Romano',
    content:
      'Luca Romano is our Aegean specialist. 15+ years experience in Athens, Santorini, and Mykonos. ' +
      'Expert in whole fish preparation, mezze, and olive oil-based cuisine. ' +
      'Former head chef at Selene Restaurant, Santorini. ' +
      'Philosophy: "Olive oil is not an ingredient. It is the soul of the dish."',
    keywords: ['luca', 'chef luca', 'romano', 'aegean', 'greek', 'athens', 'santorini'],
  },
  {
    id: 'events',
    category: 'events',
    title: 'Private Events & Celebrations',
    content:
      'We specialize in: birthdays, anniversaries, proposals, corporate dinners, villa welcome dinners. ' +
      'Events from 6 to 50+ guests. ' +
      'Bespoke menus available. ' +
      'Add-ons: live musician, photographer, custom cake, wine masterclass, floral design. ' +
      'For events over 20 guests, we bring additional service staff.',
    keywords: ['event', 'birthday', 'anniversary', 'proposal', 'corporate', 'celebration', 'party', 'large group'],
  },
  {
    id: 'wine',
    category: 'menu',
    title: 'Wine & Beverages',
    content:
      'Riviera includes a curated wine pairing (4 glasses). ' +
      'Odyssey includes an extended pairing with rare vintages (6-7 glasses). ' +
      'Non-alcoholic pairings available: kombucha, house-made shrubs, zero-proof cocktails. ' +
      'Champagne welcome drink included in Odyssey. ' +
      'Custom wine requests welcome.',
    keywords: ['wine', 'alcohol', 'drink', 'beverage', 'pairing', 'champagne', 'non-alcoholic'],
  },
  {
    id: 'cancellation',
    category: 'policy',
    title: 'Cancellation & Rescheduling',
    content:
      'Cancellation: Full refund if cancelled 7+ days before. 50% refund 3-6 days before. ' +
      'No refund within 48 hours, but we offer rescheduling. ' +
      'Rescheduling: Free if done 5+ days before. Subject to availability. ' +
      'Force majeure (weather, flight cancellations): full credit, no expiry.',
    keywords: ['cancel', 'refund', 'reschedule', 'policy', 'change date', 'force majeure'],
  },
  {
    id: 'equipment',
    category: 'service',
    title: 'What We Bring vs What You Need',
    content:
      'We bring: all ingredients, chef knives, portable grill (if needed), ' +
      'tableware, candles, flowers, service utensils. ' +
      'You need: functional kitchen with stove/oven or outdoor grill area, ' +
      'dining table and chairs, running water, electricity. ' +
      'We can arrange rental equipment if your villa lacks something.',
    keywords: ['equipment', 'what do i need', 'kitchen', 'bring', 'table', 'setup'],
  },
  {
    id: 'kids',
    category: 'service',
    title: 'Children & Family Dinners',
    content:
      'Children welcome. We offer adapted portions and simplified menus for kids under 12. ' +
      'Family-style service available for relaxed villa dinners. ' +
      'Early seating (6 PM) recommended for families with young children.',
    keywords: ['kids', 'children', 'family', 'child', 'under 12', 'baby'],
  },
  {
    id: 'partner-villas',
    category: 'partnerships',
    title: 'Villa Partnerships',
    content:
      'We partner with luxury villas across Bali to offer in-house dining as an amenity. ' +
      'Partners receive: preferential rates, co-marketing, dedicated concierge line, ' +
      'commission on bookings referred. ' +
      'Contact us for partnership terms. Minimum 5 villa portfolio preferred.',
    keywords: ['partner', 'villa partner', 'commission', 'collaboration', 'portfolio'],
  },
]

/**
 * Simple keyword matching to find relevant documents.
 * Returns top N matches sorted by relevance score.
 */
export function findRelevantDocs(query: string, topN = 3): KnowledgeDoc[] {
  const q = query.toLowerCase()
  const words = q.split(/\s+/).filter((w) => w.length > 2)

  const scored = KNOWLEDGE_BASE.map((doc) => {
    let score = 0
    // Title match
    if (doc.title.toLowerCase().includes(q)) score += 10
    // Content match
    if (doc.content.toLowerCase().includes(q)) score += 5
    // Keyword match
    for (const kw of doc.keywords) {
      if (q.includes(kw.toLowerCase())) score += 8
      for (const word of words) {
        if (kw.toLowerCase().includes(word)) score += 3
      }
    }
    // Word-by-word content match
    for (const word of words) {
      if (doc.content.toLowerCase().includes(word)) score += 1
    }
    return { doc, score }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((s) => s.doc)
}
