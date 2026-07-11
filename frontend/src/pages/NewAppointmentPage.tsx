import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { useAgendamento } from '../features/agendamento/model/useAgendamento'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { Input } from '../shared/ui/Input'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { SuccessMessage } from '../shared/ui/SuccessMessage'
import { ApiError } from '../shared/lib/api'

function hoje(): string {
  return new Date().toISOString().slice(0, 10)
}

function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

interface ResumoLinhaProps {
  icon: string
  label: string
  value: string
}

function ResumoLinha({ icon, label, value }: ResumoLinhaProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center text-base shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-text-secondary text-xs">{label}</p>
        <p className="font-medium text-text-primary truncate">{value}</p>
      </div>
    </div>
  )
}

export function NewAppointmentPage() {
  const [searchParams] = useSearchParams()
  const barbershopId = searchParams.get('barbershopId')
  const professionalId = searchParams.get('professionalId')
  const serviceId = searchParams.get('serviceId')

  const navigate = useNavigate()
  const { barbearia, profissionais, servicos, buscarBarbearia, listarProfissionais, listarServicos } = useBarbeiro()
  const {
    horariosDisponiveis,
    loading,
    error,
    buscarHorariosDisponiveis,
    criarAgendamento,
  } = useAgendamento()

  const [date, setDate] = useState(hoje())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [confirmError, setConfirmError] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState(false)
  const [confirmando, setConfirmando] = useState(false)

  const dadosCompletos = !!barbershopId && !!professionalId && !!serviceId

  useEffect(() => {
    if (!barbershopId) return
    buscarBarbearia(barbershopId)
    listarProfissionais(barbershopId)
    listarServicos(barbershopId)
  }, [barbershopId, buscarBarbearia, listarProfissionais, listarServicos])

  useEffect(() => {
    if (!dadosCompletos) return
    setSelectedTime(null)
    buscarHorariosDisponiveis(barbershopId!, professionalId!, date, serviceId!)
  }, [dadosCompletos, barbershopId, professionalId, serviceId, date, buscarHorariosDisponiveis])

  async function handleConfirmar() {
    if (!selectedTime) return
    setConfirmando(true)
    setConfirmError(null)
    try {
      await criarAgendamento({ professionalId: professionalId!, serviceId: serviceId!, date, time: selectedTime })
      setSucesso(true)
      setTimeout(() => navigate('/appointments'), 1500)
    } catch (err) {
      setConfirmError(err instanceof ApiError ? err.message : 'Não foi possível agendar. Tente novamente.')
    } finally {
      setConfirmando(false)
    }
  }

  const profissional = profissionais.find((p) => p.id === professionalId)
  const servico = servicos.find((s) => s.id === serviceId)

  return (
    <div className="min-h-screen bg-primary">
      <main className="max-w-2xl mx-auto px-6 py-12">
        <Link
          to={barbershopId ? `/barbershops/${barbershopId}` : '/barbershops'}
          className="text-accent text-sm font-medium hover:underline"
        >
          ← Voltar
        </Link>

        <h1 className="text-3xl font-bold text-text-primary mt-4 mb-8">Novo agendamento</h1>

        {!dadosCompletos && (
          <ErrorMessage>
            Escolha um profissional e um serviço na página da barbearia antes de agendar.
          </ErrorMessage>
        )}

        {dadosCompletos && (
          <Card className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <ResumoLinha icon="💈" label="Barbearia" value={barbearia?.name ?? '...'} />
              <ResumoLinha icon="🧔" label="Profissional" value={profissional?.name ?? '...'} />
              <ResumoLinha
                icon="✂️"
                label="Serviço"
                value={servico ? `${servico.name} · ${servico.durationMinutes} min` : '...'}
              />
            </div>

            {servico && (
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-text-secondary text-sm">Total</span>
                <span className="text-xl font-bold text-accent">{formatPrice(servico.price)}</span>
              </div>
            )}

            <Input
              label="Data"
              type="date"
              min={hoje()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {loading && (
              <div className="flex justify-center py-4">
                <LoadingSpinner size="md" />
              </div>
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {!loading && !error && (
              <div>
                <p className="text-text-secondary text-sm mb-2">Horários disponíveis</p>
                {horariosDisponiveis.length === 0 ? (
                  <p className="text-text-secondary text-sm">Nenhum horário disponível nesse dia.</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {horariosDisponiveis.map((horario) => (
                      <button
                        key={horario}
                        type="button"
                        onClick={() => setSelectedTime(horario)}
                        className={`text-sm font-semibold py-2 rounded-full transition-colors ${
                          selectedTime === horario
                            ? 'bg-accent text-white'
                            : 'border border-accent text-accent hover:bg-accent/10'
                        }`}
                      >
                        {horario}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {confirmError && <ErrorMessage>{confirmError}</ErrorMessage>}
            {sucesso && <SuccessMessage>Agendamento confirmado! Redirecionando...</SuccessMessage>}

            <Button
              disabled={!selectedTime || sucesso}
              loading={confirmando}
              onClick={handleConfirmar}
              className="w-full justify-center"
            >
              Confirmar agendamento
            </Button>
          </Card>
        )}
      </main>
    </div>
  )
}
