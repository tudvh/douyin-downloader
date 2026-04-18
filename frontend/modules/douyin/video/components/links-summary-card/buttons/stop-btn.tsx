import { useTranslations } from 'next-intl'
import { ComponentProps } from 'react'

import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

interface Props {
  onClick: () => void
  variant?: ComponentProps<typeof Button>['variant']
  className?: string
}

export function StopBtn({ onClick, variant, className }: Props) {
  const t = useTranslations()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} onClick={onClick} className={className}>
          {t('stop')}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t('stop_tooltip')}</TooltipContent>
    </Tooltip>
  )
}
