export interface MeuProfissionalResponseDTO {
  id: string
  barbershopId: string
  specialty: string | null
}

export interface IBuscarMeuProfissionalUseCase {
  executar(userId: string): Promise<MeuProfissionalResponseDTO>
}
