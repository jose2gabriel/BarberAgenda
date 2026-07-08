import { z } from 'zod'

export const CriarHorarioSchema = z.object({
  barbershopId: z.string().uuid(),
  dayOfWeek: z.number().int().min(0).max(6),
  openTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:mm)"),
  closeTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:mm)"),
})

export type CriarHorarioDTO = z.infer<typeof CriarHorarioSchema>
