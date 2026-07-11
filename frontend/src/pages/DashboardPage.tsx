import { useAuth } from '../features/auth/model/useAuth'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Bem-vindo, {user?.name}</h1>
      <p className="text-text-secondary">Perfil: {user?.roles.join(', ')}</p>
    </main>
  )
}
