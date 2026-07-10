import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { Input } from '../shared/ui/Input'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { ApiError } from '../shared/lib/api'

const DIAS_DA_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function OwnerBusinessHoursPage() {
  const { id } = useParams<{ id: string }>()
  const barbershopId = id as string
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { barbearia, horarios, loading, error, buscarBarbearia, listarHorarios, salvarHorario } = useBarbeiro()

  const [valores, setValores] = useState<Record<number, { openTime: string; closeTime: string }>>({})
  const [salvandoDia, setSalvandoDia] = useState<number | null>(null)
  const [dayError, setDayError] = useState<Record<number, string>>({})

  useEffect(() => {
    buscarBarbearia(barbershopId)
    listarHorarios(barbershopId)
  }, [barbershopId, buscarBarbearia, listarHorarios])

  useEffect(() => {
    const iniciais: Record<number, { openTime: string; closeTime: string }> = {}
    for (const horario of horarios) {
      iniciais[horario.dayOfWeek] = { openTime: horario.openTime.slice(0, 5), closeTime: horario.closeTime.slice(0, 5) }
    }
    setValores((atual) => ({ ...iniciais, ...atual }))
  }, [horarios])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  function handleChange(dayOfWeek: number, campo: 'openTime' | 'closeTime', valor: string) {
    setValores((atual) => ({
      ...atual,
      [dayOfWeek]: { ...atual[dayOfWeek], [campo]: valor },
    }))
  }

  async function handleSalvar(dayOfWeek: number) {
    const valor = valores[dayOfWeek]
    if (!valor?.openTime || !valor?.closeTime) return

    setSalvandoDia(dayOfWeek)
    setDayError((atual) => ({ ...atual, [dayOfWeek]: '' }))
    try {
      await salvarHorario(barbershopId, { dayOfWeek, openTime: valor.openTime, closeTime: valor.closeTime })
      await listarHorarios(barbershopId)
    } catch (err) {
      setDayError((atual) => ({
        ...atual,
        [dayOfWeek]: err instanceof ApiError ? err.message : 'Não foi possível salvar. Tente novamente.',
      }))
    } finally {
      setSalvandoDia(null)
    }
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
              Defina o horário de abertura e fechamento por dia da semana. Dias sem horário definido ficam fechados
              para agendamento.
            </p>

            <div className="flex flex-col gap-4">
              {DIAS_DA_SEMANA.map((nome, dayOfWeek) => (
                <Card key={dayOfWeek} className="flex items-center gap-4">
                  <span className="w-24 font-medium text-text-primary">{nome}</span>
                  <Input
                    label="Abre"
                    type="time"
                    value={valores[dayOfWeek]?.openTime ?? ''}
                    onChange={(e) => handleChange(dayOfWeek, 'openTime', e.target.value)}
                  />
                  <Input
                    label="Fecha"
                    type="time"
                    value={valores[dayOfWeek]?.closeTime ?? ''}
                    onChange={(e) => handleChange(dayOfWeek, 'closeTime', e.target.value)}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    loading={salvandoDia === dayOfWeek}
                    disabled={!valores[dayOfWeek]?.openTime || !valores[dayOfWeek]?.closeTime}
                    onClick={() => handleSalvar(dayOfWeek)}
                  >
                    Salvar
                  </Button>
                  {dayError[dayOfWeek] && <ErrorMessage>{dayError[dayOfWeek]}</ErrorMessage>}
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
