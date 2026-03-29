'use client'

import { Alert, AlertDescription, AlertTitle, Button } from '@/components/ui'

interface FailedContentProps {
  error: string
  onRetry: () => void
  disabled?: boolean
}

export function FailedContent({ error, onRetry, disabled }: FailedContentProps) {
  return (
    <div className="space-y-4">
      <Alert>
        <AlertTitle>Chi tiết lỗi</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      <Button onClick={onRetry} variant="outline" className="w-full" disabled={disabled}>
        Phân tích lại
      </Button>
    </div>
  )
}
