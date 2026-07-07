import { IBarbeariaRepository } from '../domain/interfaces/IBarbeariaRepository'
import { IBuscarBarbeariaPorIdUseCase } from '../domain/interfaces/IBuscarBarbeariaPorIdUseCase'
import { Barbearia } from '../domain/entidades/Barbearia'
import { AppError } from '../../shared/errors/AppError'

export class BuscarBarbeariaPorIdUseCase implements IBuscarBarbeariaPorIdUseCase {
  constructor(private readonly barbeariaRepository: IBarbeariaRepository) {}

  async executar(id: string): Promise<Barbearia> {
    const barbearia = await this.barbeariaRepository.buscarPorId(id)

    if (!barbearia) {
      throw new AppError('Barbearia não encontrada.', 404, 'BARBERSHOP_NOT_FOUND')
    }

    return barbearia
  }
}
