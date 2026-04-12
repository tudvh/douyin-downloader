'use client'

import { useTranslations } from 'next-intl'
import { type ChangeEvent, startTransition, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Textarea,
} from '@/components/ui'
import type { IParseResult } from '@/types'

import { DouyinVideoService } from '../apis'
import { EFetchStatus } from '../enum'
import { findVideoUrls, getVideoId, validateInput } from '../utils'
import { LinksSummaryCard } from './links-summary-card'
import { ResultCard } from './result-card'

export const DouyinVideo = () => {
  const t = useTranslations()
  const [inputData, setInputData] = useState('')
  const [parseResults, setParseResults] = useState<IParseResult[]>([])
  const [validationError, setValidationError] = useState<string | null>(null)
  const [parseKey, setParseKey] = useState(0)
  const [fetchStatus, setFetchStatus] = useState<EFetchStatus>(EFetchStatus.Idle)
  const abortControllerRef = useRef<AbortController | null>(null)
  const currentIndexRef = useRef(0)

  const handleReset = () => {
    setInputData('')
    setParseResults([])
    setValidationError(null)
    setFetchStatus(EFetchStatus.Idle)
  }

  const handleResetKeepInput = () => {
    setParseResults([])
    setFetchStatus(EFetchStatus.Idle)
  }

  const handleStop = () => {
    abortControllerRef.current?.abort()
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInputData(value)

    if (value.trim()) {
      const error = validateInput(value, 30)
      setValidationError(error)
    } else {
      setValidationError(null)
    }
  }

  const handleParseVideos = async () => {
    if (!inputData.trim() || validationError) return

    const urls = findVideoUrls(inputData)
    if (urls.length === 0) {
      toast.error(t('no_valid_url_found'))
      return
    }

    const urlItems = urls.flatMap(url => {
      try {
        return [{ url, id: getVideoId(url) }]
      } catch {
        return []
      }
    })
    if (urlItems.length === 0) {
      toast.error(t('no_valid_url_found'))
      return
    }

    setParseKey(Date.now())
    const controller = new AbortController()
    abortControllerRef.current = controller
    currentIndexRef.current = 0

    const initialResults: IParseResult[] = urlItems.map(({ url, id }) => ({
      url,
      id,
      status: 'pending',
    }))
    setParseResults(initialResults)
    setFetchStatus(EFetchStatus.Fetching)

    startTransition(async () => {
      runFetchLoop(urlItems, 0, controller.signal)
    })
  }

  const handleResume = () => {
    if (fetchStatus !== EFetchStatus.Paused) return
    const controller = new AbortController()
    abortControllerRef.current = controller
    setFetchStatus(EFetchStatus.Fetching)

    const urls = findVideoUrls(inputData).flatMap(url => {
      try {
        return [{ url, id: getVideoId(url) }]
      } catch {
        return []
      }
    })

    startTransition(async () => {
      runFetchLoop(urls, currentIndexRef.current, controller.signal)
    })
  }

  const runFetchLoop = async (
    urlItems: { url: string; id: string }[],
    startIndex: number,
    signal: AbortSignal,
  ) => {
    for (let i = startIndex; i < urlItems.length; i++) {
      currentIndexRef.current = i
      if (signal.aborted) {
        setFetchStatus(EFetchStatus.Paused)
        return
      }
      const { id } = urlItems[i]
      try {
        const data = await DouyinVideoService.getVideo(id, signal)
        setParseResults(prev =>
          prev.map((result, index) => {
            if (index !== i) return result
            return { ...result, status: 'success', data, error: undefined }
          }),
        )
      } catch (error) {
        if (signal.aborted) {
          setFetchStatus(EFetchStatus.Paused)
          return
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setParseResults(prev =>
          prev.map((result, index) => {
            if (index !== i) return result
            return { ...result, status: 'failed', error: errorMessage, data: undefined }
          }),
        )
      }
    }
    setFetchStatus(EFetchStatus.Done)
  }

  const handleRetryFailed = (urlsToRetry: Set<string>) => {
    if (urlsToRetry.size === 0) return

    const controller = new AbortController()
    abortControllerRef.current = controller
    setFetchStatus(EFetchStatus.Fetching)

    setParseResults(prev =>
      prev.map(result => {
        if (urlsToRetry.has(result.url)) {
          return { ...result, status: 'pending', error: undefined, data: undefined }
        }
        return result
      }),
    )

    startTransition(async () => {
      const indicesToRetry = parseResults.reduce((acc, result, idx) => {
        if (urlsToRetry.has(result.url)) acc.push(idx)
        return acc
      }, [] as number[])

      for (const i of indicesToRetry) {
        if (controller.signal.aborted) {
          setFetchStatus(EFetchStatus.Paused)
          return
        }
        const result = parseResults[i]
        try {
          const data = await DouyinVideoService.getVideo(result.id, controller.signal)
          setParseResults(prev =>
            prev.map((r, idx) =>
              idx === i ? { ...r, status: 'success', data, error: undefined } : r,
            ),
          )
        } catch (error) {
          if (controller.signal.aborted) {
            setFetchStatus(EFetchStatus.Paused)
            return
          }
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          setParseResults(prev =>
            prev.map((r, idx) =>
              idx === i ? { ...r, status: 'failed', error: errorMessage, data: undefined } : r,
            ),
          )
        }
      }
      setFetchStatus(EFetchStatus.Done)
    })
  }

  const handleRetrySingle = (url: string) => {
    const urlsSet = new Set([url])
    handleRetryFailed(urlsSet)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t('detail_page_heading', { platform: t('douyin'), type: t('videos') })}
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            {t('detail_page_description')}
          </p>
        </div>

        {fetchStatus === EFetchStatus.Idle ? (
          <Card className="flex flex-col overflow-hidden border-border/80 shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">{t('enter_url_or_share_code')}</CardTitle>
              <CardDescription>{t('batch_analysis_support_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Textarea
                placeholder={t('paste_url_placeholder')}
                value={inputData}
                onChange={handleInputChange}
                className="max-h-[50dvh] min-h-[6rem] w-full resize-none overflow-y-auto overscroll-contain border-border/80"
              />

              {validationError && (
                <Alert>
                  <AlertTitle>{t('warning')}</AlertTitle>
                  <AlertDescription>{validationError}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleParseVideos}
                disabled={!inputData.trim() || !!validationError}
                className="w-full"
              >
                {t('start_analyzing')}
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>

      {fetchStatus !== EFetchStatus.Idle ? (
        <LinksSummaryCard
          key={parseKey}
          parseResults={parseResults}
          fetchStatus={fetchStatus}
          onStop={handleStop}
          onResume={handleResume}
          onResetKeepInput={handleResetKeepInput}
          onFetchAgain={handleParseVideos}
          onRetryFailed={handleRetryFailed}
          onReset={handleReset}
        />
      ) : null}

      {parseResults.length > 0 && fetchStatus !== EFetchStatus.Idle ? (
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold text-foreground">{t('analysis_results')}</h2>

          <div className="space-y-5">
            {parseResults.map((result, index) => (
              <ResultCard
                key={result.url}
                result={result}
                index={index}
                onRetry={handleRetrySingle}
                disabledRetry={fetchStatus !== EFetchStatus.Done}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
