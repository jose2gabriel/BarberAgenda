import { z } from 'zod'

export const registrarIndisponibilidadeSchema = z
  .object({
    startsAt: z.string().datetime({ message: 'Data/hora de início inválida (use ISO 8601).' }),
    endsAt: z.string().datetime({ message: 'Data/hora de término inválida (use ISO 8601).' }),
    reason: z.string().max(255).optional(),
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: 'A data/hora de término deve ser depois do início.',
    path: ['endsAt'],
  })
