import { CriarAgendamentoDTO, AgendamentoResponseDTO } from '../../adapters/dtos/AgendamentoDTO'

export interface ICriarAgendamentoUseCase {
  executar(dados: CriarAgendamentoDTO): Promise<AgendamentoResponseDTO>
}
