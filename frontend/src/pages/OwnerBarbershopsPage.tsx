import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { CreateBarbershopForm } from '../features/barbershop/ui/CreateBarbershopForm'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { Logo } from '../shared/ui/Logo'
import type { Barbershop } from '../entities/barbershop/types'

/**
 * Lista as barbearias do usuário autenticado (owner) e permite criar mais
 * uma. Não é restrita a role="owner" via ProtectedRoute — um cliente/
 * profissional pode chegar aqui e criar sua primeira barbearia (RF031),
 * virando owner nesse momento.
 */
export function OwnerBarbershopsPage() {
  const { user, refreshUser, logout } = useAuth()
  const navigate = useNavigate()
  const { barbearias, loading, error, listarBarbearias, criarBarbearia } = useBarbeiro()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  useEffect(() => {
    listarBarbearias()
  }, [listarBarbearias])

  const minhasBarbearias = barbearias.filter((b) => b.ownerId === user?.id)

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  async function handleBarbeariaCriada(barbershop: Barbershop) {
    await refreshUser()
    setMostrarFormulario(false)
    navigate(`/owner/barbershops/${barbershop.id}`)
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

        <div className="flex items-center justify-between mt-4 mb-8 gap-4 flex-wrap">
          <h1 className="text-3xl font-bold text-text-primary">Minhas barbearias</h1>
          {!mostrarFormulario && (
            <Button size="sm" onClick={() => setMostrarFormulario(true)}>
              + Nova barbearia
            </Button>
          )}
        </div>

        {mostrarFormulario && (
          <Card className="max-w-sm mb-10">
            <h2 className="font-semibold text-text-primary mb-4">Nova barbearia</h2>
            <CreateBarbershopForm onCreate={criarBarbearia} onSuccess={handleBarbeariaCriada} />
          </Card>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && !error && minhasBarbearias.length === 0 && !mostrarFormulario && (
          <p className="text-text-secondary">Você ainda não tem nenhuma barbearia. Crie a primeira acima.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {minhasBarbearias.map((barbearia) => (
            <Link key={barbearia.id} to={`/owner/barbershops/${barbearia.id}`}>
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
