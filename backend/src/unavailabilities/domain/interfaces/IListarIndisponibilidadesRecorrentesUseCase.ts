import { IndisponibilidadeRecorrente } from '../entidades/IndisponibilidadeRecorrente'

export interface IListarIndisponibilidadesRecorrentesUseCase {
  executar(professionalId: string): Promise<IndisponibilidadeRecorrente[]>
}
