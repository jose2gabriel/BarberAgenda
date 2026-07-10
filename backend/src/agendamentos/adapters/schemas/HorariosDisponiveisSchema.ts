import { z } from 'zod'

export const horariosDisponiveisQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (use YYYY-MM-DD).'),
  serviceId: z.string().uuid('serviceId inválido.'),
})
