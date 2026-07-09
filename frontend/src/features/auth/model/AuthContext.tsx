import { createContext, useEffect, useState, type ReactNode } from 'react'
import { api } from '../../../shared/lib/api'
import type { Usuario } from '../../../entities/usuario/types'

interface LoginResponse {
  token: string
  usuario: Usuario
}

export interface AuthContextValue {
  user: Usuario | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

/**
 * Guarda o usuário em Context (não em estado local do hook) para que login
 * feito em um componente (ex.: LoginForm) reflita em todos os outros
 * (Header, rotas protegidas) — um useState isolado por chamada de useAuth()
 * criaria uma cópia de estado por componente.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    api
      .get<{ usuario: Usuario }>('/users/me')
      .then(({ usuario }) => setUser(usuario))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false))
  }, [])

  async function login(email: string, password: string) {
    const { token, usuario } = await api.post<LoginResponse>('/auth/login', { email, password })
    localStorage.setItem('token', token)
    setUser(usuario)
  }

  async function logout() {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
