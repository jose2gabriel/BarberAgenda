import { CadastrarServicoDTO, ServicoResponseDTO } from '../../adapters/dtos/ServicoDTO'

export interface ICadastrarServicoUseCase {
  executar(dados: CadastrarServicoDTO): Promise<ServicoResponseDTO>
}
