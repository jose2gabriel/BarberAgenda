import { Servico } from '../entidades/Servico'

export interface IServicoRepository {
  criar(data: Omit<Servico, 'id' | 'createdAt'>): Promise<Servico>
  listarPorBarbershopId(barbershopId: string): Promise<Servico[]>
  buscarPorId(id: string, barbershopId: string): Promise<Servico | null>
}
