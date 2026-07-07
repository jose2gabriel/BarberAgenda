export interface CriarBarbeariaDTO {
  name: string
  address: string
  phone: string
  ownerId: string
}

export interface AtualizarBarbeariaDTO {
  name?: string
  address?: string
  phone?: string
}

export interface BarbeariaResponseDTO {
  id: string
  name: string
  address: string
  phone: string
  ownerId: string
  createdAt: string
  updatedAt: string
}
