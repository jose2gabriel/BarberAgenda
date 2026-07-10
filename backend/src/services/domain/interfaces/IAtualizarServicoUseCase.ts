import { AtualizarServicoDTO, ServicoResponseDTO } from '../../adapters/dtos/ServicoDTO'

export interface IAtualizarServicoUseCase {
  executar(dados: AtualizarServicoDTO & { ownerId: string; serviceId: string }): Promise<ServicoResponseDTO>
}
