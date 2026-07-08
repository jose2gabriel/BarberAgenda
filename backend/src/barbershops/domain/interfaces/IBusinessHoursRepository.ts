import { BusinessHours } from '../entidades/BusinessHours'

export interface IBusinessHoursRepository {
  salvar(data: Omit<BusinessHours, 'id'>): Promise<BusinessHours>
  listarPorBarbeariaId(barbershopId: string): Promise<BusinessHours[]>
  atualizar(id: string, data: Partial<Omit<BusinessHours, 'id' | 'barbershopId'>>): Promise<BusinessHours>
}

