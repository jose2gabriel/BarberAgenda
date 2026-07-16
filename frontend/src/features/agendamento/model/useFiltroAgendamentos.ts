import { useMemo } from 'react'
import type { Appointment } from '../../../entities/appointment/types'
import type { FiltroAgendamentosValues } from '../ui/FiltroAgendamentos'

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
