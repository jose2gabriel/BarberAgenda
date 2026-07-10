export interface CadastrarServicoDTO {
  name: string
  description?: string
  durationMinutes: number
  price: number
  barbershopId: string
  ownerId: string
}

export interface AtualizarServicoDTO {
  name?: string
  description?: string
  durationMinutes?: number
  price?: number
  barbershopId: string
}

export interface ServicoResponseDTO {
  id: string
  barbershopId: string
  name: string
  description: string | null
  durationMinutes: number
  price: number
  createdAt: string
}
