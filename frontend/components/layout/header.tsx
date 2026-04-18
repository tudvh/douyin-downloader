'use client'

import { WEB_ROUTES } from '@/configs/routes'
import { APP_NAME, HEADER_HEIGHT } from '@/constant'
import { Link } from '@/i18n/navigation'
import { useHeaderActions } from '@/providers'
import Logo from '@/public/logo.svg'

import { LanguageSelector, ThemeToggle } from '../share'

export function Header() {
  const { isActionsVisible } = useHeaderActions()

  return (
    <header className="sticky top-0 right-0 left-0 z-50 border-b bg-background">
      <div
        className="container mx-auto flex items-center justify-between px-4 md:px-8"
        style={{ height: HEADER_HEIGHT }}
      >
        <Link
          href={WEB_ROUTES.HOME}
          className="flex h-full items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Logo className="h-7 w-7 text-foreground" />
          <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
        </Link>
        {isActionsVisible && (
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  )
}
