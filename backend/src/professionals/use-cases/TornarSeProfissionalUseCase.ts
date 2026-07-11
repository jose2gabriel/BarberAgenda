import { IProfissionalRepository } from '../domain/interfaces/IProfissionalRepository'
import { ITornarSeProfissionalUseCase } from '../domain/interfaces/ITornarSeProfissionalUseCase'
import { TornarSeProfissionalDTO } from '../adapters/dtos/TornarSeProfissionalDTO'
import { ProfissionalResponseDTO } from '../adapters/dtos/ProfissionalDTO'
import { IUsuarioRepository } from '../../usuarios/domain/interfaces/IUsuarioRepository'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'
import { AppError } from '../../shared/errors/AppError'

/**
 * Owner se auto-cadastra como profissional na própria barbearia — reaproveita
 * a mesma conta (user_id), diferente de CadastrarProfissionalUseCase, que
 * sempre cria uma conta nova para contratar alguém de fora. Um usuário só
 * pode ser profissional em uma única barbearia (barbershops.md), então
 * bloqueia se ele já tiver um vínculo de profissional em qualquer lugar.
 */
export class TornarSeProfissionalUseCase implements ITornarSeProfissionalUseCase {
  constructor(
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly barbeariaRepository: IBarbeariaRepository
  ) {}

  async executar(dados: TornarSeProfissionalDTO): Promise<ProfissionalResponseDTO> {
    const barbearia = await this.barbeariaRepository.buscarPorId(dados.barbershopId)

    if (!barbearia) {
      throw new AppError('Barbearia não encontrada.', 404, 'BARBERSHOP_NOT_FOUND')
    }

    if (barbearia.ownerId !== dados.ownerId) {
      throw new AppError('Você não tem permissão para acessar este recurso.', 403, 'FORBIDDEN')
    }

    const jaEhProfissional = await this.profissionalRepository.buscarPorUserId(dados.ownerId)

    if (jaEhProfissional) {
      throw new AppError('Você já é profissional em uma barbearia.', 409, 'ALREADY_PROFESSIONAL')
    }

    const usuario = await this.usuarioRepository.buscarPorId(dados.ownerId)

    if (!usuario) {
      throw new AppError('Usuário não encontrado.', 404, 'USER_NOT_FOUND')
    }

    const profissionalCriado = await this.profissionalRepository.criar({
      userId: usuario.id,
      barbershopId: dados.barbershopId,
      specialty: dados.specialty ?? null,
    })

    return {
      id: profissionalCriado.id,
      barbershopId: profissionalCriado.barbershopId,
      specialty: profissionalCriado.specialty,
      createdAt: profissionalCriado.createdAt,
      usuario: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        phone: usuario.phone,
        role: usuario.role,
      },
    }
  }
}
