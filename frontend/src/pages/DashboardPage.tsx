import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'

export function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <Card className="w-full max-w-sm flex flex-col gap-6 text-center shadow-xl shadow-black/5">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Bem-vindo, {user?.name}</h1>
          <p className="text-text-secondary text-sm">Perfil: {user?.role}</p>
        </div>

        <Link to="/barbershops">
          <Button className="w-full justify-center">Ver barbearias</Button>
        </Link>

        {user?.role === 'owner' && (
          <Link to="/owner/barbershops">
            <Button variant="secondary" className="w-full justify-center">
              Gerenciar minhas barbearias
            </Button>
          </Link>
        )}

        <Button variant="secondary" onClick={handleLogout} className="w-full justify-center">
          Sair
        </Button>
      </Card>
    </div>
  )
}
