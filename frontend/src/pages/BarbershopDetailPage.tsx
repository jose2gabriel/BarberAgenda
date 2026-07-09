import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { Avatar } from '../shared/ui/Avatar'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'

function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function BarbershopDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const {
    barbearia,
    profissionais,
    servicos,
    loading,
    error,
    buscarBarbearia,
    listarProfissionais,
    listarServicos,
  } = useBarbeiro()

  useEffect(() => {
    if (!id) return
    buscarBarbearia(id)
    listarProfissionais(id)
    listarServicos(id)
  }, [id, buscarBarbearia, listarProfissionais, listarServicos])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-primary">
      <header className="bg-dark">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-white font-bold">
              BA
            </div>
            <span className="font-bold text-lg text-white">Barber Agenda</span>
          </div>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/barbershops" className="text-accent text-sm font-medium hover:underline">
          ← Voltar para barbearias
        </Link>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <div className="mt-4">
            <ErrorMessage>{error}</ErrorMessage>
          </div>
        )}

        {barbearia && (
          <>
            <div className="mt-4 mb-10">
              <h1 className="text-3xl font-bold text-text-primary">{barbearia.name}</h1>
              <p className="text-text-secondary">{barbearia.address}</p>
              <p className="text-text-secondary">{barbearia.phone}</p>
            </div>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Profissionais</h2>
              {profissionais.length === 0 ? (
                <p className="text-text-secondary text-sm">Nenhum profissional cadastrado ainda.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {profissionais.map((profissional) => (
                    <Card key={profissional.id} className="flex items-center gap-3">
                      <Avatar name={profissional.name} />
                      <div>
                        <p className="font-medium text-text-primary">{profissional.name}</p>
                        {profissional.specialty && (
                          <p className="text-text-secondary text-sm">{profissional.specialty}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">Serviços</h2>
              {servicos.length === 0 ? (
                <p className="text-text-secondary text-sm">Nenhum serviço cadastrado ainda.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {servicos.map((servico) => (
                    <Card key={servico.id}>
                      <p className="font-medium text-text-primary">{servico.name}</p>
                      {servico.description && (
                        <p className="text-text-secondary text-sm mb-2">{servico.description}</p>
                      )}
                      <div className="flex items-center justify-between text-sm text-text-secondary">
                        <span>{servico.durationMinutes} min</span>
                        <span className="font-semibold text-accent">{formatPrice(servico.price)}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
