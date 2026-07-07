import { Barbearia } from '../entidades/Barbearia'

export interface IListarBarbeariasUseCase {
  executar(): Promise<Barbearia[]>
}
