import { Barbearia } from '../entidades/Barbearia'
import { AtualizarBarbeariaDTO } from '../../adapters/dtos/BarbeariaDTO'

export interface IAtualizarBarbeariaUseCase {
  executar(id: string, ownerId: string, dados: AtualizarBarbeariaDTO): Promise<Barbearia>
}
