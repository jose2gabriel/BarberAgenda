import { IIndisponibilidadeRepository } from '../domain/interfaces/IIndisponibilidadeRepository'
import { IRemoverIndisponibilidadeUseCase } from '../domain/interfaces/IRemoverIndisponibilidadeUseCase'
import { RemoverIndisponibilidadeDTO } from '../adapters/dtos/IndisponibilidadeDTO'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'
import { AppError } from '../../shared/errors/AppError'

/**
 * RF024 — Remove indisponibilidade.
 * Mesma regra de autorização do registro: só o próprio profissional ou
 * o owner da barbearia.
 */
export class RemoverIndisponibilidadeUseCase implements IRemoverIndisponibilidadeUseCase {
  constructor(
    private readonly indisponibilidadeRepository: IIndisponibilidadeRepository,
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly barbeariaRepository: IBarbeariaRepository
  ) {}

  async executar(dados: RemoverIndisponibilidadeDTO): Promise<void> {
    const profissional = await this.profissionalRepository.buscarCompletoPorId(
      dados.professionalId,
      dados.barbershopId
    )

    if (!profissional) {
      throw new AppError('Profissional não encontrado.', 404, 'PROFESSIONAL_NOT_FOUND')
    }

    const indisponibilidade = await this.indisponibilidadeRepository.buscarPorId(
      dados.unavailabilityId,
      dados.professionalId
    )

    if (!indisponibilidade) {
      throw new AppError('Indisponibilidade não encontrada.', 404, 'UNAVAILABILITY_NOT_FOUND')
    }

    const ehOProprioProfissional = profissional.userId === dados.requesterId

    if (!ehOProprioProfissional) {
      const barbearia = await this.barbeariaRepository.buscarPorId(dados.barbershopId)
      const ehOwnerDaBarbearia = barbearia?.ownerId === dados.requesterId

      if (!ehOwnerDaBarbearia) {
        throw new AppError('Você não tem permissão para acessar este recurso.', 403, 'FORBIDDEN')
      }
    }

    await this.indisponibilidadeRepository.remover(dados.unavailabilityId, dados.professionalId)
  }
}
