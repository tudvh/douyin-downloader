import { useTranslations } from 'next-intl'
import { ComponentProps } from 'react'

import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

interface Props {
  onClick: () => void
  variant?: ComponentProps<typeof Button>['variant']
  className?: string
}

export function ResumeBtn({ onClick, variant, className }: Props) {
  const t = useTranslations()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} onClick={onClick} className={className}>
          {t('resume')}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t('resume_tooltip')}</TooltipContent>
    </Tooltip>
  )
}
