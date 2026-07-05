import { AtualizacaoDTO } from '../../adapters/dtos/UsuarioDTO'
import { UsuarioPublico } from '../entidades/Usuario'

export interface IAtualizarUsuarioUseCase {
  executar(id: string, dados: AtualizacaoDTO): Promise<UsuarioPublico>
}
