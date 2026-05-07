import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Protected route prefixes
const adminPrefixes = ['/dashboard', '/bookings', '/leads', '/customers', '/reports', '/partner-mgmt', '/prospects', '/settings']
const partnerPrefixes = ['/p/']

export async function middleware(req: NextRequest) {
  const res = await updateSession(req)
  const { pathname } = req.nextUrl

  // Auth routes are always accessible
  if (pathname === '/login' || pathname === '/callback') {
    return res
  }

  // Check if route is protected
  const isAdminRoute = adminPrefixes.some((prefix) => pathname.startsWith(prefix))
  const isPartnerRoute = partnerPrefixes.some((prefix) => pathname.startsWith(prefix))

  // In production you may want strict redirects to /login here.
  // For now we keep soft auth (demo banner) so the site remains usable
  // without logging in. Uncomment below for strict mode:
  //
  // if (isAdminRoute || isPartnerRoute) {
  //   const supabase = createServerClient(...)
  //   const { data: { user } } = await supabase.auth.getUser()
  //   if (!user) {
  //     return NextResponse.redirect(new URL('/login', req.url))
  //   }
  // }

  return res
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\..*).*)'] }
