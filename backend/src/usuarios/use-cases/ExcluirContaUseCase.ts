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

    try {
      await this.usuarioRepository.deletar(id)
    } catch {
      // Falha aqui quase sempre é FK (agendamentos, barbearias, vínculo de
      // profissional) — não expõe o erro de banco cru pro usuário final.
      throw new AppError(
        'Não foi possível excluir sua conta agora porque existem barbearias, agendamentos ou vínculos associados a ela.',
        409,
        'ACCOUNT_HAS_DEPENDENCIES'
      )
    }
  }
}
