import { Barbearia } from '../entidades/Barbearia'

export interface IBuscarBarbeariaPorIdUseCase {
  executar(id: string): Promise<Barbearia>
}
