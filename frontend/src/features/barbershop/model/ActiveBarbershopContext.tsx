import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useAuth } from '../../auth/model/useAuth'

const STORAGE_KEY = 'activeBarbershopId'

interface ActiveBarbershopContextValue {
  activeBarbershopId: string | null
  selecionarBarbearia: (id: string) => void
}

const ActiveBarbershopContext = createContext<ActiveBarbershopContextValue | null>(null)

/**
 * Barbearia "ativa" do owner — enquanto ele não seleciona uma (clicando
 * numa barbearia em /owner/barbershops, ou entrando direto em uma
 * página de gerenciamento), a sidebar não mostra os atalhos de
 * Profissionais/Serviços/Horários dessa barbearia (ver Sidebar.tsx).
 * Persistida em localStorage só pra sobreviver a um reload de página;
 * limpa no logout pra não vazar entre contas no mesmo navegador.
 */
export function ActiveBarbershopProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [activeBarbershopId, setActiveBarbershopId] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY)
  )

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem(STORAGE_KEY)
      setActiveBarbershopId(null)
    }
  }, [isAuthenticated])

  function selecionarBarbearia(id: string) {
    localStorage.setItem(STORAGE_KEY, id)
    setActiveBarbershopId(id)
  }

  return (
    <ActiveBarbershopContext.Provider value={{ activeBarbershopId, selecionarBarbearia }}>
      {children}
    </ActiveBarbershopContext.Provider>
  )
}

export function useActiveBarbershop() {
  const ctx = useContext(ActiveBarbershopContext)
  if (!ctx) {
    throw new Error('useActiveBarbershop deve ser usado dentro de um ActiveBarbershopProvider.')
  }
  return ctx
}
