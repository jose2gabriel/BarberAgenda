import bcrypt from 'bcrypt'
import { IUsuarioRepository } from '../domain/interfaces/IUsuarioRepository'
import { IAutenticarUsuarioUseCase } from '../domain/interfaces/IAutenticarUsuarioUseCase'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'
import { LoginDTO, LoginResponseDTO } from '../adapters/dtos/UsuarioDTO'
import { paraUsuarioPublico } from '../domain/entidades/Usuario'
import { construirRolesUsuario } from './shared/construirRolesUsuario'
import { assinarToken } from '../../shared/utils/jwt'
import { AppError } from '../../shared/errors/AppError'

export class AutenticarUsuarioUseCase implements IAutenticarUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly barbeariaRepository: IBarbeariaRepository,
    private readonly profissionalRepository: IProfissionalRepository
  ) {}

  async executar(dados: LoginDTO): Promise<LoginResponseDTO> {
    const email = dados.email.trim().toLowerCase()
    const usuario = await this.usuarioRepository.buscarPorEmail(email)

    // Credenciais incorretas retornam 401 sem indicar qual campo está errado (usuarios.md)
    if (!usuario) {
      throw new AppError('E-mail ou senha inválidos.', 401, 'INVALID_CREDENTIALS')
    }

    const senhaValida = await bcrypt.compare(dados.password, usuario.passwordHash)

    if (!senhaValida) {
      throw new AppError('E-mail ou senha inválidos.', 401, 'INVALID_CREDENTIALS')
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