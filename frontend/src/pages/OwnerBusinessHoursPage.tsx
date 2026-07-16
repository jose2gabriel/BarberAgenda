import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { useActiveBarbershop } from '../features/barbershop/model/ActiveBarbershopContext'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { Input } from '../shared/ui/Input'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { ApiError } from '../shared/lib/api'

// Segunda a sexta vira um único grupo — o horário definido se repete
// automaticamente nos 5 dias, já que a imensa maioria das barbearias
// funciona igual de segunda a sexta. Sábado e domingo continuam à parte
// porque costumam ter horário diferente (ou fechado, no caso de domingo).
const GRUPOS: { chave: string; label: string; dias: number[] }[] = [
  { chave: 'seg-sex', label: 'Segunda a sexta', dias: [1, 2, 3, 4, 5] },
  { chave: 'sabado', label: 'Sábado', dias: [6] },
  { chave: 'domingo', label: 'Domingo', dias: [0] },
]

export function OwnerBusinessHoursPage() {
  const { id } = useParams<{ id: string }>()
  const barbershopId = id as string
  const { user } = useAuth()
  const { barbearia, horarios, loading, error, buscarBarbearia, listarHorarios, salvarHorario } = useBarbeiro()
  const { selecionarBarbearia } = useActiveBarbershop()

  const [valores, setValores] = useState<Record<string, { openTime: string; closeTime: string }>>({})
  const [salvandoGrupo, setSalvandoGrupo] = useState<string | null>(null)
  const [grupoError, setGrupoError] = useState<Record<string, string>>({})

  useEffect(() => {
    buscarBarbearia(barbershopId)
    listarHorarios(barbershopId)
    selecionarBarbearia(barbershopId)
  }, [barbershopId, buscarBarbearia, listarHorarios, selecionarBarbearia])

  useEffect(() => {
    const porDia: Record<number, { openTime: string; closeTime: string }> = {}
    for (const horario of horarios) {
      porDia[horario.dayOfWeek] = { openTime: horario.openTime.slice(0, 5), closeTime: horario.closeTime.slice(0, 5) }
    }
    // Representa o grupo pelo horário do primeiro dia (ex.: segunda, pro grupo seg-sex)
    const iniciais: Record<string, { openTime: string; closeTime: string }> = {}
    for (const grupo of GRUPOS) {
      const doPrimeiroDia = porDia[grupo.dias[0]]
      if (doPrimeiroDia) iniciais[grupo.chave] = doPrimeiroDia
    }
    setValores((atual) => ({ ...iniciais, ...atual }))
  }, [horarios])

  function handleChange(chave: string, campo: 'openTime' | 'closeTime', valor: string) {
    setValores((atual) => ({
      ...atual,
      [chave]: { ...atual[chave], [campo]: valor },
    }))
  }

  async function handleSalvar(grupo: (typeof GRUPOS)[number]) {
    const valor = valores[grupo.chave]
    if (!valor?.openTime || !valor?.closeTime) return

    setSalvandoGrupo(grupo.chave)
    setGrupoError((atual) => ({ ...atual, [grupo.chave]: '' }))
    try {
      await Promise.all(
        grupo.dias.map((dayOfWeek) =>
          salvarHorario(barbershopId, { dayOfWeek, openTime: valor.openTime, closeTime: valor.closeTime })
        )
      )
      await listarHorarios(barbershopId)
    } catch (err) {
      setGrupoError((atual) => ({
        ...atual,
        [grupo.chave]: err instanceof ApiError ? err.message : 'Não foi possível salvar. Tente novamente.',
      }))
    } finally {
      setSalvandoGrupo(null)
    }
  }

  const ehDono = !!barbearia && !!user && barbearia.ownerId === user.id

  return (
    <div className="min-h-screen bg-primary">
      <main className="max-w-2xl mx-auto px-6 py-12">
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
            <h1 className="text-3xl font-bold text-text-primary mt-4 mb-2">Horário de funcionamento</h1>
            <p className="text-text-secondary text-sm mb-8">
              Defina o horário de abertura e fechamento. Segunda a sexta usa sempre o mesmo horário
              — sábado e domingo ficam à parte. Dias sem horário definido ficam fechados para agendamento.
            </p>

            <div className="flex flex-col gap-4">
              {GRUPOS.map((grupo) => (
                <Card key={grupo.chave} className="flex items-center gap-4">
                  <span className="w-32 font-medium text-text-primary">{grupo.label}</span>
                  <Input
                    label="Abre"
                    type="time"
                    value={valores[grupo.chave]?.openTime ?? ''}
                    onChange={(e) => handleChange(grupo.chave, 'openTime', e.target.value)}
                  />
                  <Input
                    label="Fecha"
                    type="time"
                    value={valores[grupo.chave]?.closeTime ?? ''}
                    onChange={(e) => handleChange(grupo.chave, 'closeTime', e.target.value)}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    loading={salvandoGrupo === grupo.chave}
                    disabled={!valores[grupo.chave]?.openTime || !valores[grupo.chave]?.closeTime}
                    onClick={() => handleSalvar(grupo)}
                  >
                    Salvar
                  </Button>
                  {grupoError[grupo.chave] && <ErrorMessage>{grupoError[grupo.chave]}</ErrorMessage>}
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
