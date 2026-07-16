import { z } from 'zod'

export const registrarIndisponibilidadeRecorrenteSchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:mm)'),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:mm)'),
    reason: z.string().max(255).optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'O horário de término deve ser depois do início.',
    path: ['endTime'],
  })
