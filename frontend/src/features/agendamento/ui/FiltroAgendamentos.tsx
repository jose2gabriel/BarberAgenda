import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select } from '../../../shared/ui/Select'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'

// RF028 — Histórico com filtros avançados (status, profissional e período).
const filtroAgendamentosSchema = z
  .object({
    status: z.enum(['todos', 'agendado', 'concluido', 'cancelado']),
    professionalId: z.string(),
    dateFrom: z.string(),
    dateTo: z.string(),
  })
  .refine((data) => !data.dateFrom || !data.dateTo || data.dateFrom <= data.dateTo, {
    message: 'A data inicial não pode ser depois da data final.',
    path: ['dateTo'],
  })

export type FiltroAgendamentosValues = z.infer<typeof filtroAgendamentosSchema>

export const filtrosPadrao: FiltroAgendamentosValues = {
  status: 'todos',
  professionalId: 'todos',
  dateFrom: '',
  dateTo: '',
}

interface ProfissionalOption {
  id: string
  name: string
}

interface FiltroAgendamentosProps {
  profissionais: ProfissionalOption[]
  onChange: (valores: FiltroAgendamentosValues) => void
}

export function FiltroAgendamentos({ profissionais, onChange }: FiltroAgendamentosProps) {
  // Guarda a versão mais recente do callback sem precisar recriar a
  // subscription do watch() a cada render do componente pai.
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<FiltroAgendamentosValues>({
    resolver: zodResolver(filtroAgendamentosSchema),
    defaultValues: filtrosPadrao,
  })

  useEffect(() => {
    const subscription = watch((valores) => {
      const resultado = filtroAgendamentosSchema.safeParse(valores)
      if (resultado.success) {
        onChangeRef.current(resultado.data)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <div className="bg-secondary border border-border rounded-xl p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select label="Status" error={errors.status?.message} {...register('status')}>
          <option value="todos">Todos</option>
          <option value="agendado">Agendado</option>
          <option value="concluido">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </Select>

        <Select label="Profissional" error={errors.professionalId?.message} {...register('professionalId')}>
          <option value="todos">Todos</option>
          {profissionais.map((profissional) => (
            <option key={profissional.id} value={profissional.id}>
              {profissional.name}
            </option>
          ))}
        </Select>

        <Input label="De" type="date" error={errors.dateFrom?.message} {...register('dateFrom')} />
        <Input label="Até" type="date" error={errors.dateTo?.message} {...register('dateTo')} />
      </div>

      <div className="mt-4">
        <Button type="button" variant="secondary" size="sm" onClick={() => reset(filtrosPadrao)}>
          Limpar filtros
        </Button>
      </div>
    </div>
  )
}
