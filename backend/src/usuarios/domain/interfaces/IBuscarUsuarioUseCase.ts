import { UsuarioResponseDTO } from '../../adapters/dtos/UsuarioDTO'

export interface IBuscarUsuarioUseCase {
  executar(id: string): Promise<UsuarioResponseDTO>
}
