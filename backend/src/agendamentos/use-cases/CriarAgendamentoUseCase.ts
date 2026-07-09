import { IAgendamentoRepository } from '../domain/interfaces/IAgendamentoRepository'
import { ICriarAgendamentoUseCase } from '../domain/interfaces/ICriarAgendamentoUseCase'
import { CriarAgendamentoDTO, AgendamentoResponseDTO } from '../adapters/dtos/AgendamentoDTO'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'
import { IServicoRepository } from '../../services/domain/interfaces/IServicoRepository'
import { IUsuarioRepository } from '../../usuarios/domain/interfaces/IUsuarioRepository'
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

/**
 * RF006 — Agendamento de horário.
 * Cliente escolhe profissional + serviço + data + horário; o backend
 * calcula o horário final a partir da duração do serviço (RF016) e
 * cria o agendamento. A validação de conflitos (RF007) é feita à parte
 * (ver comentário mais abaixo, adicionada depois desta implementação
 * base).
 */
export class CriarAgendamentoUseCase implements ICriarAgendamentoUseCase {
  constructor(
    private readonly agendamentoRepository: IAgendamentoRepository,
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly servicoRepository: IServicoRepository,
    private readonly usuarioRepository: IUsuarioRepository
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
