import { ProfissionalPublico } from '../entidades/Profissional'

export interface IListarProfissionaisUseCase {
  executar(barbershopId: string): Promise<ProfissionalPublico[]>
}
