import { supabase } from '../../../shared/database/supabase'
import { PasswordResetToken } from '../../domain/entidades/PasswordResetToken'
import { IPasswordResetTokenRepository } from '../../domain/interfaces/IPasswordResetTokenRepository'

function mapRowParaToken(row: any): PasswordResetToken {
  return {
    id: row.id,
    userId: row.user_id,
    token: row.token,
    expiresAt: row.expires_at,
    used: row.used,
  }
}

// Usa a tabela `password_resets` já existente em 01_create_tables.sql
export class SupabasePasswordResetTokenRepository implements IPasswordResetTokenRepository {
  async criar(dados: { userId: string; token: string; expiresAt: string }): Promise<PasswordResetToken> {
    const { data, error } = await supabase
      .from('password_resets')
      .insert({
        user_id: dados.userId,
        token: dados.token,
        expires_at: dados.expiresAt,
      })
      .select('*')
      .single()

    if (error) throw new Error(`Erro ao criar token de recuperação: ${error.message}`)
    return mapRowParaToken(data)
  }

  async buscarPorToken(token: string): Promise<PasswordResetToken | null> {
    const { data, error } = await supabase
      .from('password_resets')
      .select('*')
      .eq('token', token)
      .maybeSingle()

    if (error) throw new Error(`Erro ao buscar token de recuperação: ${error.message}`)
    return data ? mapRowParaToken(data) : null
  }

  async marcarComoUsado(id: string): Promise<void> {
    const { error } = await supabase
      .from('password_resets')
      .update({ used: true })
      .eq('id', id)

    if (error) throw new Error(`Erro ao marcar token como usado: ${error.message}`)
  }

  // Invalida (marca como usado) qualquer token ainda ativo do usuário, pra
  // que só o token mais recente emitido continue válido.
  async invalidarTokensAtivos(userId: string): Promise<void> {
    const { error } = await supabase
      .from('password_resets')
      .update({ used: true })
      .eq('user_id', userId)
      .eq('used', false)

    if (error) throw new Error(`Erro ao invalidar tokens antigos: ${error.message}`)
  }
}
