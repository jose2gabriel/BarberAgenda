import { IIndisponibilidadeRecorrenteRepository } from '../domain/interfaces/IIndisponibilidadeRecorrenteRepository'
import { IRegistrarIndisponibilidadeRecorrenteUseCase } from '../domain/interfaces/IRegistrarIndisponibilidadeRecorrenteUseCase'
import { RegistrarIndisponibilidadeRecorrenteDTO } from '../adapters/dtos/IndisponibilidadeRecorrenteDTO'
import { IndisponibilidadeRecorrente } from '../domain/entidades/IndisponibilidadeRecorrente'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'
import { AppError } from '../../shared/errors/AppError'

/**
 * Registra indisponibilidade recorrente (repete toda semana no dia
 * informado) — complementa RF024/RF025. Mesma regra de autorização do
 * bloqueio por data específica: só o próprio profissional ou o owner da
 * barbearia podem registrar (barbeiros.md, ADR-007).
 */
export class RegistrarIndisponibilidadeRecorrenteUseCase implements IRegistrarIndisponibilidadeRecorrenteUseCase {
  constructor(
    private readonly indisponibilidadeRecorrenteRepository: IIndisponibilidadeRecorrenteRepository,
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly barbeariaRepository: IBarbeariaRepository
  ) {}

  async executar(dados: RegistrarIndisponibilidadeRecorrenteDTO): Promise<IndisponibilidadeRecorrente> {
    const profissional = await this.profissionalRepository.buscarCompletoPorId(
      dados.professionalId,
      dados.barbershopId
    )

    if (!profissional) {
      throw new AppError('Profissional não encontrado.', 404, 'PROFESSIONAL_NOT_FOUND')
    }

    const ehOProprioProfissional = profissional.userId === dados.requesterId

    if (!ehOProprioProfissional) {
      const barbearia = await this.barbeariaRepository.buscarPorId(dados.barbershopId)
      const ehOwnerDaBarbearia = barbearia?.ownerId === dados.requesterId

      if (!ehOwnerDaBarbearia) {
        throw new AppError('Você não tem permissão para acessar este recurso.', 403, 'FORBIDDEN')
      }
    }

    return this.indisponibilidadeRecorrenteRepository.criar({
      professionalId: dados.professionalId,
      dayOfWeek: dados.dayOfWeek,
      startTime: dados.startTime,
      endTime: dados.endTime,
      reason: dados.reason ?? null,
    })
  }
}
