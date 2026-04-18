import { useCallback, useState } from 'react'

export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const onOpenChange = useCallback((value: boolean) => setIsOpen(value), [])

  return {
    isOpen,
    onOpenChange,
    open,
    close,
  }
}
