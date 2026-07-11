import { IUsuarioRepository } from '../domain/interfaces/IUsuarioRepository'
import { IRenovarTokenUseCase } from '../domain/interfaces/IRenovarTokenUseCase'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'
import { LoginResponseDTO } from '../adapters/dtos/UsuarioDTO'
import { paraUsuarioPublico } from '../domain/entidades/Usuario'
import { construirRolesUsuario } from './shared/construirRolesUsuario'
import { assinarToken } from '../../shared/utils/jwt'
import { AppError } from '../../shared/errors/AppError'

/**
 * Reemite o JWT do usuário já autenticado com os papéis (roles) recalculados
 * a partir do estado atual do banco. Necessário porque o token emitido no
 * login carrega um "retrato" dos papéis daquele momento — se o usuário
 * cria uma barbearia ou vira profissional depois, precisa desse endpoint
 * para o token (e o middleware `autorizar`) refletirem o novo estado sem
 * precisar digitar a senha de novo.
 */
export class RenovarTokenUseCase implements IRenovarTokenUseCase {
  constructor(
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly barbeariaRepository: IBarbeariaRepository,
    private readonly profissionalRepository: IProfissionalRepository
  ) {}

  async executar(usuarioId: string): Promise<LoginResponseDTO> {
    const usuario = await this.usuarioRepository.buscarPorId(usuarioId)

    if (!usuario) {
      throw new AppError('Usuário não encontrado.', 404, 'USER_NOT_FOUND')
    }

    const roles = await construirRolesUsuario(usuario, this.barbeariaRepository, this.profissionalRepository)

    const token = assinarToken({
      id: usuario.id,
      email: usuario.email,
      role: usuario.role,
      roles,
    })

    return { token, usuario: { ...paraUsuarioPublico(usuario), roles } }
  }
}
