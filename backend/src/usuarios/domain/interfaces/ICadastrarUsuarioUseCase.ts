import { CadastroDTO, UsuarioResponseDTO } from '../../adapters/dtos/UsuarioDTO'

export interface ICadastrarUsuarioUseCase {
  executar(dados: CadastroDTO): Promise<UsuarioResponseDTO>
}