import { Profissional, ProfissionalPublico } from '../entidades/Profissional'

export interface IProfissionalRepository {
  criar(data: Omit<Profissional, 'id' | 'createdAt'>): Promise<Profissional>
  listarPorBarbershopId(barbershopId: string): Promise<ProfissionalPublico[]>
}
