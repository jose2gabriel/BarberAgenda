import { IIndisponibilidadeRepository } from '../domain/interfaces/IIndisponibilidadeRepository'
import { IListarIndisponibilidadesUseCase } from '../domain/interfaces/IListarIndisponibilidadesUseCase'
import { Indisponibilidade } from '../domain/entidades/Indisponibilidade'

/** Lista as indisponibilidades registradas de um profissional (para exibir/remover). */
export class ListarIndisponibilidadesUseCase implements IListarIndisponibilidadesUseCase {
  constructor(private readonly indisponibilidadeRepository: IIndisponibilidadeRepository) {}

  async executar(professionalId: string): Promise<Indisponibilidade[]> {
    return this.indisponibilidadeRepository.listarPorProfissional(professionalId)
  }
}
