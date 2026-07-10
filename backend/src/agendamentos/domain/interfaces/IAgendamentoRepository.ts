import { Agendamento } from '../entidades/Agendamento'

export interface IAgendamentoRepository {
  listarPorProfissional(professionalId: string): Promise<Agendamento[]>
  criar(data: Omit<Agendamento, 'id' | 'createdAt' | 'updatedAt'>): Promise<Agendamento>
  existeConflito(professionalId: string, date: string, startTime: string, endTime: string, excludedId?: string): Promise<boolean>
  buscarPorId(id: string): Promise<Agendamento | null>
  atualizar(id: string, data: Partial<Agendamento>): Promise<Agendamento>
}
