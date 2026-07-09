import { Indisponibilidade } from '../entidades/Indisponibilidade'
import { RegistrarIndisponibilidadeDTO } from '../../adapters/dtos/IndisponibilidadeDTO'

export interface IRegistrarIndisponibilidadeUseCase {
  executar(dados: RegistrarIndisponibilidadeDTO): Promise<Indisponibilidade>
}
