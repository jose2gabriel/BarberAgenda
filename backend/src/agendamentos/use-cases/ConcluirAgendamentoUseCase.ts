import { IAgendamentoRepository } from '../domain/interfaces/IAgendamentoRepository'
import { AppError } from '../../shared/errors/AppError'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'

export interface IConcluirAgendamentoUseCase {
  executar(agendamentoId: string, userId: string): Promise<void>
}

/**
 * RF029 — Conclusão de agendamento.
 * Só o profissional vinculado ao agendamento ou o owner da barbearia
 * podem concluir (cliente não marca o próprio atendimento como
 * concluído). Checagem por relação real, mesmo padrão de
 * CancelarAgendamentoUseCase.
 */
export class ConcluirAgendamentoUseCase implements IConcluirAgendamentoUseCase {
  constructor(
    private readonly agendamentoRepository: IAgendamentoRepository,
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly barbeariaRepository: IBarbeariaRepository
  ) {}

  async executar(agendamentoId: string, userId: string): Promise<void> {
    const agendamento = await this.agendamentoRepository.buscarPorId(agendamentoId)

    if (!agendamento) {
      throw new AppError('Agendamento não encontrado.', 404, 'APPOINTMENT_NOT_FOUND')
    }

    if (agendamento.status === 'concluido') {
      throw new AppError('Agendamento já está concluído.', 400, 'ALREADY_COMPLETED')
    }

    if (agendamento.status === 'cancelado') {
      throw new AppError('Não é possível concluir um agendamento cancelado.', 400, 'INVALID_STATUS')
    }

    const profissional = await this.profissionalRepository.buscarPorIdGlobal(agendamento.professionalId)
    let autorizado = profissional?.userId === userId

    if (!autorizado) {
      const barbearia = await this.barbeariaRepository.buscarPorId(agendamento.barbershopId)
      autorizado = barbearia?.ownerId === userId
    }

    if (!autorizado) {
      throw new AppError('Não autorizado para concluir este agendamento.', 403, 'UNAUTHORIZED')
    }

    await this.agendamentoRepository.atualizar(agendamentoId, {
      status: 'concluido',
    })
  }
}
