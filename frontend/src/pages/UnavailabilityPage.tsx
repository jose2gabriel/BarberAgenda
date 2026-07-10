import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { useAgendamento } from '../features/agendamento/model/useAgendamento'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { Input } from '../shared/ui/Input'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { Logo } from '../shared/ui/Logo'
import { ApiError } from '../shared/lib/api'

function hoje(): string {
  return new Date().toISOString().slice(0, 10)
}

export function UnavailabilityPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const {
    indisponibilidades,
    meuProfissional,
    loading,
    error,
    buscarMeuProfissional,
    listarIndisponibilidades,
    criarIndisponibilidade,
    removerIndisponibilidade,
  } = useAgendamento()

  const [date, setDate] = useState(hoje())
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [reason, setReason] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    buscarMeuProfissional().then((profissional) => {
      if (profissional) listarIndisponibilidades(profissional.barbershopId, profissional.id)
    })
  }, [buscarMeuProfissional, listarIndisponibilidades])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  async function handleRegistrar() {
    if (!meuProfissional) return
    setFormError(null)
    setSalvando(true)
    try {
      await criarIndisponibilidade(meuProfissional.barbershopId, meuProfissional.id, {
        startsAt: `${date}T${startTime}:00.000Z`,
        endsAt: `${date}T${endTime}:00.000Z`,
        reason: reason || undefined,
      })
      setStartTime('')
      setEndTime('')
      setReason('')
      await listarIndisponibilidades(meuProfissional.barbershopId, meuProfissional.id)
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Não foi possível registrar. Tente novamente.')
    } finally {
      setSalvando(false)
    }
  }

  async function handleRemover(id: string) {
    if (!meuProfissional) return
    const confirmado = window.confirm('Remover esta indisponibilidade?')
    if (!confirmado) return

    await removerIndisponibilidade(meuProfissional.barbershopId, meuProfissional.id, id)
    await listarIndisponibilidades(meuProfissional.barbershopId, meuProfissional.id)
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

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Minha indisponibilidade</h1>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {meuProfissional && (
          <>
            <Card className="flex flex-col gap-4 mb-10">
              <h2 className="font-semibold text-text-primary">Registrar nova indisponibilidade</h2>
              <Input label="Data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <div className="flex gap-4">
                <Input
                  label="Início"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <Input label="Fim" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
              <Input
                label="Motivo (opcional)"
                placeholder="Almoço, folga, etc."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              {formError && <ErrorMessage>{formError}</ErrorMessage>}

              <Button
                disabled={!startTime || !endTime}
                loading={salvando}
                onClick={handleRegistrar}
                className="w-full justify-center"
              >
                Registrar
              </Button>
            </Card>

            {indisponibilidades.length === 0 ? (
              <p className="text-text-secondary">Nenhuma indisponibilidade registrada.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {indisponibilidades.map((indisponibilidade) => (
                  <Card key={indisponibilidade.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">
                        {new Date(indisponibilidade.startsAt).toLocaleString('pt-BR')} —{' '}
                        {new Date(indisponibilidade.endsAt).toLocaleString('pt-BR')}
                      </p>
                      {indisponibilidade.reason && (
                        <p className="text-text-secondary text-sm">{indisponibilidade.reason}</p>
                      )}
                    </div>
                    <Button size="sm" variant="danger" onClick={() => handleRemover(indisponibilidade.id)}>
                      Remover
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
