'use client'

import { ClassValue } from 'clsx'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import { Button, Card, CardContent, CardHeader } from '@/components/ui'
import { cn } from '@/lib/utils'
import { IParseResult } from '@/types'

import { DOUYIN_VIDEO } from '../../../constant'
import { scrollToElement } from '../../../utils'

export interface ResultCardLayoutProps {
  result: IParseResult
  index: number
  badge: ReactNode
  content: ReactNode
  className?: ClassValue
}

export function ResultCardLayout({
  result,
  index,
  badge,
  content,
  className,
}: ResultCardLayoutProps) {
  const t = useTranslations()

  return (
    <Card
      id={DOUYIN_VIDEO.VIDEO_ELEMENT_ID(result.url)}
      className={cn('flex flex-col overflow-hidden shadow-sm', className)}
    >
      <CardHeader className="w-full gap-4">
        {badge}
        <div className="w-full min-w-0 space-y-1">
          <Button
            variant="link"
            className="block size-fit max-w-full p-0 text-base font-semibold break-all whitespace-normal text-foreground"
            onClick={() => scrollToElement(DOUYIN_VIDEO.VIDEO_ELEMENT_ID(result.url))}
          >
            {t('video_index', { index: index + 1 })}
          </Button>
          <Button
            variant="link"
            className="block size-fit max-w-full p-0 text-sm break-all whitespace-normal text-muted-foreground"
            asChild
          >
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.url}
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}
