import { LoginDTO, LoginResponseDTO } from '../../adapters/dtos/UsuarioDTO'

export interface IAutenticarUsuarioUseCase {
  executar(dados: LoginDTO): Promise<LoginResponseDTO>
}