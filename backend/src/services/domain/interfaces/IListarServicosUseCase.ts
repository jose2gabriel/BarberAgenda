import { Servico } from '../entidades/Servico'

export interface IListarServicosUseCase {
  executar(barbershopId: string): Promise<Servico[]>
}
