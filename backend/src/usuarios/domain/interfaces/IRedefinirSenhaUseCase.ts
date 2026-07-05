import { RedefinirSenhaDTO } from '../../adapters/dtos/UsuarioDTO'

export interface IRedefinirSenhaUseCase {
  executar(dados: RedefinirSenhaDTO): Promise<{ message: string }>
}
