import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { Logo } from '../shared/ui/Logo'

export function BarbershopsPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { barbearias, loading, error, listarBarbearias } = useBarbeiro()

  useEffect(() => {
    listarBarbearias()
  }, [listarBarbearias])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-primary">
      <header className="bg-dark">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="font-bold text-lg text-white">Barber Agenda</span>
          </div>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/dashboard" className="text-accent text-sm font-medium hover:underline">
          ← Voltar para o painel
        </Link>

        <h1 className="text-3xl font-bold text-text-primary mt-4 mb-8">Barbearias</h1>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && !error && barbearias.length === 0 && (
          <p className="text-text-secondary">Nenhuma barbearia cadastrada ainda.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {barbearias.map((barbearia) => (
            <Link key={barbearia.id} to={`/barbershops/${barbearia.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <h2 className="font-semibold text-text-primary mb-1">{barbearia.name}</h2>
                <p className="text-text-secondary text-sm">{barbearia.address}</p>
                <p className="text-text-secondary text-sm">{barbearia.phone}</p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
