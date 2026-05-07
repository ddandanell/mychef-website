#!/usr/bin/env node
/**
 * FLUX Image Generation Script
 *
 * Usage:
 *   node scripts/generate-flux-image.js "A beautiful sunset over Bali" [width] [height]
 *
 * Environment (from .env.local):
 *   BFL_API_KEY          - Your BFL API key (NEVER commit this)
 *   BFL_API_BASE_URL     - Base URL (default: https://api.bfl.ai)
 *   BFL_DEFAULT_ENDPOINT - Endpoint path (default: /v1/flux-2-klein-9b)
 *
 * Output:
 *   - Raw image saved to public/images/generated/<timestamp>_<seed>.<ext>
 *   - Optimized WebP saved to public/images/<slug>.webp
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ── Load .env.local ──────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8')
    .split('\n')
    .forEach((line) => {
      const m = line.match(/^([A-Za-z0-9_]+)=(.*)$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
    })
}

// ── Config ───────────────────────────────────────────────────────────────────
const API_KEY = process.env.BFL_API_KEY
const BASE_URL = (process.env.BFL_API_BASE_URL || 'https://api.bfl.ai').replace(/\/$/, '')
const ENDPOINT = process.env.BFL_DEFAULT_ENDPOINT || '/v1/flux-2-klein-9b'

if (!API_KEY) {
  console.error('❌ BFL_API_KEY not found. Add it to .env.local')
  process.exit(1)
}

// ── Args ─────────────────────────────────────────────────────────────────────
const prompt = process.argv[2]
const width = parseInt(process.argv[3], 10) || 1024
const height = parseInt(process.argv[4], 10) || 768
const seed = parseInt(process.argv[5], 10) || Math.floor(Math.random() * 1_000_000)

if (!prompt) {
  console.error('Usage: node scripts/generate-flux-image.js "prompt" [width] [height] [seed]')
  process.exit(1)
}

// ── Paths ────────────────────────────────────────────────────────────────────
const PROJECT_ROOT = path.join(__dirname, '..')
const RAW_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'generated')
const OPT_DIR = path.join(PROJECT_ROOT, 'public', 'images')

// ── Helpers ──────────────────────────────────────────────────────────────────
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function pollResult(pollingUrl, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    const res = await fetch(pollingUrl, {
      headers: { 'x-key': API_KEY },
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Poll failed (${res.status}): ${text}`)
    }
    const data = await res.json()

    if (data.status === 'Ready' && data.result?.sample) {
      return data.result.sample
    }
    if (data.status === 'Failed') {
      throw new Error(`Generation failed: ${JSON.stringify(data)}`)
    }

    process.stdout.write('.')
    await sleep(2000)
  }
  throw new Error('Polling timed out')
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`🎨 Generating: "${prompt}" (${width}x${height}, seed ${seed})`)

  // 1. Submit request
  const submitUrl = `${BASE_URL}${ENDPOINT}`
  const submitRes = await fetch(submitUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-key': API_KEY,
    },
    body: JSON.stringify({
      prompt,
      width,
      height,
      seed,
      // Optional BFL params
      prompt_upsampling: false,
      safety_tolerance: 2,
    }),
  })

  if (!submitRes.ok) {
    const text = await submitRes.text()
    throw new Error(`Submit failed (${submitRes.status}): ${text}`)
  }

  const submitData = await submitRes.json()
  const pollingUrl = submitData.polling_url

  if (!pollingUrl) {
    throw new Error(`No polling_url in response: ${JSON.stringify(submitData)}`)
  }

  console.log('⏳ Waiting for result...')
  const imageUrl = await pollResult(pollingUrl)
  console.log('\n✅ Image ready:', imageUrl)

  // 2. Download image
  const imageRes = await fetch(imageUrl)
  if (!imageRes.ok) {
    throw new Error(`Download failed (${imageRes.status})`)
  }
  const imageBuffer = Buffer.from(await imageRes.arrayBuffer())

  // Detect extension from content-type or URL
  const contentType = imageRes.headers.get('content-type') || 'image/jpeg'
  const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg'

  const timestamp = Date.now()
  const rawName = `${timestamp}_${seed}.${ext}`
  const rawPath = path.join(RAW_DIR, rawName)
  fs.mkdirSync(RAW_DIR, { recursive: true })
  fs.writeFileSync(rawPath, imageBuffer)
  console.log('💾 Raw saved:', rawPath.replace(PROJECT_ROOT + '/', ''))

  // 3. Optimize to WebP
  const slug = slugify(prompt) || `flux-${timestamp}`
  const webpName = `${slug}.webp`
  const webpPath = path.join(OPT_DIR, webpName)

  fs.mkdirSync(OPT_DIR, { recursive: true })

  try {
    execSync(`cwebp -q 85 "${rawPath}" -o "${webpPath}"`, { stdio: 'inherit' })
    console.log('🗜️  WebP saved:', webpPath.replace(PROJECT_ROOT + '/', ''))
  } catch (e) {
    // Fallback: copy raw if cwebp fails
    fs.copyFileSync(rawPath, webpPath.replace('.webp', `.${ext}`))
    console.log('⚠️  WebP conversion failed, copied raw:', rawPath.replace(PROJECT_ROOT + '/', ''))
  }

  // 4. Return metadata (safe to log — no API key)
  const meta = {
    prompt,
    width,
    height,
    seed,
    raw: `/images/generated/${rawName}`,
    optimized: `/images/${webpName}`,
    generatedAt: new Date().toISOString(),
  }
  console.log('\n📋 Result:', JSON.stringify(meta, null, 2))
  return meta
}

main().catch((err) => {
  console.error('\n❌', err.message)
  process.exit(1)
})
