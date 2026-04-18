'use client'

import { useTranslations } from 'next-intl'

import { Skeleton } from '@/components/ui'

export function PendingContent() {
  const t = useTranslations()
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 md:grid-cols-2">
      <div className="h-[60dvh] w-full overflow-hidden rounded-lg">
        <Skeleton className="size-full" />
      </div>

      <div className="space-y-4">
        <div className="space-y-3 rounded-xl border border-border bg-card p-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex shrink-0 items-center gap-2">
              <span className="shrink-0 text-muted-foreground">ID</span>
              <Skeleton className="size-4 shrink-0 rounded" />
            </div>
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="shrink-0 text-muted-foreground capitalize">{t('size')}</span>
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex shrink-0 items-center gap-2">
              <span className="shrink-0 text-muted-foreground capitalize">{t('author')}</span>
              <Skeleton className="size-4 shrink-0 rounded" />
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="shrink-0 text-muted-foreground capitalize">{t('likes')}</span>
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex items-start gap-4">
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-muted-foreground capitalize">{t('description')}</span>
              <Skeleton className="size-4 shrink-0 rounded" />
            </div>
            <div className="min-w-0 flex-1 space-y-0.5 text-right">
              <Skeleton className="ml-auto h-[19px] w-full max-w-full" />
              <Skeleton className="ml-auto h-[19px] w-3/4" />
            </div>
          </div>
        </div>

        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}
