import { Barbearia } from '../entidades/Barbearia'
import { CriarBarbeariaDTO } from '../../adapters/dtos/BarbeariaDTO'

export interface ICriarBarbeariaUseCase {
  executar(dados: CriarBarbeariaDTO): Promise<Barbearia>
}
