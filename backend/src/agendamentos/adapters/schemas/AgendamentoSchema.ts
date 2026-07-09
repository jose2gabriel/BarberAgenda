import { z } from 'zod'

export const criarAgendamentoSchema = z.object({
  professionalId: z.string().uuid('Selecione um profissional válido'),
  serviceId: z.string().uuid('Selecione um serviço válido'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (use YYYY-MM-DD)'),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Horário inválido (use HH:mm)'),
})
