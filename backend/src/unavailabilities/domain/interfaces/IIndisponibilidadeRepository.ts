import { Indisponibilidade } from '../entidades/Indisponibilidade'

export interface IIndisponibilidadeRepository {
  criar(data: Omit<Indisponibilidade, 'id' | 'createdAt'>): Promise<Indisponibilidade>
  remover(id: string, professionalId: string): Promise<void>
  listarPorProfissional(professionalId: string): Promise<Indisponibilidade[]>
  buscarPorId(id: string, professionalId: string): Promise<Indisponibilidade | null>
  existeConflito(professionalId: string, startsAt: string, endsAt: string): Promise<boolean>
}
