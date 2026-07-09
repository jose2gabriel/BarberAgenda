import { RemoverIndisponibilidadeDTO } from '../../adapters/dtos/IndisponibilidadeDTO'

export interface IRemoverIndisponibilidadeUseCase {
  executar(dados: RemoverIndisponibilidadeDTO): Promise<void>
}
