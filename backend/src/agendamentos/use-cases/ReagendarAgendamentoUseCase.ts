import { IAgendamentoRepository } from '../domain/interfaces/IAgendamentoRepository'
import { IReagendarAgendamentoUseCase } from '../domain/interfaces/IReagendarAgendamentoUseCase'
import { ReagendarAgendamentoDTO, AgendamentoResponseDTO } from '../adapters/dtos/AgendamentoDTO'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'
import { IServicoRepository } from '../../services/domain/interfaces/IServicoRepository'
import { IUsuarioRepository } from '../../usuarios/domain/interfaces/IUsuarioRepository'
import { IBusinessHoursRepository } from '../../barbershops/domain/interfaces/IBusinessHoursRepository'
import { IVerificarBloqueioUseCase } from '../../unavailabilities/domain/interfaces/IVerificarBloqueioUseCase'
import { AppError } from '../../shared/errors/AppError'
import { somarMinutos, dataNoPassado, diaDaSemana } from '../../shared/utils/dateUtils'

export class ReagendarAgendamentoUseCase implements IReagendarAgendamentoUseCase {
  constructor(
    private readonly agendamentoRepository: IAgendamentoRepository,
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly servicoRepository: IServicoRepository,
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly businessHoursRepository: IBusinessHoursRepository,
    private readonly verificarBloqueioUseCase: IVerificarBloqueioUseCase
  ) {}

  async executar(id: string, dados: ReagendarAgendamentoDTO): Promise<AgendamentoResponseDTO> {
    const agendamento = await this.agendamentoRepository.buscarPorId(id)

    if (!agendamento) {
      throw new AppError('Agendamento não encontrado.', 404, 'APPOINTMENT_NOT_FOUND')
    }

    if (agendamento.status === 'cancelado' || agendamento.status === 'concluido') {
        throw new AppError('Não é possível reagendar um agendamento cancelado ou concluído.', 400, 'INVALID_STATUS')
    }

    if (dataNoPassado(dados.date)) {
      throw new AppError('Data ou horário inválido.', 400, 'INVALID_DATE')
    }

    const profissional = await this.profissionalRepository.buscarPorIdGlobal(agendamento.professionalId)

    if (!profissional) {
      throw new AppError('Profissional não encontrado.', 404, 'PROFESSIONAL_NOT_FOUND')
    }

    const servico = await this.servicoRepository.buscarPorId(agendamento.serviceId, profissional.barbershopId)

    if (!servico) {
      throw new AppError('Serviço não encontrado.', 404, 'SERVICE_NOT_FOUND')
    }

    const endTime = somarMinutos(dados.time, servico.durationMinutes)

    // 1. Horário de funcionamento (RF020)
    const horarios = await this.businessHoursRepository.listarPorBarbeariaId(profissional.barbershopId)
    const horarioDoDia = horarios.find((h) => h.dayOfWeek === diaDaSemana(dados.date))

    const dentroDoHorario =
      horarioDoDia &&
      dados.time >= horarioDoDia.openTime.slice(0, 5) &&
      endTime <= horarioDoDia.closeTime.slice(0, 5)

    if (!dentroDoHorario) {
      throw new AppError('Horário indisponível para este profissional.', 409, 'SCHEDULE_CONFLICT')
    }

    // 2. Conflito com outro agendamento ativo (excluindo o próprio agendamento)
    const temConflitoDeAgendamento = await this.agendamentoRepository.existeConflito(
      agendamento.professionalId,
      dados.date,
      dados.time,
      endTime,
      id
    )

    if (temConflitoDeAgendamento) {
      throw new AppError('Horário indisponível para este profissional.', 409, 'SCHEDULE_CONFLICT')
    }

    // 3. Indisponibilidade registrada do profissional (RF025)
    const estaIndisponivel = await this.verificarBloqueioUseCase.executar(
      agendamento.professionalId,
      `${dados.date}T${dados.time}:00.000Z`,
      `${dados.date}T${endTime}:00.000Z`
    )

    if (estaIndisponivel) {
      throw new AppError('Profissional indisponível neste período.', 409, 'PROFESSIONAL_UNAVAILABLE')
    }

    const agendamentoAtualizado = await this.agendamentoRepository.atualizar(id, {
      date: dados.date,
      startTime: dados.time,
      endTime,
    })

    const usuarioProfissional = await this.usuarioRepository.buscarPorId(profissional.userId)

    return {
      id: agendamentoAtualizado.id,
      status: agendamentoAtualizado.status,
      professional: { id: profissional.id, name: usuarioProfissional?.name ?? '' },
      service: { id: servico.id, name: servico.name, duration: servico.durationMinutes },
      date: agendamentoAtualizado.date,
      startTime: agendamentoAtualizado.startTime.slice(0, 5),
      endTime: agendamentoAtualizado.endTime.slice(0, 5),
      createdAt: agendamentoAtualizado.createdAt,
    }
  }
}
