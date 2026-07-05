import { PasswordResetToken } from '../entidades/PasswordResetToken'

export interface IPasswordResetTokenRepository {
  criar(dados: { userId: string; token: string; expiresAt: string }): Promise<PasswordResetToken>
  buscarPorToken(token: string): Promise<PasswordResetToken | null>
  marcarComoUsado(id: string): Promise<void>
  invalidarTokensAtivos(userId: string): Promise<void>
}
