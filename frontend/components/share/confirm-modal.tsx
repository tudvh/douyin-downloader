'use client'

import { useTranslations } from 'next-intl'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

interface ConfirmModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  onConfirm: () => void
  confirmKey?: Parameters<ReturnType<typeof useTranslations>>[0]
  cancelKey?: Parameters<ReturnType<typeof useTranslations>>[0]
  variant?: 'default' | 'destructive'
}

export function ConfirmModal({
  isOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmKey = 'confirm',
  cancelKey = 'cancel',
  variant = 'default',
}: ConfirmModalProps) {
  const t = useTranslations()

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>{t(cancelKey)}</AlertDialogCancel>
          <AlertDialogAction
            onClick={e => {
              e.preventDefault()
              onConfirm()
              onOpenChange(false)
            }}
            className={cn(
              variant === 'destructive' &&
                'text-destructive-foreground bg-destructive hover:bg-destructive/90',
            )}
          >
            {t(confirmKey)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
