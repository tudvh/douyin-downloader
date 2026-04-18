import { useTranslations } from 'next-intl'
import { ComponentProps } from 'react'

import { ConfirmModal } from '@/components/share'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { useModal } from '@/hooks'

interface Props {
  onClick: () => void
  variant?: ComponentProps<typeof Button>['variant']
  className?: string
}

export function ResetBtn({ onClick, variant, className }: Props) {
  const t = useTranslations()
  const { isOpen, onOpenChange, open } = useModal()

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={variant} onClick={open} className={className}>
            {t('reset')}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('reset_tooltip')}</TooltipContent>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={t('reset_confirm')}
        description={t('reset_confirm_desc')}
        onConfirm={onClick}
      />
    </>
  )
}
