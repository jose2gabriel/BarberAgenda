import { BusinessHours } from '../domain/entidades/BusinessHours'
import { IBusinessHoursRepository } from '../domain/interfaces/IBusinessHoursRepository'
import { IBarbeariaRepository } from '../domain/interfaces/IBarbeariaRepository'
import { AppError } from '../../shared/errors/AppError'

export interface CriarHorarioDTO {
  barbershopId: string
  dayOfWeek: number
  openTime: string
  closeTime: string
  ownerId: string
}

/**
 * RF020 — Horário de funcionamento por barbearia.
 * `business_hours` tem UNIQUE(barbershop_id, day_of_week) — chamar de novo
 * para um dia já cadastrado teria que atualizar, não inserir (senão quebra
 * a constraint), por isso o upsert aqui em vez de um `salvar` direto.
 */
export class CriarHorarioFuncionamentoUseCase {
  constructor(
    private readonly businessHoursRepository: IBusinessHoursRepository,
    private readonly barbeariaRepository: IBarbeariaRepository
  ) {}

  async executar(dados: CriarHorarioDTO): Promise<BusinessHours> {
    const barbearia = await this.barbeariaRepository.buscarPorId(dados.barbershopId)

    if (!barbearia) {
      throw new AppError('Barbearia não encontrada.', 404, 'BARBERSHOP_NOT_FOUND')
    }

    if (barbearia.ownerId !== dados.ownerId) {
      throw new AppError('Você não tem permissão para acessar este recurso.', 403, 'FORBIDDEN')
    }

    const horarios = await this.businessHoursRepository.listarPorBarbeariaId(dados.barbershopId)
    const existente = horarios.find((h) => h.dayOfWeek === dados.dayOfWeek)

    if (existente) {
      return this.businessHoursRepository.atualizar(existente.id, {
        openTime: dados.openTime,
        closeTime: dados.closeTime,
      })
    }

    return this.businessHoursRepository.salvar({
      barbershopId: dados.barbershopId,
      dayOfWeek: dados.dayOfWeek,
      openTime: dados.openTime,
      closeTime: dados.closeTime,
    })
  }
}
