import { IProfissionalRepository } from '../domain/interfaces/IProfissionalRepository'
import { IListarProfissionaisUseCase } from '../domain/interfaces/IListarProfissionaisUseCase'
import { ProfissionalPublico } from '../domain/entidades/Profissional'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'
import { AppError } from '../../shared/errors/AppError'

/**
 * RF004 — Listagem de profissionais da barbearia.
 * Qualquer usuário autenticado pode visualizar (barbeiros.md) — não é
 * restrito ao owner, diferente do cadastro (RF003).
 */
export class ListarProfissionaisUseCase implements IListarProfissionaisUseCase {
  constructor(
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly barbeariaRepository: IBarbeariaRepository
  ) {}

  async executar(barbershopId: string): Promise<ProfissionalPublico[]> {
    const barbearia = await this.barbeariaRepository.buscarPorId(barbershopId)

    if (!barbearia) {
      throw new AppError('Barbearia não encontrada.', 404, 'BARBERSHOP_NOT_FOUND')
    }

    return this.profissionalRepository.listarPorBarbershopId(barbershopId)
  }
}
