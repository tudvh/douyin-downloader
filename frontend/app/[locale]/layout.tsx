import '@/app/globals.css'

import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { ReactNode } from 'react'

import { Footer, Header } from '@/components/layout'
import { BackToTop } from '@/components/share'
import { LOCAL_STORAGE_KEYS } from '@/constant'
import { THEME_COLORS } from '@/lib/theme-colors'
import { cn } from '@/lib/utils'
import { HeaderActionsProvider, ThemeProvider, ToastProvider } from '@/providers'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const t = await getTranslations({ locale })

  return {
    title: {
      template: `%s | Downloader`,
      default: 'Downloader',
    },
    description: t('home_description'),
  }
}

const themeColorScript = `
  try {
    const THEME_COLORS = ${JSON.stringify(THEME_COLORS)};
    const color = localStorage.getItem('${LOCAL_STORAGE_KEYS.THEME_COLOR}') || 'base';
    const config = THEME_COLORS[color];
    
    if (config) {
      const theme = localStorage.getItem('theme') || 'system';
      let isDark = theme === 'dark';
      
      if (theme === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      const variables = isDark ? config.dark : config.light;
      
      for (const key in variables) {
        document.documentElement.style.setProperty(key, variables[key]);
      }
    }
  } catch (e) {}
`

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeColorScript }} />
      </head>
      <body className={cn('flex min-h-dvh flex-col bg-background antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderActionsProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <Header />
              <main className="flex-1 bg-muted dark:bg-background">
                <div className="container mx-auto px-4 py-8 md:px-8">{children}</div>
              </main>
              <Footer />
              <ToastProvider />
              <BackToTop />
            </NextIntlClientProvider>
          </HeaderActionsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
