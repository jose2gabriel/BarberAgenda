import bcrypt from 'bcrypt'
import { IUsuarioRepository } from '../domain/interfaces/IUsuarioRepository'
import { IAtualizarUsuarioUseCase } from '../domain/interfaces/IAtualizarUsuarioUseCase'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'
import { AtualizacaoDTO, UsuarioResponseDTO } from '../adapters/dtos/UsuarioDTO'
import { paraUsuarioPublico } from '../domain/entidades/Usuario'
import { construirRolesUsuario } from './shared/construirRolesUsuario'
import { AppError } from '../../shared/errors/AppError'

/**
 * RF019 — Atualização de Dados.
 * Usuário pode atualizar nome e telefone livremente. E-mail não pode ser
 * alterado (usuarios.md). Para trocar a senha, é obrigatório informar a
 * senha atual correta (validação de negócio adicional — o Zod só garante
 * que o campo foi enviado, não que a senha bate).
 */
export class AtualizarUsuarioUseCase implements IAtualizarUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly barbeariaRepository: IBarbeariaRepository,
    private readonly profissionalRepository: IProfissionalRepository
  ) {}

  async executar(id: string, dados: AtualizacaoDTO): Promise<UsuarioResponseDTO> {
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

    const usuarioFinal =
      Object.keys(payload).length === 0
        ? usuario // Nada para atualizar — devolve o usuário como está, sem tocar no banco.
        : await this.usuarioRepository.atualizar(id, payload)

    const roles = await construirRolesUsuario(usuarioFinal, this.barbeariaRepository, this.profissionalRepository)

    return { ...paraUsuarioPublico(usuarioFinal), roles }
  }
}
