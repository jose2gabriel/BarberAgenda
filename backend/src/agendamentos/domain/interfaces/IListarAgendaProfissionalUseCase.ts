import { Agendamento } from '../entidades/Agendamento'

export interface IListarAgendaProfissionalUseCase {
  executar(professionalId: string): Promise<Agendamento[]>
}
