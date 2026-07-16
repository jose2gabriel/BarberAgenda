import { IIndisponibilidadeRecorrenteRepository } from '../domain/interfaces/IIndisponibilidadeRecorrenteRepository'
import { IListarIndisponibilidadesRecorrentesUseCase } from '../domain/interfaces/IListarIndisponibilidadesRecorrentesUseCase'
import { IndisponibilidadeRecorrente } from '../domain/entidades/IndisponibilidadeRecorrente'

/** Lista as indisponibilidades recorrentes registradas de um profissional (para exibir/remover). */
export class ListarIndisponibilidadesRecorrentesUseCase implements IListarIndisponibilidadesRecorrentesUseCase {
  constructor(private readonly indisponibilidadeRecorrenteRepository: IIndisponibilidadeRecorrenteRepository) {}

  async executar(professionalId: string): Promise<IndisponibilidadeRecorrente[]> {
    return this.indisponibilidadeRecorrenteRepository.listarPorProfissional(professionalId)
  }
}
