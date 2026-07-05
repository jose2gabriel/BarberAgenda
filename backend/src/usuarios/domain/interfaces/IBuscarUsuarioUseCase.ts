import { UsuarioPublico } from '../entidades/Usuario'

export interface IBuscarUsuarioUseCase {
  executar(id: string): Promise<UsuarioPublico>
}
