import { IAgendamentoRepository } from '../domain/interfaces/IAgendamentoRepository'
import { AppError } from '../../shared/errors/AppError'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'

export interface IConcluirAgendamentoUseCase {
  executar(agendamentoId: string, userId: string, userRole: string): Promise<void>
}

export class ConcluirAgendamentoUseCase implements IConcluirAgendamentoUseCase {
  constructor(
    private readonly agendamentoRepository: IAgendamentoRepository,
    private readonly profissionalRepository: IProfissionalRepository
  ) {}

  async executar(agendamentoId: string, userId: string, userRole: string): Promise<void> {
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

    // Validação de permissão: apenas o profissional do agendamento ou owner
    let autorizado = false
    if (userRole === 'profissional') {
      autorizado = agendamento.professionalId === userId
    } else if (userRole === 'owner') {
      const profissional = await this.profissionalRepository.buscarPorIdGlobal(agendamento.professionalId)
      autorizado = profissional?.barbershopId === userId 
    }

    if (!autorizado) {
      throw new AppError('Não autorizado para concluir este agendamento.', 403, 'UNAUTHORIZED')
    }

    await this.agendamentoRepository.atualizar(agendamentoId, {
      status: 'concluido',
    })
  }
}
