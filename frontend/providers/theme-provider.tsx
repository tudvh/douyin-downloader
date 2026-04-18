'use client'

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ComponentProps, createContext, useCallback, useContext, useEffect, useState } from 'react'

import { LOCAL_STORAGE_KEYS } from '@/constant'
import { THEME_COLORS, ThemeColorName } from '@/lib/theme-colors'

interface ThemeColorContextType {
  themeColor: ThemeColorName
  setThemeColor: (color: ThemeColorName) => void
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined)

function ThemeColorProviderInner({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColorName>('base')
  const [isMounted, setIsMounted] = useState(false)

  const { resolvedTheme } = useTheme()

  const handleSetThemeColor = useCallback((color: ThemeColorName) => {
    setThemeColor(color)
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_COLOR, color)
  }, [])

  useEffect(() => {
    setIsMounted(true)
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME_COLOR) as ThemeColorName | null
    if (stored && THEME_COLORS[stored]) {
      setThemeColor(stored)
    } else {
      setThemeColor('base')
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_COLOR, 'base')
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const config = THEME_COLORS[themeColor]
    if (!config) return

    const variables = resolvedTheme === 'dark' ? config.dark : config.light

    Object.entries(variables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [themeColor, resolvedTheme, isMounted])

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor: handleSetThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  )
}

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeColorProviderInner>{children}</ThemeColorProviderInner>
    </NextThemesProvider>
  )
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext)
  if (context === undefined) {
    throw new Error('useThemeColor must be used within a ThemeProvider')
  }
  return context
}
