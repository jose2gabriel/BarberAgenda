import { Indisponibilidade } from '../entidades/Indisponibilidade'

export interface IIndisponibilidadeRepository {
  criar(data: Omit<Indisponibilidade, 'id' | 'createdAt'>): Promise<Indisponibilidade>
  remover(id: string, professionalId: string): Promise<void>
  buscarPorId(id: string, professionalId: string): Promise<Indisponibilidade | null>
}
