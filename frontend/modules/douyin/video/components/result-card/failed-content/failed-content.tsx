'use client'

import { useTranslations } from 'next-intl'

import { Alert, AlertDescription, AlertTitle, Button } from '@/components/ui'

interface FailedContentProps {
  error: string
  onRetry: () => void
  disabled?: boolean
}

export function FailedContent({ error, onRetry, disabled }: FailedContentProps) {
  const t = useTranslations()
  return (
    <div className="space-y-4">
      <Alert>
        <AlertTitle>{t('error_details')}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      <Button onClick={onRetry} variant="outline" className="w-full" disabled={disabled}>
        {t('re_analyze')}
      </Button>
    </div>
  )
}
