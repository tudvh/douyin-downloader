import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  onClick: () => void
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  label?: string
}

export function ResumeBtn({
  onClick,
  className = 'w-full',
  variant = 'default',
  label = 'Tiếp tục',
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} onClick={onClick} className={className}>
          {label}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Tiếp tục phân tích các video còn lại</TooltipContent>
    </Tooltip>
  )
}
