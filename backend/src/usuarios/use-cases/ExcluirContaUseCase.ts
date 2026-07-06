import { IExcluirContaUseCase } from '../domain/interfaces/IExcluirContaUseCase'
import { IUsuarioRepository } from '../domain/interfaces/IUsuarioRepository'
import { AppError } from '../../shared/errors/AppError'

export class ExcluirContaUseCase implements IExcluirContaUseCase {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(id: string): Promise<void> {
    const usuario = await this.usuarioRepository.buscarPorId(id)
    if (!usuario) {
      throw new AppError('Usuário não encontrado', 404, 'USER_NOT_FOUND'
)
    }

    // TODO: Cancelar agendamentos futuros (Módulo 3)

    await this.usuarioRepository.deletar(id)
  }
}
