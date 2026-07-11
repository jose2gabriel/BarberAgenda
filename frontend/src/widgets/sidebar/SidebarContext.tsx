import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'sidebarCollapsed'

interface SidebarContextValue {
  collapsed: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(STORAGE_KEY) === 'true')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed))
  }, [collapsed])

  function toggle() {
    setCollapsed((atual) => !atual)
  }

  return <SidebarContext.Provider value={{ collapsed, toggle }}>{children}</SidebarContext.Provider>
}

export function useSidebarState() {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error('useSidebarState deve ser usado dentro de um SidebarProvider.')
  }
  return ctx
}
