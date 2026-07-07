import { ProfissionalPublico } from '../entidades/Profissional'

export interface IBuscarProfissionalUseCase {
  executar(barbershopId: string, id: string): Promise<ProfissionalPublico>
}
