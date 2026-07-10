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
  refreshUser: () => Promise<void>
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

  // Reemite o token com os papéis (roles) recalculados — necessário depois
  // de criar uma barbearia (RF031) ou virar profissional, já que o token
  // emitido no login carrega um retrato desatualizado dos papéis do
  // usuário. Um GET /users/me simples não resolveria isso: o token em si
  // (usado pelo middleware autorizar) continuaria antigo.
  async function refreshUser() {
    const { token, usuario } = await api.post<LoginResponse>('/auth/refresh-token')
    localStorage.setItem('token', token)
    setUser(usuario)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}
