import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { EditBarbershopForm } from '../features/barbershop/ui/EditBarbershopForm'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'

/**
 * Hub de gerenciamento da barbearia: editar dados próprios e navegar
 * para profissionais/serviços. A checagem de dono aqui é só defesa em
 * profundidade — o backend já recusa a atualização (PATCH) se quem
 * pedir não for o owner; GET /barbershops/:id é aberto a qualquer
 * autenticado, então sem essa checagem um não-dono veria o formulário.
 */
export function OwnerBarbershopDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { barbearia, loading, error, buscarBarbearia, atualizarBarbearia } = useBarbeiro()

  useEffect(() => {
    if (id) buscarBarbearia(id)
  }, [id, buscarBarbearia])

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

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link to="/owner/barbershops" className="text-accent text-sm font-medium hover:underline">
          ← Voltar para minhas barbearias
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
            <h1 className="text-3xl font-bold text-text-primary mt-4 mb-8">{barbearia.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <h2 className="font-semibold text-text-primary mb-4">Editar dados</h2>
                <EditBarbershopForm
                  barbershop={barbearia}
                  onUpdate={(dados) => atualizarBarbearia(barbearia.id, dados)}
                />
              </Card>

              <div className="flex flex-col gap-4">
                <Link to={`/owner/barbershops/${barbearia.id}/professionals`}>
                  <Button variant="secondary" className="w-full justify-center">
                    Gerenciar profissionais
                  </Button>
                </Link>
                <Link to={`/owner/barbershops/${barbearia.id}/services`}>
                  <Button variant="secondary" className="w-full justify-center">
                    Gerenciar serviços
                  </Button>
                </Link>
                <Link to={`/owner/barbershops/${barbearia.id}/hours`}>
                  <Button variant="secondary" className="w-full justify-center">
                    Horário de funcionamento
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
