'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      size="icon"
      variant="ghost"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon
        data-icon
        className="scale-100 rotate-0 transition-transform duration-200 dark:scale-0 dark:-rotate-90"
      />
      <MoonIcon
        data-icon
        className="absolute scale-0 rotate-90 transition-transform duration-200 dark:scale-100 dark:rotate-0"
      />
    </Button>
  )
}
