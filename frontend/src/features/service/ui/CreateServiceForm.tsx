import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { ErrorMessage } from '../../../shared/ui/ErrorMessage'
import { ApiError } from '../../../shared/lib/api'

const createServiceSchema = z.object({
  name: z.string().min(2, 'Nome do serviço deve ter pelo menos 2 caracteres').max(150),
  description: z.string().max(500).optional(),
  durationMinutes: z
    .number({ message: 'Informe um número' })
    .int('Duração deve ser um número inteiro de minutos')
    .positive('Duração deve ser maior que zero'),
  price: z.number({ message: 'Informe um número' }).nonnegative('Preço não pode ser negativo'),
})

type CreateServiceFormData = z.infer<typeof createServiceSchema>

interface CreateServiceFormProps {
  onCreate: (dados: CreateServiceFormData) => Promise<unknown>
  onSuccess: () => void
}

export function CreateServiceForm({ onCreate, onSuccess }: CreateServiceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateServiceFormData>({ resolver: zodResolver(createServiceSchema) })

  async function onSubmit(dados: CreateServiceFormData) {
    try {
      await onCreate(dados)
      onSuccess()
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Não foi possível cadastrar. Tente novamente.'
      setError('root', { message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Nome do serviço" placeholder="Corte + Barba" error={errors.name?.message} {...register('name')} />
      <Input
        label="Descrição (opcional)"
        placeholder="Detalhes do serviço"
        error={errors.description?.message}
        {...register('description')}
      />
      <Input
        label="Duração (minutos)"
        type="number"
        placeholder="30"
        error={errors.durationMinutes?.message}
        {...register('durationMinutes', { valueAsNumber: true })}
      />
      <Input
        label="Preço (R$)"
        type="number"
        step="0.01"
        placeholder="40.00"
        error={errors.price?.message}
        {...register('price', { valueAsNumber: true })}
      />

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        Adicionar serviço
      </Button>
    </form>
  )
}
