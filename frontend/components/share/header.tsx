import Link from 'next/link'

import { WEB_ROUTES } from '@/configs/routes'
import { HEADER_HEIGHT } from '@/constant'

import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 right-0 left-0 z-50 border-b bg-background">
      <div
        className="container mx-auto flex items-center justify-between px-4 md:px-8"
        style={{ height: HEADER_HEIGHT }}
      >
        <Link
          href={WEB_ROUTES.HOME}
          className="flex h-full items-center text-lg font-semibold hover:opacity-80"
        >
          Downloader
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
