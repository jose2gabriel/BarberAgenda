import { IIndisponibilidadeRepository } from '../domain/interfaces/IIndisponibilidadeRepository'
import { IVerificarBloqueioUseCase } from '../domain/interfaces/IVerificarBloqueioUseCase'

/**
 * RF025 — Bloqueio por indisponibilidade.
 *
 * Verifica se um profissional tem indisponibilidade registrada que
 * conflita com o período informado. Não tem rota HTTP própria — é a
 * regra de negócio que o motor de agendamento (RF006/RF007, Módulo 3,
 * ainda não implementado) e o cálculo de horários livres (RF022) devem
 * consultar antes de confirmar um agendamento. Quando isso acontecer,
 * o chamador deve lançar AppError com o código PROFESSIONAL_UNAVAILABLE
 * (já documentado em error-codes.md) se este método retornar true.
 */
export class VerificarBloqueioUseCase implements IVerificarBloqueioUseCase {
  constructor(private readonly indisponibilidadeRepository: IIndisponibilidadeRepository) {}

  async executar(professionalId: string, startsAt: string, endsAt: string): Promise<boolean> {
    return this.indisponibilidadeRepository.existeConflito(professionalId, startsAt, endsAt)
  }
}
