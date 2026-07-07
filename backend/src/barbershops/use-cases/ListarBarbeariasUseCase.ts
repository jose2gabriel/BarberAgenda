import { IBarbeariaRepository } from '../domain/interfaces/IBarbeariaRepository'
import { IListarBarbeariasUseCase } from '../domain/interfaces/IListarBarbeariasUseCase'
import { Barbearia } from '../domain/entidades/Barbearia'

export class ListarBarbeariasUseCase implements IListarBarbeariasUseCase {
  constructor(private readonly barbeariaRepository: IBarbeariaRepository) {}

  async executar(): Promise<Barbearia[]> {
    return this.barbeariaRepository.listar()
  }
}
