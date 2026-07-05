import { z } from 'zod'

export const cadastroSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(150),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido').max(20),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
})

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export const atualizacaoSchema = z.object({
  name: z.string().min(2).max(150).optional(),
  phone: z.string().min(10).max(20).optional(),
  currentPassword: z.string().min(1).optional(),
  newPassword: z.string().min(8).optional(),
}).refine(
  (data) => !data.newPassword || !!data.currentPassword,
  { message: 'Informe a senha atual para definir uma nova senha.', path: ['currentPassword'] }
)

export const esqueciSenhaSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

export const redefinirSenhaSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  newPassword: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
})