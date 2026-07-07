export interface Servico {
  id: string
  barbershopId: string
  name: string
  description: string | null
  durationMinutes: number
  price: number
  createdAt: string
}
