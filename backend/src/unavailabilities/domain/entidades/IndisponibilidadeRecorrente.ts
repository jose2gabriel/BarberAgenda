export interface IndisponibilidadeRecorrente {
  id: string
  professionalId: string
  dayOfWeek: number
  startTime: string
  endTime: string
  reason: string | null
  createdAt: string
}
