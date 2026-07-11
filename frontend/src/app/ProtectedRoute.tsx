import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../features/auth/model/useAuth'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import type { Role } from '../entities/usuario/types'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: Role[]
}

/**
 * RF017 (frontend) — protege rotas privadas e, opcionalmente, restringe
 * por perfil (cliente | profissional | owner), espelhando a autorização
 * já aplicada no backend (autorizar() em shared/middlewares/autenticar.ts).
 */
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && user && !allowedRoles.some((role) => user.roles.includes(role))) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
