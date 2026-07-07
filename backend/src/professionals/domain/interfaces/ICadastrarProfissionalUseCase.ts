import { CadastrarProfissionalDTO, ProfissionalResponseDTO } from '../../adapters/dtos/ProfissionalDTO'

export interface ICadastrarProfissionalUseCase {
  executar(dados: CadastrarProfissionalDTO): Promise<ProfissionalResponseDTO>
}
