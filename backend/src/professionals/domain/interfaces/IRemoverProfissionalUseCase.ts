import { RemoverProfissionalDTO } from '../../adapters/dtos/ProfissionalDTO'

export interface IRemoverProfissionalUseCase {
  executar(dados: RemoverProfissionalDTO): Promise<void>
}
