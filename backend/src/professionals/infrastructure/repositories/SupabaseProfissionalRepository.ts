import { supabase } from '../../../shared/database/supabase'
import { Profissional } from '../../domain/entidades/Profissional'
import { IProfissionalRepository } from '../../domain/interfaces/IProfissionalRepository'

function mapRowParaProfissional(row: any): Profissional {
  return {
    id: row.id,
    userId: row.user_id,
    barbershopId: row.barbershop_id,
    specialty: row.specialty,
    createdAt: row.created_at,
  }
}

export class SupabaseProfissionalRepository implements IProfissionalRepository {
  async criar(dados: Omit<Profissional, 'id' | 'createdAt'>): Promise<Profissional> {
    const { data, error } = await supabase
      .from('professionals')
      .insert({
        user_id: dados.userId,
        barbershop_id: dados.barbershopId,
        specialty: dados.specialty,
      })
      .select('*')
      .single()

    if (error) throw new Error(`Erro ao criar profissional: ${error.message}`)
    return mapRowParaProfissional(data)
  }
}
