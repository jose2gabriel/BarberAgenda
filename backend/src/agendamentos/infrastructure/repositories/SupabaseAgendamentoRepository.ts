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
}
