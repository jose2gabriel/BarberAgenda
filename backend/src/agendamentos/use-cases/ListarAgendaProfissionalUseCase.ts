import { IAgendamentoRepository } from '../domain/interfaces/IAgendamentoRepository'
import { IListarAgendaProfissionalUseCase } from '../domain/interfaces/IListarAgendaProfissionalUseCase'
import { Agendamento } from '../domain/entidades/Agendamento'

export class ListarAgendaProfissionalUseCase implements IListarAgendaProfissionalUseCase {
  constructor(private readonly agendamentoRepository: IAgendamentoRepository) {}

  async executar(professionalId: string): Promise<Agendamento[]> {
    return this.agendamentoRepository.listarPorProfissional(professionalId)
  }
}
