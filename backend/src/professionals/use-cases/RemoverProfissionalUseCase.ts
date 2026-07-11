import { IProfissionalRepository } from '../domain/interfaces/IProfissionalRepository'
import { IRemoverProfissionalUseCase } from '../domain/interfaces/IRemoverProfissionalUseCase'
import { RemoverProfissionalDTO } from '../adapters/dtos/ProfissionalDTO'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'
import { AppError } from '../../shared/errors/AppError'

/**
 * Remove o profissional da barbearia (owner). Um profissional pertence a
 * uma única barbearia no MVP (barbershops.md). A conta de usuário em si
 * não é excluída, e seus papéis (roles) são recalculados dinamicamente a
 * partir do banco a cada login/refresh-token — não há mais um campo
 * `role` fixo para "resetar" aqui (ver construirRolesUsuario).
 */
export class RemoverProfissionalUseCase implements IRemoverProfissionalUseCase {
  constructor(
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly barbeariaRepository: IBarbeariaRepository
  ) {}

  async executar(dados: RemoverProfissionalDTO): Promise<void> {
    const profissional = await this.profissionalRepository.buscarCompletoPorId(
      dados.professionalId,
      dados.barbershopId
    )

    if (!profissional) {
      throw new AppError('Profissional não encontrado.', 404, 'PROFESSIONAL_NOT_FOUND')
    }

    const barbearia = await this.barbeariaRepository.buscarPorId(dados.barbershopId)

    if (barbearia?.ownerId !== dados.ownerId) {
      throw new AppError('Você não tem permissão para acessar este recurso.', 403, 'FORBIDDEN')
    }

    await this.profissionalRepository.remover(dados.professionalId)
  }
}
