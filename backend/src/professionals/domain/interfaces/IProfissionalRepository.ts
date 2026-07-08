import { Profissional, ProfissionalPublico } from '../entidades/Profissional'

export interface IProfissionalRepository {
  criar(data: Omit<Profissional, 'id' | 'createdAt'>): Promise<Profissional>
  listarPorBarbershopId(barbershopId: string): Promise<ProfissionalPublico[]>
  buscarPorId(id: string, barbershopId: string): Promise<ProfissionalPublico | null>
  buscarPorUserId(userId: string): Promise<Profissional | null>
}
