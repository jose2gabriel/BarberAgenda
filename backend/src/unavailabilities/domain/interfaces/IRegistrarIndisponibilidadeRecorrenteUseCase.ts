import { IndisponibilidadeRecorrente } from '../entidades/IndisponibilidadeRecorrente'
import { RegistrarIndisponibilidadeRecorrenteDTO } from '../../adapters/dtos/IndisponibilidadeRecorrenteDTO'

export interface IRegistrarIndisponibilidadeRecorrenteUseCase {
  executar(dados: RegistrarIndisponibilidadeRecorrenteDTO): Promise<IndisponibilidadeRecorrente>
}
