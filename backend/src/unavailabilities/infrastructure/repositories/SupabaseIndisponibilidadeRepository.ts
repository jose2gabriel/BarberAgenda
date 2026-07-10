import { supabase } from '../../../shared/database/supabase'
import { Indisponibilidade } from '../../domain/entidades/Indisponibilidade'
import { IIndisponibilidadeRepository } from '../../domain/interfaces/IIndisponibilidadeRepository'

function mapRowParaIndisponibilidade(row: any): Indisponibilidade {
  return {
    id: row.id,
    professionalId: row.professional_id,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    reason: row.reason,
    createdAt: row.created_at,
  }
}

export class SupabaseIndisponibilidadeRepository implements IIndisponibilidadeRepository {
  async criar(dados: Omit<Indisponibilidade, 'id' | 'createdAt'>): Promise<Indisponibilidade> {
    const { data, error } = await supabase
      .from('unavailabilities')
      .insert({
        professional_id: dados.professionalId,
        starts_at: dados.startsAt,
        ends_at: dados.endsAt,
        reason: dados.reason,
      })
      .select('*')
      .single()

    if (error) throw new Error(`Erro ao criar indisponibilidade: ${error.message}`)
    return mapRowParaIndisponibilidade(data)
  }

  async remover(id: string, professionalId: string): Promise<void> {
    const { error } = await supabase
      .from('unavailabilities')
      .delete()
      .eq('id', id)
      .eq('professional_id', professionalId)

    if (error) throw new Error(`Erro ao remover indisponibilidade: ${error.message}`)
  }

  async buscarPorId(id: string, professionalId: string): Promise<Indisponibilidade | null> {
    const { data, error } = await supabase
      .from('unavailabilities')
      .select('*')
      .eq('id', id)
      .eq('professional_id', professionalId)
      .maybeSingle()

    if (error) throw new Error(`Erro ao buscar indisponibilidade por id: ${error.message}`)
    return data ? mapRowParaIndisponibilidade(data) : null
  }

  async listarPorProfissional(professionalId: string): Promise<Indisponibilidade[]> {
    const { data, error } = await supabase
      .from('unavailabilities')
      .select('*')
      .eq('professional_id', professionalId)
      .order('starts_at', { ascending: true })

    if (error) throw new Error(`Erro ao listar indisponibilidades do profissional: ${error.message}`)
    return (data ?? []).map(mapRowParaIndisponibilidade)
  }

  async existeConflito(professionalId: string, startsAt: string, endsAt: string): Promise<boolean> {
    // Sobreposição de intervalos: existe conflito se algum período
    // registrado começa antes do fim do novo período E termina depois
    // do início dele.
    const { data, error } = await supabase
      .from('unavailabilities')
      .select('id')
      .eq('professional_id', professionalId)
      .lt('starts_at', endsAt)
      .gt('ends_at', startsAt)
      .limit(1)

    if (error) throw new Error(`Erro ao verificar conflito de indisponibilidade: ${error.message}`)
    return (data?.length ?? 0) > 0
  }
}
