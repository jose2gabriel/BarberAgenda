import { Agendamento } from '../entidades/Agendamento'

export interface IAgendamentoRepository {
  listarPorProfissional(professionalId: string): Promise<Agendamento[]>
}
