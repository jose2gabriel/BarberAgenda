import { IUsuarioRepository } from '../domain/interfaces/IUsuarioRepository'
import { IBuscarUsuarioUseCase } from '../domain/interfaces/IBuscarUsuarioUseCase'
import { UsuarioPublico, paraUsuarioPublico } from '../domain/entidades/Usuario'
import { AppError } from '../../shared/errors/AppError'

export class BuscarUsuarioUseCase implements IBuscarUsuarioUseCase {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  async executar(id: string): Promise<UsuarioPublico> {
    const usuario = await this.usuarioRepository.buscarPorId(id)

    if (!usuario) {
      throw new AppError('Usuário não encontrado.', 404, 'USER_NOT_FOUND')
    }

    return paraUsuarioPublico(usuario)
  }
}