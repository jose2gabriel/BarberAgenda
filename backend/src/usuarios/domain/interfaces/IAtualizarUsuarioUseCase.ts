import { AtualizacaoDTO, UsuarioResponseDTO } from '../../adapters/dtos/UsuarioDTO'

export interface IAtualizarUsuarioUseCase {
  executar(id: string, dados: AtualizacaoDTO): Promise<UsuarioResponseDTO>
}
