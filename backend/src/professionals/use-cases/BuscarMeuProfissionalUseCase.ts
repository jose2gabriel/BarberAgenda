import { IProfissionalRepository } from '../domain/interfaces/IProfissionalRepository'
import {
  IBuscarMeuProfissionalUseCase,
  MeuProfissionalResponseDTO,
} from '../domain/interfaces/IBuscarMeuProfissionalUseCase'
import { AppError } from '../../shared/errors/AppError'

/**
 * Devolve o vínculo de profissional do próprio usuário logado (id +
 * barbershopId), usado pelo frontend para montar as chamadas de
 * agenda/indisponibilidade sem precisar saber esses ids de antemão —
 * mesma busca (`buscarPorUserId`) já usada internamente por
 * AgendamentoController.listarMinhaAgenda, aqui exposta como endpoint.
 */
export class BuscarMeuProfissionalUseCase implements IBuscarMeuProfissionalUseCase {
  constructor(private readonly profissionalRepository: IProfissionalRepository) {}

  async executar(userId: string): Promise<MeuProfissionalResponseDTO> {
    const profissional = await this.profissionalRepository.buscarPorUserId(userId)

    if (!profissional) {
      throw new AppError('Profissional não encontrado para este usuário.', 404, 'PROFESSIONAL_NOT_FOUND')
    }

    return {
      id: profissional.id,
      barbershopId: profissional.barbershopId,
      specialty: profissional.specialty,
    }
  }
}
