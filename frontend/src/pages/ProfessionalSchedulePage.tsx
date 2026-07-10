import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useAgendamento } from '../features/agendamento/model/useAgendamento'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { Input } from '../shared/ui/Input'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { StatusBadge } from '../shared/ui/StatusBadge'

function hoje(): string {
  return new Date().toISOString().slice(0, 10)
}

export function ProfessionalSchedulePage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { agendaProfissional, loading, error, listarAgendaProfissional } = useAgendamento()
  const { servicos, listarServicos } = useBarbeiro()
  const [date, setDate] = useState(hoje())

  useEffect(() => {
    listarAgendaProfissional()
  }, [listarAgendaProfissional])

  const barbershopId = agendaProfissional[0]?.barbershopId

  useEffect(() => {
    if (barbershopId) listarServicos(barbershopId)
  }, [barbershopId, listarServicos])

  const nomeServico = useMemo(() => {
    const mapa = new Map(servicos.map((s) => [s.id, s.name]))
    return (serviceId: string) => mapa.get(serviceId) ?? 'Serviço'
  }, [servicos])

  const agendaDoDia = agendaProfissional.filter((a) => a.date === date)

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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Minha agenda</h1>

        <div className="max-w-xs mb-8">
          <Input label="Dia" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && !error && agendaDoDia.length === 0 && (
          <p className="text-text-secondary">Nenhum agendamento nesse dia.</p>
        )}

        <div className="flex flex-col gap-4">
          {agendaDoDia.map((agendamento) => (
            <Card key={agendamento.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">{nomeServico(agendamento.serviceId)}</p>
                <p className="text-text-secondary text-sm">
                  {agendamento.startTime.slice(0, 5)}–{agendamento.endTime.slice(0, 5)}
                </p>
              </div>
              <StatusBadge status={agendamento.status} />
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
