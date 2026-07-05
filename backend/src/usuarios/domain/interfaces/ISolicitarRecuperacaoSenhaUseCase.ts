import { EsqueciSenhaDTO } from '../../adapters/dtos/UsuarioDTO'

export interface ISolicitarRecuperacaoSenhaUseCase {
  executar(dados: EsqueciSenhaDTO): Promise<{ message: string }>
}
