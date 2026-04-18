'use client'

import { CheckIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { THEME_COLOR_KEYS, THEME_COLORS } from '@/lib/theme-colors'
import { cn } from '@/lib/utils'
import { useThemeColor } from '@/providers'

export function ThemeToggle() {
  const t = useTranslations()
  const { theme, resolvedTheme, setTheme } = useTheme()
  const { themeColor, setThemeColor } = useThemeColor()

  useEffect(() => {
    if (theme === 'system' && resolvedTheme) {
      setTheme(resolvedTheme)
    }
  }, [theme, resolvedTheme, setTheme])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Customize appearance">
          <SunIcon
            data-icon
            className="scale-100 rotate-0 transition-transform duration-200 dark:scale-0 dark:-rotate-90"
          />
          <MoonIcon
            data-icon
            className="absolute scale-0 rotate-90 transition-transform duration-200 dark:scale-100 dark:rotate-0"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h4 className="text-sm leading-none font-medium">{t('appearance')}</h4>
            <p className="text-xs text-muted-foreground">{t('appearance_desc')}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('mode')}</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className={cn(
                  'h-8 cursor-pointer justify-start px-2',
                  resolvedTheme === 'light' && 'border-primary ring-1 ring-primary',
                )}
                onClick={() => setTheme('light')}
              >
                <SunIcon className="mr-2 h-4 w-4" />
                <span className="text-xs">{t('light')}</span>
              </Button>
              <Button
                variant="outline"
                className={cn(
                  'h-8 cursor-pointer justify-start px-2',
                  resolvedTheme === 'dark' && 'border-primary ring-1 ring-primary',
                )}
                onClick={() => setTheme('dark')}
              >
                <MoonIcon className="mr-2 h-4 w-4" />
                <span className="text-xs">{t('dark')}</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('color')}</h4>
            <TooltipProvider>
              <div className="grid grid-cols-6 gap-2">
                {THEME_COLOR_KEYS.map(colorKey => {
                  const isActive = themeColor === colorKey
                  return (
                    <Tooltip key={colorKey}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setThemeColor(colorKey)}
                          className={cn(
                            'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-all hover:scale-105',
                            isActive ? 'border-primary' : 'hover:border-primary/50',
                          )}
                          style={{
                            backgroundColor:
                              resolvedTheme === 'dark'
                                ? THEME_COLORS[colorKey].dark['--primary']
                                : THEME_COLORS[colorKey].light['--primary'],
                          }}
                        >
                          {isActive && <CheckIcon className="h-4 w-4 text-primary-foreground" />}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t(THEME_COLORS[colorKey].label)}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
