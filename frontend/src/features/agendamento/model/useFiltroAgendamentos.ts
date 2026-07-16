import { useMemo } from 'react'
import type { Appointment } from '../../../entities/appointment/types'
import type { FiltroAgendamentosValues } from '../ui/FiltroAgendamentos'

/**
 * RF028 — Histórico com filtros avançados.
 *
 * Filtra em memória a lista de agendamentos já carregada por
 * `useAgendamento().listarMeusAgendamentos()`. O backend atual
 * (`GET /appointments`) não aceita query params de status/período/
 * profissional — ver observação no CLAUDE.md sobre a divergência
 * com `docs/api/endpoints.md`. Esta é uma solução legítima de
 * camada de apresentação (não acessa banco, não duplica regra de
 * negócio) enquanto o endpoint dedicado não existir.
 */
export function useFiltroAgendamentos(agendamentos: Appointment[], filtros: FiltroAgendamentosValues) {
  const profissionais = useMemo(() => {
    const mapa = new Map<string, string>()
    agendamentos.forEach((agendamento) => {
      mapa.set(agendamento.professional.id, agendamento.professional.name)
    })
    return Array.from(mapa, ([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name))
  }, [agendamentos])

  const agendamentosFiltrados = useMemo(() => {
    return agendamentos.filter((agendamento) => {
      if (filtros.status !== 'todos' && agendamento.status !== filtros.status) {
        return false
      }
      if (filtros.professionalId !== 'todos' && agendamento.professional.id !== filtros.professionalId) {
        return false
      }
      if (filtros.dateFrom && agendamento.date < filtros.dateFrom) {
        return false
      }
      if (filtros.dateTo && agendamento.date > filtros.dateTo) {
        return false
      }
      return true
    })
  }, [agendamentos, filtros])

  return { agendamentosFiltrados, profissionais }
}
