export type Role = 'cliente' | 'profissional' | 'owner'

export interface Usuario {
  id: string
  name: string
  email: string
  phone: string
  role: Role
  roles: Role[]
  createdAt: string
  updatedAt: string
}
