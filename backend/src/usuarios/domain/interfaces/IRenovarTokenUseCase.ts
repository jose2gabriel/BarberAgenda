import { LoginResponseDTO } from '../../adapters/dtos/UsuarioDTO'

export interface IRenovarTokenUseCase {
  executar(usuarioId: string): Promise<LoginResponseDTO>
}
