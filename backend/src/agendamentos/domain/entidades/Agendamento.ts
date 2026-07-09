export interface Agendamento {
  id: string
  clientId: string
  professionalId: string
  serviceId: string
  barbershopId: string
  date: string
  startTime: string
  endTime: string
  status: 'agendado' | 'concluido' | 'cancelado'
  createdAt: string
  updatedAt: string
}

