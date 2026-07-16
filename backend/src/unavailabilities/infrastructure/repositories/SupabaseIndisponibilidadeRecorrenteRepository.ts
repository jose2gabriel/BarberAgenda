import { supabase } from '../../../shared/database/supabase'
import { IndisponibilidadeRecorrente } from '../../domain/entidades/IndisponibilidadeRecorrente'
import { IIndisponibilidadeRecorrenteRepository } from '../../domain/interfaces/IIndisponibilidadeRecorrenteRepository'

function mapRowParaIndisponibilidadeRecorrente(row: any): IndisponibilidadeRecorrente {
  return {
    id: row.id,
    professionalId: row.professional_id,
    dayOfWeek: row.day_of_week,
    startTime: row.start_time,
    endTime: row.end_time,
    reason: row.reason,
    createdAt: row.created_at,
  }
}

export class SupabaseIndisponibilidadeRecorrenteRepository implements IIndisponibilidadeRecorrenteRepository {
  async criar(dados: Omit<IndisponibilidadeRecorrente, 'id' | 'createdAt'>): Promise<IndisponibilidadeRecorrente> {
    const { data, error } = await supabase
      .from('recurring_unavailabilities')
      .insert({
        professional_id: dados.professionalId,
        day_of_week: dados.dayOfWeek,
        start_time: dados.startTime,
        end_time: dados.endTime,
        reason: dados.reason,
      })
      .select('*')
      .single()

    if (error) throw new Error(`Erro ao criar indisponibilidade recorrente: ${error.message}`)
    return mapRowParaIndisponibilidadeRecorrente(data)
  }

  async remover(id: string, professionalId: string): Promise<void> {
    const { error } = await supabase
      .from('recurring_unavailabilities')
      .delete()
      .eq('id', id)
      .eq('professional_id', professionalId)

    if (error) throw new Error(`Erro ao remover indisponibilidade recorrente: ${error.message}`)
  }

  async buscarPorId(id: string, professionalId: string): Promise<IndisponibilidadeRecorrente | null> {
    const { data, error } = await supabase
      .from('recurring_unavailabilities')
      .select('*')
      .eq('id', id)
      .eq('professional_id', professionalId)
      .maybeSingle()

    if (error) throw new Error(`Erro ao buscar indisponibilidade recorrente por id: ${error.message}`)
    return data ? mapRowParaIndisponibilidadeRecorrente(data) : null
  }

  async listarPorProfissional(professionalId: string): Promise<IndisponibilidadeRecorrente[]> {
    const { data, error } = await supabase
      .from('recurring_unavailabilities')
      .select('*')
      .eq('professional_id', professionalId)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true })

    if (error) throw new Error(`Erro ao listar indisponibilidades recorrentes do profissional: ${error.message}`)
    return (data ?? []).map(mapRowParaIndisponibilidadeRecorrente)
  }

  async existeConflito(
    professionalId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from('recurring_unavailabilities')
      .select('id')
      .eq('professional_id', professionalId)
      .eq('day_of_week', dayOfWeek)
      .lt('start_time', endTime)
      .gt('end_time', startTime)
      .limit(1)

    if (error) throw new Error(`Erro ao verificar conflito de indisponibilidade recorrente: ${error.message}`)
    return (data?.length ?? 0) > 0
  }
}
