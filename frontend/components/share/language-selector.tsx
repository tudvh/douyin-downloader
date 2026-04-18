'use client'

import { Globe } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { type Locale, LOCALES } from '@/constant/i18n'
import { usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const LOCALE_LABELS: Record<Locale, string> = {
  vi: '🇻🇳 Tiếng Việt',
  en: '🇺🇸 English',
  ja: '🇯🇵 日本語',
  es: '🇪🇸 Español',
  'zh-CN': '🇨🇳 简体中文',
  'zh-TW': '🇹🇼 繁體中文',
}

export function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  function onSelectChange(nextLocale: Locale) {
    if (nextLocale === locale) return

    startTransition(() => {
      const date = new Date()
      date.setFullYear(date.getFullYear() + 1)
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; expires=${date.toUTCString()};`

      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={isPending}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50',
            isPending && 'cursor-wait opacity-50',
          )}
          aria-label="Select language"
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map(l => (
          <DropdownMenuItem
            key={l}
            onClick={() => onSelectChange(l)}
            className={cn('cursor-pointer', l === locale && 'bg-accent')}
          >
            {LOCALE_LABELS[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
