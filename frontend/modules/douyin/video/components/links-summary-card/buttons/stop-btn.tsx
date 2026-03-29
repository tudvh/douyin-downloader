import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  onClick: () => void
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  label?: string
}

export function StopBtn({
  onClick,
  className = 'w-full',
  variant = 'outline',
  label = 'Dừng',
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} onClick={onClick} className={className}>
          {label}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Dừng tiến trình phân tích hiện tại</TooltipContent>
    </Tooltip>
  )
}
