export interface CadastrarProfissionalDTO {
  name: string
  email: string
  phone: string
  password: string
  specialty?: string
  barbershopId: string
  ownerId: string
}

export interface AtualizarProfissionalDTO {
  barbershopId: string
  professionalId: string
  ownerId: string
  name?: string
  phone?: string
  specialty?: string
}

export interface RemoverProfissionalDTO {
  barbershopId: string
  professionalId: string
  ownerId: string
}

export interface ProfissionalResponseDTO {
  id: string
  barbershopId: string
  specialty: string | null
  createdAt: string
  usuario: {
    id: string
    name: string
    email: string
    phone: string
    role: string
  }
}
