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

export function FetchAgainBtn({
  onClick,
  variant = 'secondary',
  className = 'w-full',
  label = 'Phân tích lại',
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
        <TooltipContent>Thực hiện phân tích lại toàn bộ từ đầu danh sách</TooltipContent>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Xác nhận phân tích lại?"
        description="Hành động này sẽ thực hiện phân tích lại toàn bộ danh sách. Bạn có chắc chắn muốn tiếp tục?"
        onConfirm={onClick}
      />
    </>
  )
}
