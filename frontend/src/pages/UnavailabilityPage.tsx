import { useEffect, useState } from 'react'
import { useAgendamento } from '../features/agendamento/model/useAgendamento'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { Input } from '../shared/ui/Input'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { ApiError } from '../shared/lib/api'

const DIAS_DA_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function UnavailabilityPage() {
  const {
    indisponibilidadesRecorrentes,
    meuProfissional,
    loading,
    error,
    buscarMeuProfissional,
    listarIndisponibilidadesRecorrentes,
    criarIndisponibilidadeRecorrente,
    removerIndisponibilidadeRecorrente,
  } = useAgendamento()

  const [diasSelecionados, setDiasSelecionados] = useState<Set<number>>(new Set())
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [reason, setReason] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    buscarMeuProfissional().then((profissional) => {
      if (profissional) listarIndisponibilidadesRecorrentes(profissional.barbershopId, profissional.id)
    })
  }, [buscarMeuProfissional, listarIndisponibilidadesRecorrentes])

  function toggleDia(dayOfWeek: number) {
    setDiasSelecionados((atual) => {
      const novo = new Set(atual)
      if (novo.has(dayOfWeek)) novo.delete(dayOfWeek)
      else novo.add(dayOfWeek)
      return novo
    })
  }

  async function handleRegistrar() {
    if (!meuProfissional || diasSelecionados.size === 0) return
    setFormError(null)
    setSalvando(true)
    try {
      await Promise.all(
        Array.from(diasSelecionados).map((dayOfWeek) =>
          criarIndisponibilidadeRecorrente(meuProfissional.barbershopId, meuProfissional.id, {
            dayOfWeek,
            startTime,
            endTime,
            reason: reason || undefined,
          })
        )
      )
      setDiasSelecionados(new Set())
      setStartTime('')
      setEndTime('')
      setReason('')
      await listarIndisponibilidadesRecorrentes(meuProfissional.barbershopId, meuProfissional.id)
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

    await removerIndisponibilidadeRecorrente(meuProfissional.barbershopId, meuProfissional.id, id)
    await listarIndisponibilidadesRecorrentes(meuProfissional.barbershopId, meuProfissional.id)
  }

  return (
    <div className="min-h-screen bg-primary">
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Minha indisponibilidade</h1>
        <p className="text-text-secondary text-sm mb-8">
          Marque os dias da semana em que você nunca atende nesse horário — isso se repete toda semana,
          sem precisar registrar de novo.
        </p>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {meuProfissional && (
          <>
            <Card className="flex flex-col gap-4 mb-10">
              <h2 className="font-semibold text-text-primary">Registrar indisponibilidade recorrente</h2>

              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">Dias da semana</p>
                <div className="flex flex-wrap gap-2">
                  {DIAS_DA_SEMANA.map((nome, dayOfWeek) => {
                    const selecionado = diasSelecionados.has(dayOfWeek)
                    return (
                      <button
                        key={dayOfWeek}
                        type="button"
                        onClick={() => toggleDia(dayOfWeek)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                          selecionado
                            ? 'bg-selected text-white border-selected'
                            : 'border-border text-text-secondary hover:border-selected/40'
                        }`}
                      >
                        {nome}
                      </button>
                    )
                  })}
                </div>
              </div>

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
                disabled={diasSelecionados.size === 0 || !startTime || !endTime}
                loading={salvando}
                onClick={handleRegistrar}
                className="w-full justify-center"
              >
                Registrar nos dias marcados
              </Button>
            </Card>

            {indisponibilidadesRecorrentes.length === 0 ? (
              <p className="text-text-secondary">Nenhuma indisponibilidade recorrente registrada.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {indisponibilidadesRecorrentes.map((indisponibilidade) => (
                  <Card key={indisponibilidade.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">
                        {DIAS_DA_SEMANA[indisponibilidade.dayOfWeek]} · {indisponibilidade.startTime.slice(0, 5)}–
                        {indisponibilidade.endTime.slice(0, 5)}
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
