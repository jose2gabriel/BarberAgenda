export interface IListarHorariosDisponiveisUseCase {
  executar(barbershopId: string, professionalId: string, date: string, serviceId: string): Promise<string[]>
}
