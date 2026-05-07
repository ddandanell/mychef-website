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

  const mainDoc = docs[0]
  let response = mainDoc.content

  if (docs.length > 1) {
    response += '\n\n' + docs[1].content
  }

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

function buildSystemPrompt(contextDocs: string): string {
  return (
    'You are the Aegean Riviera concierge — knowledgeable, warm, and precise. ' +
    'You speak in short, declarative sentences. No marketing fluff. ' +
    'Use the provided knowledge to answer accurately. ' +
    "If you do not know something, say so honestly and offer to connect the guest with the team on WhatsApp.\n\n" +
    'KNOWLEDGE:\n' +
    contextDocs
  )
}

async function* streamRuleBased(query: string): AsyncGenerator<string> {
  const response = buildRuleBasedResponse(query)
  const words = response.split(/\s+/)
  for (let i = 0; i < words.length; i++) {
    yield (i > 0 ? ' ' : '') + words[i]
    if (i % 5 === 0) await new Promise((r) => setTimeout(r, 15))
  }
}

/**
 * Stream from an OpenAI-compatible endpoint (DeepSeek, OpenRouter, etc.)
 */
async function* streamOpenAICompatible(
  apiKey: string,
  baseURL: string,
  model: string,
  messages: ChatMessage[],
  systemPrompt: string
): AsyncGenerator<string> {
  const res = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
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
    const text = await res.text().catch(() => '')
    throw new Error(`${res.status}: ${text}`)
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
}

/**
 * Try providers in order: DeepSeek → OpenRouter → rule-based
 */
async function* streamResponse(
  messages: ChatMessage[]
): AsyncGenerator<string> {
  const lastQuery = messages[messages.length - 1].content
  const docs = findRelevantDocs(lastQuery, 3)
  const contextDocs = docs.map((d) => `--- ${d.title} ---\n${d.content}`).join('\n\n')
  const systemPrompt = buildSystemPrompt(contextDocs)

  // 1. DeepSeek (preferred — cheap, fast, no credit needed for signup bonus)
  const deepseekKey = process.env.DEEPSEEK_API_KEY
  if (deepseekKey) {
    try {
      console.log('[AI] Using DeepSeek')
      for await (const chunk of streamOpenAICompatible(
        deepseekKey,
        'https://api.deepseek.com/v1',
        'deepseek-chat',
        messages,
        systemPrompt
      )) {
        yield chunk
      }
      return
    } catch (err) {
      console.log('[AI] DeepSeek failed:', (err as Error).message)
    }
  }

  // 2. OpenRouter (fallback)
  const openrouterKey = process.env.OPENROUTER_API_KEY
  if (openrouterKey) {
    try {
      console.log('[AI] Using OpenRouter')
      for await (const chunk of streamOpenAICompatible(
        openrouterKey,
        'https://openrouter.ai/api/v1',
        'openai/gpt-4o-mini',
        messages,
        systemPrompt
      )) {
        yield chunk
      }
      return
    } catch (err) {
      console.log('[AI] OpenRouter failed:', (err as Error).message)
    }
  }

  // 3. Rule-based (always works, zero cost)
  console.log('[AI] Using rule-based fallback')
  for await (const chunk of streamRuleBased(lastQuery)) {
    yield chunk
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
