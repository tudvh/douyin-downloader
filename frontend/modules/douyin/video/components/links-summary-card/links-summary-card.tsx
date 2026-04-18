'use client'

import JSZip from 'jszip'
import { CheckCircle2, Loader2, PauseCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { API_ROUTES } from '@/configs'
import type { IParseResult } from '@/types'

import { DOUYIN_VIDEO, PROXY_VIDEO_MAX_READ_ATTEMPTS } from '../../constant'
import { EFetchStatus } from '../../enum'
import { getErrorMessage, scrollToElement } from '../../utils'
import { FetchAgainBtn, ResetBtn, ResetKeepInputBtn, ResumeBtn, StopBtn } from './buttons'

export interface LinksSummaryCardProps {
  parseResults: IParseResult[]
  fetchStatus: EFetchStatus
  onStop: () => void
  onResume: () => void
  onResetKeepInput: () => void
  onRetryFailed: (urls: Set<string>) => void
  onFetchAgain: () => void
  onReset: () => void
}

export function LinksSummaryCard({
  parseResults,
  fetchStatus,
  onStop,
  onResume,
  onResetKeepInput,
  onRetryFailed,
  onFetchAgain,
  onReset,
}: LinksSummaryCardProps) {
  const t = useTranslations()
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set())
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState<{
    current: number
    total: number
    stage: 'fetching' | 'zipping'
    itemIndex?: number
    itemUrlIndex?: number
  } | null>(null)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const handleSelectUrl = (url: string, checked: boolean) => {
    setSelectedUrls(prev => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(url)
      } else {
        newSet.delete(url)
      }
      return newSet
    })
  }

  const handleSelectAll = (checked: boolean) => {
    const successUrls = parseResults
      .filter(result => result.status === 'success')
      .map(result => result.url)

    if (checked) {
      setSelectedUrls(new Set(successUrls))
    } else {
      setSelectedUrls(new Set())
    }
  }

  const pendingResults = parseResults.filter(result => result.status === 'pending')
  const successResults = parseResults.filter(result => result.status === 'success')
  const failedResults = parseResults.filter(result => result.status === 'failed')

  const allSuccessSelected =
    successResults.length > 0 && successResults.every(result => selectedUrls.has(result.url))
  const someSuccessSelected = successResults.some(result => selectedUrls.has(result.url))

  const [selectedFailedUrls, setSelectedFailedUrls] = useState<Set<string>>(new Set())
  const allFailedSelected =
    failedResults.length > 0 && failedResults.every(result => selectedFailedUrls.has(result.url))
  const someFailedSelected = failedResults.some(result => selectedFailedUrls.has(result.url))

  const handleSelectFailedUrl = (url: string, checked: boolean) => {
    setSelectedFailedUrls(prev => {
      const newSet = new Set(prev)
      if (checked) newSet.add(url)
      else newSet.delete(url)
      return newSet
    })
  }

  const handleSelectAllFailed = (checked: boolean) => {
    if (checked) {
      setSelectedFailedUrls(new Set(failedResults.map(r => r.url)))
    } else {
      setSelectedFailedUrls(new Set())
    }
  }

  const handleRetryFailedLocal = () => {
    if (selectedFailedUrls.size > 0) {
      onRetryFailed(selectedFailedUrls)
      setSelectedFailedUrls(new Set())
    }
  }

  const handleDownloadSelected = async () => {
    const resultsToDownload = parseResults.filter(
      result => result.status === 'success' && selectedUrls.has(result.url) && result.data,
    )
    const resultsWithVideo = resultsToDownload.filter(result => !!result.data?.urls.length)
    if (resultsWithVideo.length === 0) return

    setIsDownloading(true)

    setDownloadError(null)
    setDownloadProgress({
      current: 0,
      total: resultsWithVideo.length,
      stage: 'fetching',
      itemIndex: 0,
      itemUrlIndex: 0,
    })

    try {
      const zip = new JSZip()
      const downloads: { filename: string; blob: Blob }[] = []

      for (let i = 0; i < resultsWithVideo.length; i++) {
        const result = resultsWithVideo[i]
        const upstreamUrls = result.data?.urls ?? []
        if (upstreamUrls.length === 0) continue

        setDownloadProgress(prev =>
          prev ? { ...prev, itemIndex: i + 1, itemUrlIndex: 0, stage: 'fetching' as const } : prev,
        )

        let blob: Blob | null = null
        for (let j = 0; j < upstreamUrls.length; j++) {
          try {
            setDownloadProgress(prev =>
              prev
                ? { ...prev, itemIndex: i + 1, itemUrlIndex: j + 1, stage: 'fetching' as const }
                : prev,
            )
            const proxiedUrl = API_ROUTES.PROXY.VIDEO(upstreamUrls[j])
            for (let attempt = 0; attempt < PROXY_VIDEO_MAX_READ_ATTEMPTS; attempt++) {
              try {
                const response = await fetch(proxiedUrl, { cache: 'no-store' })
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                const buf = await response.arrayBuffer()
                blob = new Blob([buf], {
                  type: response.headers.get('content-type') || 'video/mp4',
                })
                break
              } catch (readErr) {
                if (attempt === PROXY_VIDEO_MAX_READ_ATTEMPTS - 1) throw readErr
              }
            }
            break
          } catch (err) {
            console.error(`Video #${i + 1} URL ${j + 1} failed:`, err)
            const remaining = upstreamUrls.slice(j + 1)
            if (remaining.length === 0) {
              throw new Error(
                t('download_video_failed_msg', {
                  index: i + 1,
                  totalUrl: upstreamUrls.length,
                }),
              )
            }
          }
        }

        if (blob) {
          setDownloadProgress(prev =>
            prev ? { ...prev, current: prev.current + 1, stage: 'fetching' as const } : prev,
          )
          downloads.push({
            filename: DOUYIN_VIDEO.MP4_FILE_NAME(i + 1, result.id),
            blob,
          })
        }
      }

      if (downloads.length === 0) {
        setDownloadError(t('download_all_failed_msg'))
        return
      }

      for (const { filename, blob } of downloads) {
        zip.file(filename, blob)
      }

      setDownloadProgress(prev =>
        prev
          ? { ...prev, stage: 'zipping' as const }
          : { current: 0, total: resultsWithVideo.length, stage: 'zipping' as const },
      )

      const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'STORE' })
      const zipUrl = window.URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = zipUrl
      a.download = DOUYIN_VIDEO.ZIP_FILE_NAME()
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(zipUrl)
    } catch (error) {
      console.error('Error downloading zip:', error)
      setDownloadError(getErrorMessage(error))
    } finally {
      setIsDownloading(false)
      setDownloadProgress(null)
    }
  }

  const renderStatusBadge = () => {
    switch (fetchStatus) {
      case EFetchStatus.Fetching:
        return (
          <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <Loader2 className="size-3.5 animate-spin" />
            {t('analyzing')}
          </span>
        )
      case EFetchStatus.Paused:
        return (
          <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
            <PauseCircle className="size-3.5" />
            {t('paused')}
          </span>
        )
      case EFetchStatus.Done:
        return (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 className="size-3.5" />
            {t('done')}
          </span>
        )
      default:
        return null
    }
  }

  const downloadStatusText = (() => {
    if (!isDownloading) return null
    if (!downloadProgress) return t('preparing_to_download')

    if (downloadProgress.stage === 'zipping') return t('creating_zip_file')
    const { current, total, itemIndex, itemUrlIndex } = downloadProgress

    if (itemIndex && itemUrlIndex) {
      return t('downloading_and_packing_detail', {
        itemIndex,
        itemUrlIndex,
        total,
      })
    }

    return t('downloading_and_packing', { current, total })
  })()

  return (
    <Card className="flex flex-col overflow-hidden border-border/80 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <CardTitle className="text-xl">{t('analysis_progress')}</CardTitle>
          {renderStatusBadge()}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {pendingResults.length > 0 ? (
            <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
              ⏳ {t('pending_count', { count: pendingResults.length })}
            </span>
          ) : null}
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            ✅ {t('success_count', { count: successResults.length })}
          </span>
          <span className="rounded-full bg-red-50 px-2 py-1 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            ❌ {t('failed_count', { count: failedResults.length })}
          </span>
        </div>
        {isDownloading ? (
          <Alert>
            <AlertTitle>{t('downloading')}</AlertTitle>
            <AlertDescription>{downloadStatusText}</AlertDescription>
          </Alert>
        ) : null}
        {downloadError ? (
          <Alert variant="destructive">
            <AlertTitle>{t('download_failed')}</AlertTitle>
            <AlertDescription>{downloadError}</AlertDescription>
          </Alert>
        ) : null}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden">
        {pendingResults.length > 0 || successResults.length > 0 || failedResults.length > 0 ? (
          <div className="flex min-h-0 flex-1 flex-col gap-6">
            {pendingResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-semibold text-amber-700 dark:text-amber-400">
                  {t('pending_list')}
                </h3>
                <div className="max-h-[25dvh] min-h-0 overflow-y-auto overscroll-contain rounded-xl border border-amber-200/70 bg-amber-50/50 p-3 dark:border-amber-500/20 dark:bg-amber-500/10">
                  {pendingResults.map(result => (
                    <div
                      key={result.url}
                      className="rounded p-2 transition-colors hover:bg-amber-100/70 dark:hover:bg-amber-500/20"
                    >
                      <Button
                        variant="link"
                        onClick={() => scrollToElement(DOUYIN_VIDEO.VIDEO_ELEMENT_ID(result.url))}
                        className="block size-fit max-w-full rounded-none p-0 text-left text-sm font-normal break-all whitespace-normal text-amber-700 dark:text-amber-400"
                      >
                        {result.url}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {successResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold text-emerald-700 dark:text-emerald-400">
                      {t('success_list')}
                    </h3>
                    <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                      <Checkbox
                        checked={
                          allSuccessSelected
                            ? true
                            : someSuccessSelected && selectedUrls.size > 0
                              ? 'indeterminate'
                              : false
                        }
                        onCheckedChange={checked => handleSelectAll(checked === true)}
                        disabled={isDownloading || fetchStatus === EFetchStatus.Fetching}
                      />
                      {t('select_all')}
                    </label>
                  </div>
                  {selectedUrls.size > 0 ? (
                    <Button size="sm" onClick={handleDownloadSelected} disabled={isDownloading}>
                      {isDownloading
                        ? t('downloading_dots')
                        : t('download_selected_videos', { count: selectedUrls.size })}
                    </Button>
                  ) : null}
                </div>
                <div className="max-h-[25dvh] min-h-0 overflow-y-auto overscroll-contain rounded-xl border border-emerald-200/70 bg-emerald-50/50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                  {successResults.map(result => (
                    <label
                      key={result.url}
                      className="user-select-none flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-emerald-100/80 dark:hover:bg-emerald-500/20"
                    >
                      <Checkbox
                        checked={selectedUrls.has(result.url)}
                        onCheckedChange={checked => handleSelectUrl(result.url, checked === true)}
                        disabled={isDownloading || fetchStatus === EFetchStatus.Fetching}
                        className="border-emerald-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-white dark:border-emerald-700 dark:data-[state=checked]:bg-emerald-500"
                      />
                      <div className="min-w-0 flex-1">
                        <Button
                          variant="link"
                          onClick={() => scrollToElement(DOUYIN_VIDEO.VIDEO_ELEMENT_ID(result.url))}
                          className="block size-fit max-w-full rounded-none p-0 text-left text-sm font-normal break-all whitespace-normal text-emerald-700 dark:text-emerald-400"
                        >
                          {result.url}
                        </Button>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
            {failedResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold text-red-600 dark:text-red-400">
                      {t('failed_list')}
                    </h3>
                    <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                      <Checkbox
                        checked={
                          allFailedSelected
                            ? true
                            : someFailedSelected && selectedFailedUrls.size > 0
                              ? 'indeterminate'
                              : false
                        }
                        onCheckedChange={checked => handleSelectAllFailed(checked === true)}
                        disabled={isDownloading || fetchStatus === EFetchStatus.Fetching}
                      />
                      {t('select_all')}
                    </label>
                  </div>
                  {selectedFailedUrls.size > 0 ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleRetryFailedLocal}
                            disabled={isDownloading || fetchStatus === EFetchStatus.Fetching}
                          >
                            {t('re_analyze_failed_videos', { count: selectedFailedUrls.size })}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('retry_failed_tooltip')}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}
                </div>
                <div className="max-h-[25dvh] min-h-0 overflow-y-auto overscroll-contain rounded-xl border border-red-200/70 bg-red-50/60 p-3 dark:border-red-500/20 dark:bg-red-500/10">
                  {failedResults.map(result => (
                    <label
                      key={result.url}
                      className="user-select-none flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-red-100/70 dark:hover:bg-red-500/20"
                    >
                      <Checkbox
                        checked={selectedFailedUrls.has(result.url)}
                        onCheckedChange={checked =>
                          handleSelectFailedUrl(result.url, checked === true)
                        }
                        disabled={isDownloading || fetchStatus === EFetchStatus.Fetching}
                        className="border-red-300 data-[state=checked]:bg-red-600 data-[state=checked]:text-white dark:border-red-700 dark:data-[state=checked]:bg-red-500"
                      />
                      <div className="min-w-0 flex-1">
                        <Button
                          variant="link"
                          onClick={() => scrollToElement(DOUYIN_VIDEO.VIDEO_ELEMENT_ID(result.url))}
                          className="block size-fit max-w-full rounded-none p-0 text-left text-sm font-normal break-all whitespace-normal text-red-600 dark:text-red-400"
                        >
                          {result.url}
                        </Button>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-col gap-2 pt-2">
          <TooltipProvider>
            {fetchStatus === EFetchStatus.Fetching ? <StopBtn onClick={onStop} /> : null}

            {fetchStatus === EFetchStatus.Paused ? (
              <div className="grid gap-x-3 gap-y-2 md:grid-cols-2 lg:grid-cols-4">
                <ResumeBtn onClick={onResume} />
                <FetchAgainBtn onClick={onFetchAgain} variant="secondary" />
                <ResetBtn onClick={onReset} variant="outline" />
                <ResetKeepInputBtn onClick={onResetKeepInput} variant="outline" />
              </div>
            ) : null}

            {fetchStatus === EFetchStatus.Done ? (
              <div className="grid gap-x-3 gap-y-2 md:grid-cols-[1fr_auto_auto]">
                <FetchAgainBtn onClick={onFetchAgain} />
                <ResetBtn onClick={onReset} variant="outline" className="w-full md:w-auto" />
                <ResetKeepInputBtn
                  onClick={onResetKeepInput}
                  variant="outline"
                  className="w-full md:w-auto"
                />
              </div>
            ) : null}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
