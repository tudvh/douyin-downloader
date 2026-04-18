import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { ConfirmModal } from '@/components/share'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  onClick: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  className?: string
}

export function ResetBtn({ onClick, variant = 'outline', className = 'w-full' }: Props) {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={variant} onClick={() => setIsOpen(true)} className={className}>
            {t('reset')}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('reset_tooltip')}</TooltipContent>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={t('reset_confirm')}
        description={t('reset_confirm_desc')}
        onConfirm={onClick}
      />
    </>
  )
}
