import { TornarSeProfissionalDTO } from '../../adapters/dtos/TornarSeProfissionalDTO'
import { ProfissionalResponseDTO } from '../../adapters/dtos/ProfissionalDTO'

export interface ITornarSeProfissionalUseCase {
  executar(dados: TornarSeProfissionalDTO): Promise<ProfissionalResponseDTO>
}
