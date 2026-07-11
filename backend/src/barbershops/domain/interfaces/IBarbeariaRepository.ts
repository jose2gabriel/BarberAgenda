import { Barbearia } from '../entidades/Barbearia'

export interface IBarbeariaRepository {
  criar(data: Omit<Barbearia, 'id' | 'createdAt' | 'updatedAt'>): Promise<Barbearia>
  buscarPorOwnerId(ownerId: string): Promise<Barbearia | null>
  existePorOwnerId(ownerId: string): Promise<boolean>
  listar(): Promise<Barbearia[]>
  buscarPorId(id: string): Promise<Barbearia | null>
  atualizar(id: string, dados: Partial<Pick<Barbearia, 'name' | 'address' | 'phone'>>): Promise<Barbearia>
}
