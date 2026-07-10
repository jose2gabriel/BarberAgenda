import { AtualizarProfissionalDTO, ProfissionalResponseDTO } from '../../adapters/dtos/ProfissionalDTO'

export interface IAtualizarProfissionalUseCase {
  executar(dados: AtualizarProfissionalDTO): Promise<ProfissionalResponseDTO>
}
