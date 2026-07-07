import { Profissional } from '../entidades/Profissional'

export interface IProfissionalRepository {
  criar(data: Omit<Profissional, 'id' | 'createdAt'>): Promise<Profissional>
}
