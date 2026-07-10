import { Indisponibilidade } from '../entidades/Indisponibilidade'

export interface IListarIndisponibilidadesUseCase {
  executar(professionalId: string): Promise<Indisponibilidade[]>
}
