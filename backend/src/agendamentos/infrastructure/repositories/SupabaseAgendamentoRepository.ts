import { supabase } from '../../../shared/database/supabase'
import { Agendamento } from '../../domain/entidades/Agendamento'
import { IAgendamentoRepository } from '../../domain/interfaces/IAgendamentoRepository'

function mapRowParaAgendamento(row: any): Agendamento {
  return {
    id: row.id,
    clientId: row.client_id,
    professionalId: row.professional_id,
    serviceId: row.service_id,
    barbershopId: row.barbershop_id,
    date: row.date,
    startTime: row.start_time,
    endTime: row.end_time,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export class SupabaseAgendamentoRepository implements IAgendamentoRepository {
  async listarPorProfissional(professionalId: string): Promise<Agendamento[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('professional_id', professionalId)
      .order('date', { ascending: true })
      .order('start_time', { ascending: true })

    if (error) throw new Error(`Erro ao listar agendamentos do profissional: ${error.message}`)
    return (data ?? []).map(mapRowParaAgendamento)
  }

  async criar(dados: Omit<Agendamento, 'id' | 'createdAt' | 'updatedAt'>): Promise<Agendamento> {
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        client_id: dados.clientId,
        professional_id: dados.professionalId,
        service_id: dados.serviceId,
        barbershop_id: dados.barbershopId,
        date: dados.date,
        start_time: dados.startTime,
        end_time: dados.endTime,
        status: dados.status,
      })
      .select('*')
      .single()

    if (error) throw new Error(`Erro ao criar agendamento: ${error.message}`)
    return mapRowParaAgendamento(data)
  }

  async existeConflito(
    professionalId: string,
    date: string,
    startTime: string,
    endTime: string,
    excludedId?: string
  ): Promise<boolean> {
    // Só agendamentos ativos ('agendado') bloqueiam — cancelados/concluídos
    // liberam o horário (RF008).
    let query = supabase
      .from('appointments')
      .select('id')
      .eq('professional_id', professionalId)
      .eq('date', date)
      .eq('status', 'agendado')
      .lt('start_time', endTime)
      .gt('end_time', startTime)

    if (excludedId) {
      query = query.neq('id', excludedId)
    }

    const { data, error } = await query.limit(1)

    if (error) throw new Error(`Erro ao verificar conflito de agendamento: ${error.message}`)
    return (data?.length ?? 0) > 0
  }

  async buscarPorId(id: string): Promise<Agendamento | null> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw new Error(`Erro ao buscar agendamento por ID: ${error.message}`)
    }
    return mapRowParaAgendamento(data)
  }

  async atualizar(id: string, dados: Partial<Agendamento>): Promise<Agendamento> {
    const updateData: any = {}
    if (dados.status) updateData.status = dados.status
    if (dados.date) updateData.date = dados.date
    if (dados.startTime) updateData.start_time = dados.startTime
    if (dados.endTime) updateData.end_time = dados.endTime

    const { data, error } = await supabase
      .from('appointments')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw new Error(`Erro ao atualizar agendamento: ${error.message}`)
    return mapRowParaAgendamento(data)
  }
}
