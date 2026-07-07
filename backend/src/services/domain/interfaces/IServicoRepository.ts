import { Servico } from '../entidades/Servico'

export interface IServicoRepository {
  criar(data: Omit<Servico, 'id' | 'createdAt'>): Promise<Servico>
}
