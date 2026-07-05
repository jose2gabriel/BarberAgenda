import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { IUsuarioRepository } from '../domain/interfaces/IUsuarioRepository'
import { IPasswordResetTokenRepository } from '../domain/interfaces/IPasswordResetTokenRepository'
import { IRedefinirSenhaUseCase } from '../domain/interfaces/IRedefinirSenhaUseCase'
import { RedefinirSenhaDTO } from '../adapters/dtos/UsuarioDTO'
import { AppError } from '../../shared/errors/AppError'

/**
 * RF030 (etapa 2) — Redefinição de senha a partir do token recebido por e-mail.
 */
export class RedefinirSenhaUseCase implements IRedefinirSenhaUseCase {
  constructor(
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly tokenRepository: IPasswordResetTokenRepository
  ) {}

  async executar(dados: RedefinirSenhaDTO): Promise<{ message: string }> {
    const tokenHash = crypto.createHash('sha256').update(dados.token).digest('hex')
    const tokenRegistro = await this.tokenRepository.buscarPorToken(tokenHash)

    // Mensagem única para token inexistente/expirado/já usado — não damos
    // pista de qual dos casos é, mesma lógica anti-enumeration do login.
    if (
      !tokenRegistro ||
      tokenRegistro.used ||
      new Date(tokenRegistro.expiresAt).getTime() < Date.now()
    ) {
      throw new AppError('Token inválido ou expirado.', 400, 'INVALID_RESET_TOKEN')
    }

    const passwordHash = await bcrypt.hash(dados.newPassword, 10)
    await this.usuarioRepository.atualizar(tokenRegistro.userId, { passwordHash })
    await this.tokenRepository.marcarComoUsado(tokenRegistro.id)

    return { message: 'Senha redefinida com sucesso.' }
  }
}
