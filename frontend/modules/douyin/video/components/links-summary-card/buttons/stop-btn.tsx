import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  onClick: () => void
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function StopBtn({ onClick, className = 'w-full', variant = 'outline' }: Props) {
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
