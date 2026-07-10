import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useAgendamento } from '../features/agendamento/model/useAgendamento'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { Input } from '../shared/ui/Input'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { StatusBadge } from '../shared/ui/StatusBadge'
import { Logo } from '../shared/ui/Logo'
import { ApiError } from '../shared/lib/api'
import type { Appointment } from '../entities/appointment/types'

export function AppointmentsPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { agendamentos, loading, error, listarMeusAgendamentos, cancelarAgendamento, reagendarAgendamento } =
    useAgendamento()
  const [reagendandoId, setReagendandoId] = useState<string | null>(null)
  const [novaData, setNovaData] = useState('')
  const [novoHorario, setNovoHorario] = useState('')
  const [acaoErro, setAcaoErro] = useState<string | null>(null)

  useEffect(() => {
    listarMeusAgendamentos()
  }, [listarMeusAgendamentos])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  async function handleCancelar(agendamento: Appointment) {
    const confirmado = window.confirm(
      `Cancelar o agendamento de ${agendamento.service.name} em ${agendamento.date}?`
    )
    if (!confirmado) return

    setAcaoErro(null)
    try {
      await cancelarAgendamento(agendamento.id)
      await listarMeusAgendamentos()
    } catch (err) {
      setAcaoErro(err instanceof ApiError ? err.message : 'Não foi possível cancelar. Tente novamente.')
    }
  }

  function iniciarReagendamento(agendamento: Appointment) {
    setReagendandoId(agendamento.id)
    setNovaData(agendamento.date)
    setNovoHorario(agendamento.startTime)
    setAcaoErro(null)
  }

  async function handleReagendar(id: string) {
    setAcaoErro(null)
    try {
      await reagendarAgendamento(id, { date: novaData, time: novoHorario })
      setReagendandoId(null)
      await listarMeusAgendamentos()
    } catch (err) {
      setAcaoErro(err instanceof ApiError ? err.message : 'Não foi possível reagendar. Tente novamente.')
    }
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
        <h1 className="text-3xl font-bold text-text-primary mb-8">Meus agendamentos</h1>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {acaoErro && (
          <div className="mb-4">
            <ErrorMessage>{acaoErro}</ErrorMessage>
          </div>
        )}

        {!loading && !error && agendamentos.length === 0 && (
          <p className="text-text-secondary">Nenhum agendamento ainda.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agendamentos.map((agendamento) => (
            <Card key={agendamento.id}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-text-primary">{agendamento.service.name}</p>
                <StatusBadge status={agendamento.status} />
              </div>
              <p className="text-text-secondary text-sm">Profissional: {agendamento.professional.name}</p>
              <p className="text-text-secondary text-sm mb-4">
                {agendamento.date} · {agendamento.startTime}–{agendamento.endTime}
              </p>

              {agendamento.status === 'agendado' && reagendandoId === agendamento.id && (
                <div className="flex flex-col gap-3 mb-4">
                  <Input label="Nova data" type="date" value={novaData} onChange={(e) => setNovaData(e.target.value)} />
                  <Input
                    label="Novo horário"
                    type="time"
                    value={novoHorario}
                    onChange={(e) => setNovoHorario(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleReagendar(agendamento.id)}>
                      Salvar
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setReagendandoId(null)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              {agendamento.status === 'agendado' && reagendandoId !== agendamento.id && (
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => iniciarReagendamento(agendamento)}>
                    Reagendar
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleCancelar(agendamento)}>
                    Cancelar
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
