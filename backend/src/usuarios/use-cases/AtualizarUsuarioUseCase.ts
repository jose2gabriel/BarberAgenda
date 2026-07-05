import bcrypt from 'bcrypt'
import { IUsuarioRepository } from '../domain/interfaces/IUsuarioRepository'
import { IAtualizarUsuarioUseCase } from '../domain/interfaces/IAtualizarUsuarioUseCase'
import { AtualizacaoDTO } from '../adapters/dtos/UsuarioDTO'
import { UsuarioPublico, paraUsuarioPublico } from '../domain/entidades/Usuario'
import { AppError } from '../../shared/errors/AppError'

/**
 * RF019 — Atualização de Dados.
 * Usuário pode atualizar nome e telefone livremente. E-mail não pode ser
 * alterado (usuarios.md). Para trocar a senha, é obrigatório informar a
 * senha atual correta (validação de negócio adicional — o Zod só garante
 * que o campo foi enviado, não que a senha bate).
 */
export class AtualizarUsuarioUseCase implements IAtualizarUsuarioUseCase {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  async executar(id: string, dados: AtualizacaoDTO): Promise<UsuarioPublico> {
    const usuario = await this.usuarioRepository.buscarPorId(id)

    if (!usuario) {
      throw new AppError('Usuário não encontrado.', 404, 'USER_NOT_FOUND')
    }

    const payload: Partial<{ name: string; phone: string; passwordHash: string }> = {}

    if (dados.name !== undefined) payload.name = dados.name
    if (dados.phone !== undefined) payload.phone = dados.phone

    if (dados.newPassword) {
      // O schema (atualizacaoSchema) já garante que currentPassword veio
      // junto com newPassword — aqui validamos se ela está correta.
      const senhaAtualValida = await bcrypt.compare(dados.currentPassword!, usuario.passwordHash)

      if (!senhaAtualValida) {
        throw new AppError('Senha atual incorreta.', 401, 'INVALID_CURRENT_PASSWORD')
      }

      payload.passwordHash = await bcrypt.hash(dados.newPassword, 10)
    }

    if (Object.keys(payload).length === 0) {
      // Nada para atualizar — devolve o usuário como está, sem tocar no banco.
      return paraUsuarioPublico(usuario)
    }

    const usuarioAtualizado = await this.usuarioRepository.atualizar(id, payload)

    return paraUsuarioPublico(usuarioAtualizado)
  }
}
