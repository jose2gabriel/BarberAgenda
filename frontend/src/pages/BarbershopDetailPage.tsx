import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Store, Scissors, Check } from 'lucide-react'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { useAgendamento } from '../features/agendamento/model/useAgendamento'
import { useAuth } from '../features/auth/model/useAuth'
import { Button } from '../shared/ui/Button'
import { Avatar } from '../shared/ui/Avatar'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import type { BusinessHours } from '../entities/barbershop/types'

function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Aberto/fechado agora, comparando com o horário de funcionamento do dia
// da semana atual (hora local do navegador — mesma convenção usada pelo
// dono ao cadastrar o horário).
function estaAbertoAgora(horarios: BusinessHours[]): boolean {
  const agora = new Date()
  const horarioDeHoje = horarios.find((h) => h.dayOfWeek === agora.getDay())
  if (!horarioDeHoje) return false

  const horaAtual = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`
  return horaAtual >= horarioDeHoje.openTime.slice(0, 5) && horaAtual < horarioDeHoje.closeTime.slice(0, 5)
}

export function BarbershopDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    barbearia,
    profissionais,
    servicos,
    horarios,
    loading,
    error,
    buscarBarbearia,
    listarProfissionais,
    listarServicos,
    listarHorarios,
  } = useBarbeiro()
  const { buscarMeuProfissional } = useAgendamento()
  const { user } = useAuth()
  const [professionalId, setProfessionalId] = useState<string | null>(null)
  const [serviceId, setServiceId] = useState<string | null>(null)
  const [meuProfissionalId, setMeuProfissionalId] = useState<string | null>(null)
  const ehProfissional = !!user?.roles.includes('profissional')

  useEffect(() => {
    if (!id) return
    buscarBarbearia(id)
    listarProfissionais(id)
    listarServicos(id)
    listarHorarios(id)
  }, [id, buscarBarbearia, listarProfissionais, listarServicos, listarHorarios])

  useEffect(() => {
    if (!id || !ehProfissional) return
    buscarMeuProfissional().then((meuProfissional) => {
      if (meuProfissional?.barbershopId === id) {
        setMeuProfissionalId(meuProfissional.id)
      }
    })
  }, [id, ehProfissional, buscarMeuProfissional])

  // Barbeiro não pode agendar um horário com ele mesmo (regra de negócio,
  // validada de verdade no backend — isso aqui só evita a seleção inútil).
  const profissionaisSelecionaveis = profissionais.filter((p) => p.id !== meuProfissionalId)

  function handleContinuar() {
    navigate(`/appointments/new?barbershopId=${id}&professionalId=${professionalId}&serviceId=${serviceId}`)
  }

  const profissionalSelecionado = profissionais.find((p) => p.id === professionalId)
  const servicoSelecionado = servicos.find((s) => s.id === serviceId)
  const temSelecao = !!professionalId || !!serviceId

  return (
    <div className="min-h-screen bg-primary">
      <main className={`max-w-6xl mx-auto px-6 py-12 ${temSelecao ? 'pb-32' : ''}`}>
        <Link to="/barbershops" className="text-accent text-sm font-medium hover:underline">
          ← Voltar para barbearias
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

        {barbearia && (
          <>
            <div className="mt-4 mb-10 flex items-center gap-4 bg-dark rounded-2xl px-6 py-6">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shrink-0">
                <Store size={24} strokeWidth={1.75} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-white">{barbearia.name}</h1>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      estaAbertoAgora(horarios)
                        ? 'bg-success/15 text-success border border-success/30'
                        : 'bg-white/10 text-white/60 border border-white/20'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${estaAbertoAgora(horarios) ? 'bg-success' : 'bg-white/40'}`}
                    />
                    {estaAbertoAgora(horarios) ? 'Aberto agora' : 'Fechado agora'}
                  </span>
                </div>
                <p className="text-white/70 text-sm">{barbearia.address}</p>
                <p className="text-white/70 text-sm">{barbearia.phone}</p>
              </div>
            </div>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Profissionais disponíveis</h2>
              {profissionaisSelecionaveis.length === 0 ? (
                <p className="text-text-secondary text-sm">Nenhum profissional cadastrado ainda.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {profissionaisSelecionaveis.map((profissional) => {
                    const selecionado = professionalId === profissional.id
                    return (
                      <button
                        key={profissional.id}
                        type="button"
                        onClick={() => setProfessionalId(profissional.id)}
                        className="text-left"
                      >
                        <div
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                            selecionado
                              ? 'border-selected bg-selected/5'
                              : 'border-border bg-secondary hover:border-selected/40'
                          }`}
                        >
                          <Avatar name={profissional.name} size="md" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-text-primary truncate">{profissional.name}</p>
                            {profissional.specialty && (
                              <p className="text-text-secondary text-sm truncate">{profissional.specialty}</p>
                            )}
                          </div>
                          <span
                            className={`shrink-0 flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full whitespace-nowrap ${
                              selecionado ? 'bg-selected text-white' : 'border border-border text-text-secondary'
                            }`}
                          >
                            {selecionado && <Check size={14} strokeWidth={2.5} />}
                            {selecionado ? 'Selecionado' : 'Selecionar'}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">Serviços</h2>
              {servicos.length === 0 ? (
                <p className="text-text-secondary text-sm">Nenhum serviço cadastrado ainda.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {servicos.map((servico) => {
                    const selecionado = serviceId === servico.id
                    return (
                      <button key={servico.id} type="button" onClick={() => setServiceId(servico.id)} className="text-left h-full">
                        <div
                          className={`flex flex-col gap-3 p-5 h-full rounded-xl border-2 transition-colors ${
                            selecionado
                              ? 'border-selected bg-selected/5'
                              : 'border-border bg-secondary hover:border-selected/40'
                          }`}
                        >
                          <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                            <Scissors size={20} strokeWidth={1.75} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-text-primary">{servico.name}</p>
                            {servico.description && (
                              <p className="text-text-secondary text-sm mt-1">{servico.description}</p>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-text-secondary">{servico.durationMinutes} min</span>
                            <span className="font-bold text-accent">{formatPrice(servico.price)}</span>
                          </div>
                          <span
                            className={`flex items-center justify-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full ${
                              selecionado ? 'bg-selected text-white' : 'border border-border text-text-secondary'
                            }`}
                          >
                            {selecionado && <Check size={14} strokeWidth={2.5} />}
                            {selecionado ? 'Selecionado' : 'Selecionar'}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {barbearia && temSelecao && (
        <div className="fixed bottom-0 left-0 right-0 md:left-60 bg-dark border-t border-white/10 px-6 py-4 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="text-white text-sm flex flex-wrap gap-x-6 gap-y-1">
              {profissionalSelecionado && (
                <span>
                  Profissional: <strong>{profissionalSelecionado.name}</strong>
                </span>
              )}
              {servicoSelecionado && (
                <span>
                  Serviço: <strong>{servicoSelecionado.name}</strong>{' '}
                  <span className="text-accent font-semibold">{formatPrice(servicoSelecionado.price)}</span>
                </span>
              )}
            </div>
            <Button disabled={!professionalId || !serviceId} onClick={handleContinuar}>
              Continuar para agendamento
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
