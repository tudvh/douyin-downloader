'use client'

import { Globe } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { Locale, LOCALES } from '@/constant'
import { usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const LOCALE_LABELS: Record<Locale, { icon: string; label: string }> = {
  vi: { icon: '🇻🇳', label: 'Tiếng Việt' },
  en: { icon: '🇺🇸', label: 'English' },
  ja: { icon: '🇯🇵', label: '日本語' },
  es: { icon: '🇪🇸', label: 'Español' },
  'zh-CN': { icon: '🇨🇳', label: '简体中文' },
  'zh-TW': { icon: '🇹🇼', label: '繁體中文' },
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
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          className={cn(isPending && 'cursor-wait opacity-50')}
          aria-label="Select language"
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map(l => (
          <DropdownMenuItem
            key={l}
            onClick={() => onSelectChange(l)}
            className={cn('flex cursor-pointer items-center gap-2', l === locale && 'bg-accent')}
          >
            <span className="w-5 text-center">{LOCALE_LABELS[l].icon}</span>
            <span>{LOCALE_LABELS[l].label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
