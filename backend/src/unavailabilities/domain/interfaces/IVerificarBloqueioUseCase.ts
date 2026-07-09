export interface IVerificarBloqueioUseCase {
  executar(professionalId: string, startsAt: string, endsAt: string): Promise<boolean>
}
