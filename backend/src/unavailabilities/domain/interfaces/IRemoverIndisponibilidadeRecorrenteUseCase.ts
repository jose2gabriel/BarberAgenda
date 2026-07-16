import { RemoverIndisponibilidadeRecorrenteDTO } from '../../adapters/dtos/IndisponibilidadeRecorrenteDTO'

export interface IRemoverIndisponibilidadeRecorrenteUseCase {
  executar(dados: RemoverIndisponibilidadeRecorrenteDTO): Promise<void>
}
