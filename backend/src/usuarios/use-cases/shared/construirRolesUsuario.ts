import { Role, Usuario } from '../../domain/entidades/Usuario'
import { IBarbeariaRepository } from '../../../barbershops/domain/interfaces/IBarbeariaRepository'
import { IProfissionalRepository } from '../../../professionals/domain/interfaces/IProfissionalRepository'

/**
 * Calcula os papéis reais do usuário a partir do estado atual do banco, em
 * vez de depender só da coluna `users.role` (que é um valor único e não
 * reflete um owner que também atua como profissional, por exemplo).
 * `role` continua existindo à parte só como valor "principal"/de exibição.
 */
export async function construirRolesUsuario(
  usuario: Usuario,
  barbeariaRepository: IBarbeariaRepository,
  profissionalRepository: IProfissionalRepository
): Promise<Role[]> {
  const roles: Role[] = ['cliente']

  const [ehOwner, profissional] = await Promise.all([
    barbeariaRepository.existePorOwnerId(usuario.id),
    profissionalRepository.buscarPorUserId(usuario.id),
  ])

  if (ehOwner) roles.push('owner')
  if (profissional) roles.push('profissional')

  return roles
}
