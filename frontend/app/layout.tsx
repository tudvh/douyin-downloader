import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { BackToTop, Header } from '@/components/share'
import { cn } from '@/lib/utils'
import { ThemeProvider, ToastProvider } from '@/providers'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Douyin/TikTok Video Downloader',
  description: 'Công cụ tải video và hình ảnh từ Douyin và TikTok một cách dễ dàng',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={cn('min-h-dvh bg-background font-sans antialiased', inter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="container mx-auto px-4 py-8 md:px-8">{children}</main>
          <ToastProvider />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
