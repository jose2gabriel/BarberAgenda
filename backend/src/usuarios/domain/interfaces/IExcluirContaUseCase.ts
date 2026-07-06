export interface IExcluirContaUseCase {
  execute(id: string): Promise<void>
}
