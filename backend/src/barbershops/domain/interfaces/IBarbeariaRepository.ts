import { Barbearia } from '../entidades/Barbearia'

export interface IBarbeariaRepository {
  criar(data: Omit<Barbearia, 'id' | 'createdAt' | 'updatedAt'>): Promise<Barbearia>
  buscarPorOwnerId(ownerId: string): Promise<Barbearia | null>
  listar(): Promise<Barbearia[]>
  buscarPorId(id: string): Promise<Barbearia | null>
}
