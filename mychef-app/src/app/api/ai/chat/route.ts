import { NextRequest } from 'next/server'
import { findRelevantDocs } from '@/lib/knowledge'

export const runtime = 'edge'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Smart rule-based responder that works without external API keys.
 * Uses the knowledge base to find relevant info and compose natural replies.
 */
function buildRuleBasedResponse(query: string): string {
  const docs = findRelevantDocs(query, 3)

  if (docs.length === 0) {
    return (
      "I do not have that specific detail on hand. " +
      "Let me connect you with our team on WhatsApp — they will have the answer within minutes.\n\n" +
      "Or if you prefer, you can continue browsing our menus and experience pages on the site."
    )
  }

  // Compose response from top document(s)
  const mainDoc = docs[0]
  let response = mainDoc.content

  // Add related info if multiple docs match well
  if (docs.length > 1) {
    response += '\n\n' + docs[1].content
  }

  // Context-aware follow-up suggestions based on query intent
  const q = query.toLowerCase()
  if (q.includes('price') || q.includes('cost') || q.includes('how much')) {
    response += '\n\nWould you like to check availability for your preferred date?'
  } else if (q.includes('book') || q.includes('reserve')) {
    response += '\n\nShall I open a private line to our booking team on WhatsApp?'
  } else if (q.includes('menu') || q.includes('food') || q.includes('eat')) {
    response += '\n\nWould you like to see the full menu descriptions on our site, or shall I connect you with a chef to discuss customization?'
  } else if (q.includes('dietary') || q.includes('allergy') || q.includes('vegan') || q.includes('gluten')) {
    response += '\n\nOur chefs can adapt any menu. Shall I pass your dietary needs to the team?'
  } else if (q.includes('event') || q.includes('birthday') || q.includes('party')) {
    response += '\n\nFor bespoke events, our senior consultant can design something unique. Shall I connect you?'
  } else if (q.includes('where') || q.includes('location') || q.includes('villa')) {
    response += '\n\nDo you have a villa already, or would you like recommendations?'
  }

  return response
}

/**
 * Stream a response using OpenRouter (if API key is configured).
 * Falls back to rule-based responder if no key or on error.
 */
async function* streamResponse(
  messages: ChatMessage[]
): AsyncGenerator<string> {
  const lastQuery = messages[messages.length - 1].content
  const docs = findRelevantDocs(lastQuery, 3)
  const contextDocs = docs.map((d) => `--- ${d.title} ---\n${d.content}`).join('\n\n')
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    // No API key — use rule-based with word-by-word streaming
    const response = buildRuleBasedResponse(lastQuery)
    const words = response.split(/\s+/)
    for (let i = 0; i < words.length; i++) {
      yield (i > 0 ? ' ' : '') + words[i]
      if (i % 5 === 0) await new Promise((r) => setTimeout(r, 15))
    }
    return
  }

  const systemPrompt =
    'You are the Aegean Riviera concierge — knowledgeable, warm, and precise. ' +
    'You speak in short, declarative sentences. No marketing fluff. ' +
    'Use the provided knowledge to answer accurately. ' +
    "If you do not know something, say so honestly and offer to connect the guest with the team on WhatsApp.\n\n" +
    'KNOWLEDGE:\n' +
    contextDocs

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://mychef-it-74fr.vercel.app',
        'X-Title': 'Aegean Riviera Concierge',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 800,
      }),
    })

    if (!res.ok) {
      throw new Error(`OpenRouter error: ${res.status}`)
    }

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n').filter((line) => line.trim())

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') return
          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices?.[0]?.delta?.content
            if (content) yield content
          } catch {
            // ignore parse errors
          }
        }
      }
    }
  } catch {
    // Fallback to rule-based on any error
    const response = buildRuleBasedResponse(lastQuery)
    const words = response.split(/\s+/)
    for (let i = 0; i < words.length; i++) {
      yield (i > 0 ? ' ' : '') + words[i]
      if (i % 5 === 0) await new Promise((r) => setTimeout(r, 15))
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages: ChatMessage[] = body.messages || []

    if (messages.length === 0 || !messages[messages.length - 1].content) {
      return new Response('No message provided', { status: 400 })
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        for await (const chunk of streamResponse(messages)) {
          controller.enqueue(encoder.encode(chunk))
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch {
    return new Response('Internal error', { status: 500 })
  }
}
