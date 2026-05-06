import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

function getSubdomain(req: NextRequest): string | null {
  const hostname = (req.headers.get('host') || '').split(':')[0]
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'
  if (hostname.includes('localhost')) {
    if (hostname.startsWith('app.')) return 'app'
    if (hostname.startsWith('partner.')) return 'partner'
    return null
  }
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) return hostname.split('---')[0]
  const root = rootDomain.split(':')[0]
  if (hostname === root || hostname === `www.${root}`) return null
  if (hostname.endsWith(`.${root}`)) return hostname.replace(`.${root}`, '')
  return null
}

export async function middleware(req: NextRequest) {
  const res = await updateSession(req)
  const { pathname } = req.nextUrl
  const sub = getSubdomain(req)

  // Auth routes are shared across all subdomains
  if (pathname === '/login' || pathname === '/callback') {
    return res
  }

  if (sub === 'app') {
    // Admin subdomain — rewrite / to /dashboard
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/dashboard', req.url))
    }
    return res
  }

  if (sub === 'partner') {
    // Partner subdomain — rewrite all paths to /p/* prefix
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/p/dashboard', req.url))
    }
    // Don't double-prefix paths that already start with /p/
    if (pathname.startsWith('/p/')) {
      return res
    }
    return NextResponse.rewrite(new URL(`/p${pathname}`, req.url))
  }

  return res
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'] }
