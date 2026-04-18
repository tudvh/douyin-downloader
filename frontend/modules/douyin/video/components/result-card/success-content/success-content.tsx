'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from '@/components/ui'
import { API_ROUTES } from '@/configs'
import type { IDouyinVideo } from '@/types'

import { DOUYIN_VIDEO } from '../../../constant'
import { downloadVideoFromUrls, getErrorMessage } from '../../../utils'
import { MetaItem } from './meta-item'

interface SuccessContentProps {
  data: IDouyinVideo
  index: number
}

export function SuccessContent({ data, index }: SuccessContentProps) {
  const t = useTranslations()
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleDownload = async () => {
    setIsDownloading(true)
    setDownloadError(null)
    try {
      await downloadVideoFromUrls(data.urls, DOUYIN_VIDEO.MP4_FILE_NAME(index + 1, data.id))
    } catch (error) {
      setDownloadError(getErrorMessage(error))
    } finally {
      setIsDownloading(false)
    }
  }

  // Pause video when it scrolls out of viewport
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            if (!videoElement.paused) {
              videoElement.pause()
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(videoElement)

    return () => {
      observer.unobserve(videoElement)
    }
  }, [])

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 md:grid-cols-2">
      <div className="h-[60dvh] w-full overflow-hidden rounded-lg">
        <video
          ref={videoRef}
          controls
          loop
          className="h-full w-full bg-black object-contain"
          poster={data.cover_url}
        >
          {data.urls.map((url, urlIndex) => (
            <source key={urlIndex} src={API_ROUTES.PROXY.VIDEO(url)} type="video/mp4" />
          ))}
        </video>
      </div>
      <div className="space-y-4">
        <div className="space-y-3 rounded-xl border border-border bg-card p-4 text-sm">
          <MetaItem label="ID" icon={{ type: 'copy', value: data.id }}>
            {data.id}
          </MetaItem>
          <MetaItem label={t('size')}>
            {data.width}×{data.height} - {data.fps} fps
          </MetaItem>
          <MetaItem
            label={t('author')}
            icon={{
              type: 'link',
              href: DOUYIN_VIDEO.DOUYIN_USER_URL(data.author.id),
              tooltip: t('author_profile_tooltip', { nickname: data.author.nickname }),
            }}
          >
            <div className="flex min-w-0 items-center justify-end gap-2">
              <Avatar size="sm">
                <AvatarImage src={data.author.avatar_url} alt={data.author.nickname} />
                <AvatarFallback>{data.author.nickname.slice(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="truncate">{data.author.nickname}</span>
            </div>
          </MetaItem>
          <MetaItem label={t('likes')}>{data.love_count.toLocaleString()}</MetaItem>
          <MetaItem
            label={t('description')}
            icon={{ type: 'copy', value: data.desc || undefined }}
            classNames={{
              value: 'break-words whitespace-pre-line text-foreground font-normal',
            }}
          >
            {data.desc || t('no_description')}
          </MetaItem>
        </div>

        {downloadError ? (
          <Alert variant="destructive">
            <AlertTitle>{t('download_failed')}</AlertTitle>
            <AlertDescription>{downloadError}</AlertDescription>
          </Alert>
        ) : null}

        {data.urls.length > 0 ? (
          <Button onClick={handleDownload} disabled={isDownloading} className="w-full">
            {isDownloading ? t('downloading_dots') : t('download_type', { type: t('video') })}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
