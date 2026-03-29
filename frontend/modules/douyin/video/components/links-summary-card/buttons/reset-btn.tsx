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

export function ResetBtn({
  onClick,
  variant = 'outline',
  className = 'w-full',
  label = 'Đặt lại',
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
        <TooltipContent>Xóa toàn bộ dữ liệu và quay về ban đầu</TooltipContent>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Xác nhận đặt lại?"
        description="Hành động này sẽ xóa toàn bộ dữ liệu hiện tại và quay về màn hình nhập liệu. Bạn có chắc chắn muốn tiếp tục?"
        onConfirm={onClick}
      />
    </>
  )
}
