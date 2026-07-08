import { BusinessHours } from '../domain/entidades/BusinessHours'
import { IBusinessHoursRepository } from '../domain/interfaces/IBusinessHoursRepository'

export class ListarHorariosFuncionamentoUseCase {
  constructor(
    private readonly businessHoursRepository: IBusinessHoursRepository
  ) {}

  async executar(barbershopId: string): Promise<BusinessHours[]> {
    return await this.businessHoursRepository.listarPorBarbeariaId(barbershopId)
  }
}
