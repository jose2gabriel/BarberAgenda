import { IIndisponibilidadeRepository } from '../domain/interfaces/IIndisponibilidadeRepository'
import { IIndisponibilidadeRecorrenteRepository } from '../domain/interfaces/IIndisponibilidadeRecorrenteRepository'
import { IVerificarBloqueioUseCase } from '../domain/interfaces/IVerificarBloqueioUseCase'
import { diaDaSemana } from '../../shared/utils/dateUtils'

/**
 * RF025 — Bloqueio por indisponibilidade.
 *
 * Verifica se um profissional tem indisponibilidade registrada que
 * conflita com o período informado — tanto bloqueio por data específica
 * quanto bloqueio recorrente (todo dia da semana X, ex.: "não trabalho
 * aos domingos"). Não tem rota HTTP própria — é a regra de negócio que
 * o motor de agendamento (RF006/RF007) e o cálculo de horários livres
 * (RF022) devem consultar antes de confirmar um agendamento. Quando isso
 * acontecer, o chamador deve lançar AppError com o código
 * PROFESSIONAL_UNAVAILABLE (já documentado em error-codes.md) se este
 * método retornar true.
 */
export class VerificarBloqueioUseCase implements IVerificarBloqueioUseCase {
  constructor(
    private readonly indisponibilidadeRepository: IIndisponibilidadeRepository,
    private readonly indisponibilidadeRecorrenteRepository: IIndisponibilidadeRecorrenteRepository
  ) {}

  async executar(professionalId: string, startsAt: string, endsAt: string): Promise<boolean> {
    const conflitaBloqueioEspecifico = await this.indisponibilidadeRepository.existeConflito(
      professionalId,
      startsAt,
      endsAt
    )
    if (conflitaBloqueioEspecifico) return true

    const dayOfWeek = diaDaSemana(startsAt.slice(0, 10))
    const startTime = startsAt.slice(11, 16)
    const endTime = endsAt.slice(11, 16)

    return this.indisponibilidadeRecorrenteRepository.existeConflito(professionalId, dayOfWeek, startTime, endTime)
  }
}
