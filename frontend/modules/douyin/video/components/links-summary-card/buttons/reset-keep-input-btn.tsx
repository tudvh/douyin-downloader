import { useState } from 'react'

import { ConfirmModal } from '@/components/share'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  onClick: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  className?: string
  label?: string
}

export function ResetKeepInputBtn({
  onClick,
  variant = 'outline',
  className = 'w-full',
  label = 'Nhập lại',
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={variant} onClick={() => setIsOpen(true)} className={className}>
            {label}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Giữ nguyên link đã nhập và quay về ban đầu</TooltipContent>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Xác nhận nhập lại?"
        description="Hành động này sẽ xóa dữ liệu hiện tại nhưng giữ lại link đã nhập. Bạn có chắc chắn muốn tiếp tục?"
        onConfirm={onClick}
      />
    </>
  )
}
