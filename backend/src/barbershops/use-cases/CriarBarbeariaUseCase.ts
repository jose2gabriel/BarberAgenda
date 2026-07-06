import { IBarbeariaRepository } from '../domain/interfaces/IBarbeariaRepository'
import { ICriarBarbeariaUseCase } from '../domain/interfaces/ICriarBarbeariaUseCase'
import { CriarBarbeariaDTO, BarbeariaResponseDTO } from '../adapters/dtos/BarbeariaDTO'
import { IUsuarioRepository } from '../../usuarios/domain/interfaces/IUsuarioRepository'
import { AppError } from '../../shared/errors/AppError'

export class CriarBarbeariaUseCase implements ICriarBarbeariaUseCase {
  constructor(
    private readonly barbeariaRepository: IBarbeariaRepository,
    private readonly usuarioRepository: IUsuarioRepository
  ) {}

  async executar(dados: CriarBarbeariaDTO): Promise<BarbeariaResponseDTO> {
    const barbeariaExistente = await this.barbeariaRepository.buscarPorOwnerId(dados.ownerId)

    if (barbeariaExistente) {
      throw new AppError('Usuário já possui uma barbearia.', 409, 'USER_ALREADY_HAS_BARBERSHOP')
    }

    const barbeariaCriada = await this.barbeariaRepository.criar({
      name: dados.name,
      address: dados.address,
      phone: dados.phone,
      ownerId: dados.ownerId,
    })

    // RF031: Promove usuário a owner
    await this.usuarioRepository.atualizar(dados.ownerId, { role: 'owner' })

    return barbeariaCriada
  }
}
