export interface IEncerrarSessaoUseCase {
  executar(): Promise<{ message: string }>
}
