import { AgendamentoResponseDTO } from '../../adapters/dtos/AgendamentoDTO'

export interface ICancelarAgendamentoUseCase {
  executar(agendamentoId: string, userId: string): Promise<void>
}
