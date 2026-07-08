import { BusinessHours } from '../domain/entidades/BusinessHours'
import { IBusinessHoursRepository } from '../domain/interfaces/IBusinessHoursRepository'

export interface CriarHorarioDTO {
  barbershopId: string
  dayOfWeek: number
  openTime: string
  closeTime: string
}

export class CriarHorarioFuncionamentoUseCase {
  constructor(
    private readonly businessHoursRepository: IBusinessHoursRepository
  ) {}

  async executar(dados: CriarHorarioDTO): Promise<BusinessHours> {
    // TODO: Adicionar validações de negócio, como verificar se o owner tem permissão
    // ou se já existe um horário para este dia da semana.
    
    return await this.businessHoursRepository.salvar({
      barbershopId: dados.barbershopId,
      dayOfWeek: dados.dayOfWeek,
      openTime: dados.openTime,
      closeTime: dados.closeTime,
    })
  }
}
