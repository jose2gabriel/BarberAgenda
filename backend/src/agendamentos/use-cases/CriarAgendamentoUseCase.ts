import { IAgendamentoRepository } from '../domain/interfaces/IAgendamentoRepository'
import { ICriarAgendamentoUseCase } from '../domain/interfaces/ICriarAgendamentoUseCase'
import { CriarAgendamentoDTO, AgendamentoResponseDTO } from '../adapters/dtos/AgendamentoDTO'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'
import { IServicoRepository } from '../../services/domain/interfaces/IServicoRepository'
import { IUsuarioRepository } from '../../usuarios/domain/interfaces/IUsuarioRepository'
import { IBusinessHoursRepository } from '../../barbershops/domain/interfaces/IBusinessHoursRepository'
import { IVerificarBloqueioUseCase } from '../../unavailabilities/domain/interfaces/IVerificarBloqueioUseCase'
import { AppError } from '../../shared/errors/AppError'

function somarMinutos(horaHHmm: string, minutos: number): string {
  const [h, m] = horaHHmm.split(':').map(Number)
  const totalMin = h * 60 + m + minutos
  const novaHora = Math.floor(totalMin / 60) % 24
  const novoMinuto = totalMin % 60
  return `${String(novaHora).padStart(2, '0')}:${String(novoMinuto).padStart(2, '0')}`
}

function dataNoPassado(date: string): boolean {
  const hoje = new Date().toISOString().slice(0, 10)
  return date < hoje
}

function diaDaSemana(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay()
}

/**
 * RF006 — Agendamento de horário + RF007 — Validação de disponibilidade.
 *
 * Cliente escolhe profissional + serviço + data + horário; o backend
 * calcula o horário final a partir da duração do serviço (RF016) e
 * valida disponibilidade em três frentes antes de criar o agendamento
 * (agendamentos.md):
 *   1. Horário de funcionamento da barbearia (RF020)
 *   2. Conflito com outro agendamento ativo do mesmo profissional
 *   3. Indisponibilidade registrada do profissional (RF024/RF025)
 */
export class CriarAgendamentoUseCase implements ICriarAgendamentoUseCase {
  constructor(
    private readonly agendamentoRepository: IAgendamentoRepository,
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly servicoRepository: IServicoRepository,
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly businessHoursRepository: IBusinessHoursRepository,
    private readonly verificarBloqueioUseCase: IVerificarBloqueioUseCase
  ) {}

  async executar(dados: CriarAgendamentoDTO): Promise<AgendamentoResponseDTO> {
    if (dataNoPassado(dados.date)) {
      throw new AppError('Data ou horário inválido.', 400, 'INVALID_DATE')
    }

    const profissional = await this.profissionalRepository.buscarPorIdGlobal(dados.professionalId)

    if (!profissional) {
      throw new AppError('Profissional não encontrado.', 404, 'PROFESSIONAL_NOT_FOUND')
    }

    const servico = await this.servicoRepository.buscarPorId(dados.serviceId, profissional.barbershopId)

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

    // 2. Conflito com outro agendamento ativo
    const temConflitoDeAgendamento = await this.agendamentoRepository.existeConflito(
      dados.professionalId,
      dados.date,
      dados.time,
      endTime
    )

    if (temConflitoDeAgendamento) {
      throw new AppError('Horário indisponível para este profissional.', 409, 'SCHEDULE_CONFLICT')
    }

    // 3. Indisponibilidade registrada do profissional (RF025)
    const estaIndisponivel = await this.verificarBloqueioUseCase.executar(
      dados.professionalId,
      `${dados.date}T${dados.time}:00.000Z`,
      `${dados.date}T${endTime}:00.000Z`
    )

    if (estaIndisponivel) {
      throw new AppError('Profissional indisponível neste período.', 409, 'PROFESSIONAL_UNAVAILABLE')
    }

    const agendamentoCriado = await this.agendamentoRepository.criar({
      clientId: dados.clientId,
      professionalId: dados.professionalId,
      serviceId: dados.serviceId,
      barbershopId: profissional.barbershopId,
      date: dados.date,
      startTime: dados.time,
      endTime,
      status: 'agendado',
    })

    const usuarioProfissional = await this.usuarioRepository.buscarPorId(profissional.userId)

    return {
      id: agendamentoCriado.id,
      status: agendamentoCriado.status,
      professional: { id: profissional.id, name: usuarioProfissional?.name ?? '' },
      service: { id: servico.id, name: servico.name, duration: servico.durationMinutes },
      date: agendamentoCriado.date,
      // Postgres retorna TIME como HH:MM:SS — normaliza pro contrato HH:mm
      // documentado (request-response-examples.md).
      startTime: agendamentoCriado.startTime.slice(0, 5),
      endTime: agendamentoCriado.endTime.slice(0, 5),
      createdAt: agendamentoCriado.createdAt,
    }
  }
}
