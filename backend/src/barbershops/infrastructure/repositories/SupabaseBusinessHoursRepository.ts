import { supabase } from '../../../shared/database/supabase'
import { BusinessHours } from '../../domain/entidades/BusinessHours'
import { IBusinessHoursRepository } from '../../domain/interfaces/IBusinessHoursRepository'

function mapRowParaBusinessHours(row: any): BusinessHours {
  return {
    id: row.id,
    barbershopId: row.barbershop_id,
    dayOfWeek: row.day_of_week,
    openTime: row.open_time,
    closeTime: row.close_time,
  }
}

export class SupabaseBusinessHoursRepository implements IBusinessHoursRepository {
  async salvar(data: Omit<BusinessHours, 'id'>): Promise<BusinessHours> {
    const { data: insertedData, error } = await supabase
      .from('business_hours')
      .insert({
        barbershop_id: data.barbershopId,
        day_of_week: data.dayOfWeek,
        open_time: data.openTime,
        close_time: data.closeTime,
      })
      .select('*')
      .single()

    if (error) throw new Error(`Erro ao salvar horário de funcionamento: ${error.message}`)
    return mapRowParaBusinessHours(insertedData)
  }

  async listarPorBarbeariaId(barbershopId: string): Promise<BusinessHours[]> {
    const { data, error } = await supabase
      .from('business_hours')
      .select('*')
      .eq('barbershop_id', barbershopId)
      .order('day_of_week', { ascending: true })

    if (error) throw new Error(`Erro ao listar horários da barbearia: ${error.message}`)
    return (data ?? []).map(mapRowParaBusinessHours)
  }

  async atualizar(id: string, data: Partial<Omit<BusinessHours, 'id' | 'barbershopId'>>): Promise<BusinessHours> {
    const payload: Record<string, any> = {}
    if (data.dayOfWeek !== undefined) payload.day_of_week = data.dayOfWeek
    if (data.openTime !== undefined) payload.open_time = data.openTime
    if (data.closeTime !== undefined) payload.close_time = data.closeTime

    const { data: updatedData, error } = await supabase
      .from('business_hours')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw new Error(`Erro ao atualizar horário de funcionamento: ${error.message}`)
    return mapRowParaBusinessHours(updatedData)
  }
}
