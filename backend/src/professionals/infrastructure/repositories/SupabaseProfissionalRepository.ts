import { supabase } from '../../../shared/database/supabase'
import { Profissional, ProfissionalPublico } from '../../domain/entidades/Profissional'
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

function mapRowParaProfissionalPublico(row: any): ProfissionalPublico {
  const usuario = Array.isArray(row.users) ? row.users[0] : row.users

  return {
    id: row.id,
    barbershopId: row.barbershop_id,
    specialty: row.specialty,
    createdAt: row.created_at,
    name: usuario?.name ?? '',
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

  async listarPorBarbershopId(barbershopId: string): Promise<ProfissionalPublico[]> {
    const { data, error } = await supabase
      .from('professionals')
      .select('id, barbershop_id, specialty, created_at, users(name)')
      .eq('barbershop_id', barbershopId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(`Erro ao listar profissionais: ${error.message}`)
    return (data ?? []).map(mapRowParaProfissionalPublico)
  }
}
