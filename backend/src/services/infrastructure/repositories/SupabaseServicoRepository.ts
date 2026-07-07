import { supabase } from '../../../shared/database/supabase'
import { Servico } from '../../domain/entidades/Servico'
import { IServicoRepository } from '../../domain/interfaces/IServicoRepository'

function mapRowParaServico(row: any): Servico {
  return {
    id: row.id,
    barbershopId: row.barbershop_id,
    name: row.name,
    description: row.description,
    durationMinutes: row.duration_minutes,
    price: Number(row.price),
    createdAt: row.created_at,
  }
}

export class SupabaseServicoRepository implements IServicoRepository {
  async criar(dados: Omit<Servico, 'id' | 'createdAt'>): Promise<Servico> {
    const { data, error } = await supabase
      .from('services')
      .insert({
        barbershop_id: dados.barbershopId,
        name: dados.name,
        description: dados.description,
        duration_minutes: dados.durationMinutes,
        price: dados.price,
      })
      .select('*')
      .single()

    if (error) throw new Error(`Erro ao criar serviço: ${error.message}`)
    return mapRowParaServico(data)
  }

  async listarPorBarbershopId(barbershopId: string): Promise<Servico[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('barbershop_id', barbershopId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(`Erro ao listar serviços: ${error.message}`)
    return (data ?? []).map(mapRowParaServico)
  }
}
