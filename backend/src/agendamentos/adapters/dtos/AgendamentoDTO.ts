export interface CriarAgendamentoDTO {
  clientId: string
  professionalId: string
  serviceId: string
  date: string
  time: string
}

export interface AgendamentoResponseDTO {
  id: string
  status: 'agendado' | 'concluido' | 'cancelado'
  professional: { id: string; name: string }
  service: { id: string; name: string; duration: number }
  date: string
  startTime: string
  endTime: string
  createdAt: string
}
