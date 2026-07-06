import { supabase } from '../../../shared/database/supabase'
import { Barbearia } from '../../domain/entidades/Barbearia'
import { IBarbeariaRepository } from '../../domain/interfaces/IBarbeariaRepository'

function mapRowParaBarbearia(row: any): Barbearia {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    phone: row.phone,
    ownerId: row.owner_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export class SupabaseBarbeariaRepository implements IBarbeariaRepository {
  async criar(dados: Omit<Barbearia, 'id' | 'createdAt' | 'updatedAt'>): Promise<Barbearia> {
    const { data, error } = await supabase
      .from('barbershops')
      .insert({
        name: dados.name,
        address: dados.address,
        phone: dados.phone,
        owner_id: dados.ownerId,
      })
      .select('*')
      .single()

    if (error) throw new Error(`Erro ao criar barbearia: ${error.message}`)
    return mapRowParaBarbearia(data)
  }

  async buscarPorOwnerId(ownerId: string): Promise<Barbearia | null> {
    const { data, error } = await supabase
      .from('barbershops')
      .select('*')
      .eq('owner_id', ownerId)
      .maybeSingle()

    if (error) throw new Error(`Erro ao buscar barbearia por ownerId: ${error.message}`)
    return data ? mapRowParaBarbearia(data) : null
  }
}
