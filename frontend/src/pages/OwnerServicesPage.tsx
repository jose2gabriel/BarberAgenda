import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { CreateServiceForm } from '../features/service/ui/CreateServiceForm'
import { EditServiceForm } from '../features/service/ui/EditServiceForm'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'

function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function OwnerServicesPage() {
  const { id } = useParams<{ id: string }>()
  const barbershopId = id as string
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const {
    barbearia,
    servicos,
    loading,
    error,
    buscarBarbearia,
    listarServicos,
    criarServico,
    atualizarServico,
  } = useBarbeiro()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)

  useEffect(() => {
    buscarBarbearia(barbershopId)
    listarServicos(barbershopId)
  }, [barbershopId, buscarBarbearia, listarServicos])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  const ehDono = !!barbearia && !!user && barbearia.ownerId === user.id

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
        <Link to={`/owner/barbershops/${barbershopId}`} className="text-accent text-sm font-medium hover:underline">
          ← Voltar para {barbearia?.name ?? 'a barbearia'}
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

        {barbearia && !ehDono && (
          <div className="mt-4">
            <ErrorMessage>Você não tem permissão para gerenciar esta barbearia.</ErrorMessage>
          </div>
        )}

        {barbearia && ehDono && (
          <>
            <div className="flex items-center justify-between mt-4 mb-8 gap-4 flex-wrap">
              <h1 className="text-3xl font-bold text-text-primary">Serviços</h1>
              {!mostrarFormulario && (
                <Button size="sm" onClick={() => setMostrarFormulario(true)}>
                  + Adicionar serviço
                </Button>
              )}
            </div>

            {mostrarFormulario && (
              <Card className="max-w-sm mb-10">
                <h2 className="font-semibold text-text-primary mb-4">Novo serviço</h2>
                <CreateServiceForm
                  onCreate={(dados) => criarServico(barbershopId, dados)}
                  onSuccess={() => {
                    setMostrarFormulario(false)
                    listarServicos(barbershopId)
                  }}
                />
              </Card>
            )}

            {servicos.length === 0 && !mostrarFormulario && (
              <p className="text-text-secondary">Nenhum serviço cadastrado ainda.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicos.map((servico) => (
                <Card key={servico.id}>
                  {editandoId === servico.id ? (
                    <EditServiceForm
                      service={servico}
                      onUpdate={(dados) => atualizarServico(barbershopId, servico.id, dados)}
                      onSuccess={() => {
                        setEditandoId(null)
                        listarServicos(barbershopId)
                      }}
                      onCancel={() => setEditandoId(null)}
                    />
                  ) : (
                    <>
                      <p className="font-medium text-text-primary">{servico.name}</p>
                      {servico.description && (
                        <p className="text-text-secondary text-sm mb-2">{servico.description}</p>
                      )}
                      <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                        <span>{servico.durationMinutes} min</span>
                        <span className="font-semibold text-accent">{formatPrice(servico.price)}</span>
                      </div>
                      <Button variant="secondary" size="sm" onClick={() => setEditandoId(servico.id)}>
                        Editar
                      </Button>
                    </>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
