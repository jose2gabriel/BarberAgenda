import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { CreateProfessionalForm } from '../features/professional/ui/CreateProfessionalForm'
import { EditProfessionalForm } from '../features/professional/ui/EditProfessionalForm'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { Avatar } from '../shared/ui/Avatar'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import type { Professional } from '../entities/professional/types'

export function OwnerProfessionalsPage() {
  const { id } = useParams<{ id: string }>()
  const barbershopId = id as string
  const { user, refreshUser } = useAuth()
  const {
    barbearia,
    profissionais,
    loading,
    error,
    buscarBarbearia,
    listarProfissionais,
    criarProfissional,
    atualizarProfissional,
    removerProfissional,
    tornarSeProfissional,
  } = useBarbeiro()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)

  useEffect(() => {
    buscarBarbearia(barbershopId)
    listarProfissionais(barbershopId)
  }, [barbershopId, buscarBarbearia, listarProfissionais])

  async function handleRemover(profissional: Professional) {
    const confirmado = window.confirm(`Remover ${profissional.name} desta barbearia?`)
    if (!confirmado) return

    await removerProfissional(barbershopId, profissional.id)
    await listarProfissionais(barbershopId)
  }

  async function handleTornarSeProfissional() {
    await tornarSeProfissional(barbershopId, {})
    await refreshUser()
    await listarProfissionais(barbershopId)
  }

  const ehDono = !!barbearia && !!user && barbearia.ownerId === user.id
  const jaEhProfissional = !!user?.roles.includes('profissional')

  return (
    <div className="min-h-screen bg-primary">
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
              <h1 className="text-3xl font-bold text-text-primary">Profissionais</h1>
              <div className="flex gap-2">
                {!jaEhProfissional && (
                  <Button variant="secondary" size="sm" onClick={handleTornarSeProfissional}>
                    Também sou profissional aqui
                  </Button>
                )}
                {!mostrarFormulario && (
                  <Button size="sm" onClick={() => setMostrarFormulario(true)}>
                    + Adicionar profissional
                  </Button>
                )}
              </div>
            </div>

            {mostrarFormulario && (
              <Card className="max-w-sm mb-10">
                <h2 className="font-semibold text-text-primary mb-4">Novo profissional</h2>
                <CreateProfessionalForm
                  onCreate={(dados) => criarProfissional(barbershopId, dados)}
                  onSuccess={() => {
                    setMostrarFormulario(false)
                    listarProfissionais(barbershopId)
                  }}
                />
              </Card>
            )}

            {profissionais.length === 0 && !mostrarFormulario && (
              <p className="text-text-secondary">Nenhum profissional cadastrado ainda.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profissionais.map((profissional) => (
                <Card key={profissional.id}>
                  {editandoId === profissional.id ? (
                    <EditProfessionalForm
                      professional={profissional}
                      onUpdate={(dados) => atualizarProfissional(barbershopId, profissional.id, dados)}
                      onSuccess={() => {
                        setEditandoId(null)
                        listarProfissionais(barbershopId)
                      }}
                      onCancel={() => setEditandoId(null)}
                    />
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar name={profissional.name} />
                        <div>
                          <p className="font-medium text-text-primary">{profissional.name}</p>
                          {profissional.specialty && (
                            <p className="text-text-secondary text-sm">{profissional.specialty}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => setEditandoId(profissional.id)}>
                          Editar
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleRemover(profissional)}>
                          Remover
                        </Button>
                      </div>
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
