import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { useActiveBarbershop } from '../features/barbershop/model/ActiveBarbershopContext'
import { EditBarbershopForm } from '../features/barbershop/ui/EditBarbershopForm'
import { Card } from '../shared/ui/Card'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'

/**
 * Editar dados da barbearia. Navegar para profissionais/serviços/horários
 * agora é feito pela sidebar (atalhos da barbearia ativa), não mais por
 * botões nesta página. A checagem de dono aqui é só defesa em
 * profundidade — o backend já recusa a atualização (PATCH) se quem
 * pedir não for o owner; GET /barbershops/:id é aberto a qualquer
 * autenticado, então sem essa checagem um não-dono veria o formulário.
 */
export function OwnerBarbershopDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { barbearia, loading, error, buscarBarbearia, atualizarBarbearia } = useBarbeiro()
  const { selecionarBarbearia } = useActiveBarbershop()

  useEffect(() => {
    if (id) {
      buscarBarbearia(id)
      selecionarBarbearia(id)
    }
  }, [id, buscarBarbearia, selecionarBarbearia])

  const ehDono = !!barbearia && !!user && barbearia.ownerId === user.id

  return (
    <div className="min-h-screen bg-primary">
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

            <Card className="max-w-md">
              <h2 className="font-semibold text-text-primary mb-4">Editar dados</h2>
              <EditBarbershopForm
                barbershop={barbearia}
                onUpdate={(dados) => atualizarBarbearia(barbearia.id, dados)}
              />
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
