import { IUsuarioRepository } from '../domain/interfaces/IUsuarioRepository'
import { IBuscarUsuarioUseCase } from '../domain/interfaces/IBuscarUsuarioUseCase'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'
import { IProfissionalRepository } from '../../professionals/domain/interfaces/IProfissionalRepository'
import { paraUsuarioPublico } from '../domain/entidades/Usuario'
import { UsuarioResponseDTO } from '../adapters/dtos/UsuarioDTO'
import { construirRolesUsuario } from './shared/construirRolesUsuario'
import { AppError } from '../../shared/errors/AppError'

export class BuscarUsuarioUseCase implements IBuscarUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly barbeariaRepository: IBarbeariaRepository,
    private readonly profissionalRepository: IProfissionalRepository
  ) {}

  async executar(id: string): Promise<UsuarioResponseDTO> {
    const usuario = await this.usuarioRepository.buscarPorId(id)

    if (!usuario) {
      throw new AppError('Usuário não encontrado.', 404, 'USER_NOT_FOUND')
    }

    const roles = await construirRolesUsuario(usuario, this.barbeariaRepository, this.profissionalRepository)

    return { ...paraUsuarioPublico(usuario), roles }
  }
}