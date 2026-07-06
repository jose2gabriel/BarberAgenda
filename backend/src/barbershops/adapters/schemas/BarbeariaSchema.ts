import { z } from 'zod'

export const criarBarbeariaSchema = z.object({
  name: z.string().min(3, 'Nome da barbearia deve ter pelo menos 3 caracteres'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
})
