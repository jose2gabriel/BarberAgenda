import { IProfissionalRepository } from '../domain/interfaces/IProfissionalRepository'
import { IAtualizarProfissionalUseCase } from '../domain/interfaces/IAtualizarProfissionalUseCase'
import { AtualizarProfissionalDTO, ProfissionalResponseDTO } from '../adapters/dtos/ProfissionalDTO'
import { IUsuarioRepository } from '../../usuarios/domain/interfaces/IUsuarioRepository'
import { IBarbeariaRepository } from '../../barbershops/domain/interfaces/IBarbeariaRepository'
import { AppError } from '../../shared/errors/AppError'

/**
 * Edição de profissional pelo owner (nome, telefone, especialidade).
 * E-mail e senha não são editáveis por aqui — são dados de conta do
 * próprio profissional (RF019, /users/me).
 */
export class AtualizarProfissionalUseCase implements IAtualizarProfissionalUseCase {
  constructor(
    private readonly profissionalRepository: IProfissionalRepository,
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly barbeariaRepository: IBarbeariaRepository
  ) {}

  async executar(dados: AtualizarProfissionalDTO): Promise<ProfissionalResponseDTO> {
    const profissional = await this.profissionalRepository.buscarCompletoPorId(
      dados.professionalId,
      dados.barbershopId
    )

    if (!profissional) {
      throw new AppError('Profissional não encontrado.', 404, 'PROFESSIONAL_NOT_FOUND')
    }

    const barbearia = await this.barbeariaRepository.buscarPorId(dados.barbershopId)

    if (barbearia?.ownerId !== dados.ownerId) {
      throw new AppError('Você não tem permissão para acessar este recurso.', 403, 'FORBIDDEN')
    }

    if (dados.specialty !== undefined) {
      await this.profissionalRepository.atualizar(dados.professionalId, { specialty: dados.specialty })
    }

    if (dados.name !== undefined || dados.phone !== undefined) {
      await this.usuarioRepository.atualizar(profissional.userId, {
        name: dados.name,
        phone: dados.phone,
      })
    }

    const profissionalAtualizado = await this.profissionalRepository.buscarCompletoPorId(
      dados.professionalId,
      dados.barbershopId
    )
    const usuarioAtualizado = await this.usuarioRepository.buscarPorId(profissional.userId)

    return {
      id: profissionalAtualizado!.id,
      barbershopId: profissionalAtualizado!.barbershopId,
      specialty: profissionalAtualizado!.specialty,
      createdAt: profissionalAtualizado!.createdAt,
      usuario: {
        id: usuarioAtualizado!.id,
        name: usuarioAtualizado!.name,
        email: usuarioAtualizado!.email,
        phone: usuarioAtualizado!.phone,
        role: usuarioAtualizado!.role,
      },
    }
  }
}
