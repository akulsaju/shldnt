import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const baseDomain = process.env.PORTAL_BASE_DOMAIN?.trim().toLowerCase().replace(/^\.+|\.+$/g, '')
  const hostname = request.headers.get('host')?.split(':')[0].toLowerCase() ?? ''
  const countrySubdomain = baseDomain && hostname.endsWith(`.${baseDomain}`)
    ? hostname.slice(0, -(baseDomain.length + 1))
    : ''
  const isCountrySubdomain = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(countrySubdomain)
  const shouldRewriteCountryPortal = isCountrySubdomain
    && (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/portal')
  const response = shouldRewriteCountryPortal
    ? NextResponse.rewrite(new URL(`/portal/${countrySubdomain}${request.nextUrl.search}`, request.url), { request })
    : NextResponse.next({ request })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return response

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value)
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  await supabase.auth.getUser()
  return response
}

export const config = {
  matcher: ['/', '/portal/:path*'],
}
