'use client'

import { useTranslations } from 'next-intl'

import type { IParseResult } from '@/types'

import { FailedContent } from './failed-content'
import { PendingContent } from './pending-content'
import { ResultCardLayout } from './result-card-layout'
import { SuccessContent } from './success-content'

interface ResultCardProps {
  result: IParseResult
  index: number
  onRetry: (url: string) => void
  disabledRetry?: boolean
}

export function ResultCard({ result, index, onRetry, disabledRetry }: ResultCardProps) {
  const t = useTranslations()

  if (result.status === 'pending') {
    return (
      <ResultCardLayout
        result={result}
        index={index}
        className="border-amber-200/80 dark:border-amber-500/20"
        badge={
          <div className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
            ⏳ {t('processing')}
          </div>
        }
        content={<PendingContent />}
      />
    )
  }

  if (result.status === 'failed') {
    return (
      <ResultCardLayout
        result={result}
        index={index}
        className="border-red-200/80 dark:border-red-500/20"
        badge={
          <div className="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 dark:bg-red-500/10 dark:text-red-400">
            ❌ {t('analysis_failed')}
          </div>
        }
        content={
          <FailedContent
            error={result.error || t('unknown_error')}
            onRetry={() => onRetry(result.url)}
            disabled={disabledRetry}
          />
        }
      />
    )
  }

  if (result.status === 'success' && result.data) {
    return (
      <ResultCardLayout
        result={result}
        index={index}
        className="border-emerald-200/80 dark:border-emerald-500/20"
        badge={
          <div className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            ✅ {t('analysis_success')}
          </div>
        }
        content={<SuccessContent data={result.data} index={index} />}
      />
    )
  }

  return null
}
