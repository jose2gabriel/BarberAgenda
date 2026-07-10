import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { ErrorMessage } from '../../../shared/ui/ErrorMessage'
import { ApiError } from '../../../shared/lib/api'
import type { Service } from '../../../entities/service/types'

const editServiceSchema = z.object({
  name: z.string().min(2, 'Nome do serviço deve ter pelo menos 2 caracteres').max(150),
  description: z.string().max(500).optional(),
  durationMinutes: z
    .number({ message: 'Informe um número' })
    .int('Duração deve ser um número inteiro de minutos')
    .positive('Duração deve ser maior que zero'),
  price: z.number({ message: 'Informe um número' }).nonnegative('Preço não pode ser negativo'),
})

type EditServiceFormData = z.infer<typeof editServiceSchema>

interface EditServiceFormProps {
  service: Service
  onUpdate: (dados: EditServiceFormData) => Promise<unknown>
  onSuccess: () => void
  onCancel: () => void
}

export function EditServiceForm({ service, onUpdate, onSuccess, onCancel }: EditServiceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditServiceFormData>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      name: service.name,
      description: service.description ?? '',
      durationMinutes: service.durationMinutes,
      price: service.price,
    },
  })

  async function onSubmit(dados: EditServiceFormData) {
    try {
      await onUpdate(dados)
      onSuccess()
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Não foi possível atualizar. Tente novamente.'
      setError('root', { message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Input label="Nome do serviço" error={errors.name?.message} {...register('name')} />
      <Input label="Descrição" error={errors.description?.message} {...register('description')} />
      <Input
        label="Duração (minutos)"
        type="number"
        error={errors.durationMinutes?.message}
        {...register('durationMinutes', { valueAsNumber: true })}
      />
      <Input
        label="Preço (R$)"
        type="number"
        step="0.01"
        error={errors.price?.message}
        {...register('price', { valueAsNumber: true })}
      />

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      <div className="flex gap-2">
        <Button type="submit" size="sm" loading={isSubmitting} className="justify-center">
          Salvar
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={onCancel} className="justify-center">
          Cancelar
        </Button>
      </div>
    </form>
  )
}
