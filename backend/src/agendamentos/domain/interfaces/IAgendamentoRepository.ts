import { Agendamento } from '../entidades/Agendamento'

export interface IAgendamentoRepository {
  listarPorProfissional(professionalId: string): Promise<Agendamento[]>
  criar(data: Omit<Agendamento, 'id' | 'createdAt' | 'updatedAt'>): Promise<Agendamento>
}
