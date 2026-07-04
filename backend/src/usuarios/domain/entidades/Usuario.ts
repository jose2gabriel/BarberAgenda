// modules/usuarios/domain/Usuario.ts
export type Role = 'cliente' | 'profissional' | 'owner'

export interface Usuario {
  id: string
  name: string
  email: string
  phone: string
  passwordHash: string
  role: Role
  createdAt: string
  updatedAt: string
}

export type UsuarioPublico = Omit<Usuario, 'passwordHash'>

export function paraUsuarioPublico(usuario: Usuario): UsuarioPublico {
  const { passwordHash, ...usuarioPublico } = usuario
  return usuarioPublico
}