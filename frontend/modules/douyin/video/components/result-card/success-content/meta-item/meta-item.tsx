import { ClassValue } from 'clsx'
import { CheckIcon, CopyIcon, ExternalLinkIcon, Loader2 } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'
import { cn } from '@/lib/utils'

import { copyTextToClipboard } from '../../../../utils'

enum CopyStatus {
  Idle = 'idle',
  Copying = 'copying',
  Copied = 'copied',
}

interface MetaItemClassNames {
  root?: ClassValue
  label?: {
    root?: ClassValue
    text?: ClassValue
    icon?: ClassValue
  }
  value?: ClassValue
}

type MetaItemBaseProps = {
  label: string
  children: ReactNode
  classNames?: MetaItemClassNames
}

type MetaItemProps =
  | (MetaItemBaseProps & {
      icon: {
        type: 'copy'
        value?: string
        href?: never
        tooltip?: never
      }
    })
  | (MetaItemBaseProps & {
      icon: {
        type: 'link'
        href: string
        tooltip: string
        value?: never
      }
    })
  | (MetaItemBaseProps & {
      icon?: undefined
    })

export const MetaItem = ({ icon, label, children, classNames }: MetaItemProps) => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(CopyStatus.Idle)

  const handleCopy = async (text: string) => {
    setCopyStatus(CopyStatus.Copying)
    try {
      const ok = await copyTextToClipboard(text)
      if (!ok) {
        toast.error('Copy thất bại. Vui lòng thử lại.')
        return
      }
      setCopyStatus(CopyStatus.Copied)
      window.setTimeout(() => setCopyStatus(CopyStatus.Idle), 1500)
    } finally {
      setCopyStatus(s => (s === CopyStatus.Copying ? CopyStatus.Idle : s))
    }
  }

  const actionButton = () => {
    if (icon?.type === 'copy') {
      const tooltipLabel =
        copyStatus === CopyStatus.Copied
          ? `Đã copy ${label}`
          : copyStatus === CopyStatus.Copying
            ? `Đang copy ${label}`
            : `Copy ${label}`

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  'size-4 p-0 text-muted-foreground hover:bg-transparent hover:text-foreground',
                  classNames?.label?.icon,
                )}
                onClick={() => icon.value && handleCopy(icon.value)}
                disabled={!icon.value}
                aria-label={tooltipLabel}
              >
                {copyStatus === CopyStatus.Copying ? (
                  <Loader2 className="size-full animate-spin" />
                ) : copyStatus === CopyStatus.Copied ? (
                  <CheckIcon className="size-full" />
                ) : (
                  <CopyIcon className="size-full" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{tooltipLabel}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    if (icon?.type === 'link') {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  'size-4 p-0 text-muted-foreground hover:bg-transparent hover:text-foreground',
                  classNames?.label?.icon,
                )}
                asChild
                aria-label={icon.tooltip}
              >
                <Link href={icon.href} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon className="size-full" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{icon.tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    return null
  }

  return (
    <div className={cn('flex cursor-default items-start gap-4', classNames?.root)}>
      <div className={cn('flex shrink-0 items-center gap-2', classNames?.label?.root)}>
        <span className={cn('text-muted-foreground capitalize', classNames?.label?.text)}>
          {label}
        </span>
        {actionButton()}
      </div>
      <div
        className={cn(
          'min-w-0 flex-1 text-right font-semibold whitespace-nowrap',
          classNames?.value,
        )}
      >
        {children}
      </div>
    </div>
  )
}
