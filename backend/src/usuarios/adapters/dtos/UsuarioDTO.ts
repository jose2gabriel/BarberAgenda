// modules/usuarios/adapters/UsuarioDTO.ts
import { z } from 'zod'
import { cadastroSchema, loginSchema, atualizacaoSchema, esqueciSenhaSchema, redefinirSenhaSchema } from '../schemas/UsuarioSchema'
import { Role } from '../../domain/entidades/Usuario'

// DTOs de entrada — inferidos do Zod, sem retrabalho manual (coding-standards.md)
export type CadastroDTO = z.infer<typeof cadastroSchema>
export type LoginDTO = z.infer<typeof loginSchema>
export type AtualizacaoDTO = z.infer<typeof atualizacaoSchema>
export type EsqueciSenhaDTO = z.infer<typeof esqueciSenhaSchema>
export type RedefinirSenhaDTO = z.infer<typeof redefinirSenhaSchema>

// DTO de saída — o que a API expõe. Nunca inclui passwordHash.
export interface UsuarioResponseDTO {
  id: string
  name: string
  email: string
  phone: string
  role: Role
  roles: Role[]
  createdAt: string
  updatedAt: string
}

// DTO de resposta do login — token + dados públicos do usuário
export interface LoginResponseDTO {
  token: string
  usuario: UsuarioResponseDTO
}