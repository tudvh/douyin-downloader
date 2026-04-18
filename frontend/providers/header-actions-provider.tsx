'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface HeaderActionsContextType {
  isActionsVisible: boolean
  setIsActionsVisible: (visible: boolean) => void
}

const HeaderActionsContext = createContext<HeaderActionsContextType>({
  isActionsVisible: true,
  setIsActionsVisible: () => {},
})

export function HeaderActionsProvider({ children }: { children: ReactNode }) {
  const [isActionsVisible, setIsActionsVisible] = useState(true)

  return (
    <HeaderActionsContext.Provider value={{ isActionsVisible, setIsActionsVisible }}>
      {children}
    </HeaderActionsContext.Provider>
  )
}

export function useHeaderActions() {
  return useContext(HeaderActionsContext)
}
