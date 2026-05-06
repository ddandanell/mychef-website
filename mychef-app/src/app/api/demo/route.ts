import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const host = request.headers.get('host') || 'localhost:3000'
  const hostname = host.split(':')[0]

  const res = NextResponse.json({ success: true })

  // Set cookie for the current domain and parent domain
  res.cookies.set('demo_mode', 'true', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
    domain: hostname,
  })

  // Also set for plain localhost
  if (hostname.includes('.')) {
    res.cookies.set('demo_mode', 'true', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
      domain: 'localhost',
    })
  }

  return res
}
