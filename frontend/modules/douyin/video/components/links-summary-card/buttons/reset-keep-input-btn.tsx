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

export function ResetKeepInputBtn({ onClick, variant, className }: Props) {
  const t = useTranslations()
  const { isOpen, onOpenChange, open } = useModal()

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={variant} onClick={open} className={className}>
            {t('re_enter')}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('re_enter_tooltip')}</TooltipContent>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={t('re_enter_confirm')}
        description={t('re_enter_confirm_desc')}
        onConfirm={onClick}
      />
    </>
  )
}
