import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { type Locale, LOCALES } from './constant/i18n'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined

  const pathnameLocale = LOCALES.find(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (
    pathnameLocale &&
    cookieLocale &&
    LOCALES.includes(cookieLocale) &&
    pathnameLocale !== cookieLocale
  ) {
    const newPathname = pathname.replace(`/${pathnameLocale}`, `/${cookieLocale}`)
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = newPathname
    return NextResponse.redirect(newUrl)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
