import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { ErrorMessage } from '../../../shared/ui/ErrorMessage'
import { ApiError } from '../../../shared/lib/api'
import type { Barbershop } from '../../../entities/barbershop/types'

const createBarbershopSchema = z.object({
  name: z.string().min(3, 'Nome da barbearia deve ter pelo menos 3 caracteres'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
})

type CreateBarbershopFormData = z.infer<typeof createBarbershopSchema>

interface CreateBarbershopFormProps {
  onCreate: (dados: CreateBarbershopFormData) => Promise<Barbershop>
  onSuccess: (barbershop: Barbershop) => void
  submitLabel?: string
}

/**
 * Reaproveitado tanto no fluxo guiado de cadastro (RegisterBarbershopPage)
 * quanto na página /owner/barbershops (dono já logado criando mais uma
 * barbearia) — por isso a chamada à API (onCreate) vem de fora.
 */
export function CreateBarbershopForm({ onCreate, onSuccess, submitLabel = 'Criar barbearia' }: CreateBarbershopFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateBarbershopFormData>({ resolver: zodResolver(createBarbershopSchema) })

  async function onSubmit(dados: CreateBarbershopFormData) {
    try {
      const barbershop = await onCreate(dados)
      onSuccess(barbershop)
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Não foi possível criar a barbearia. Tente novamente.'
      setError('root', { message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Nome da barbearia"
        placeholder="Barbearia do João"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label="Endereço"
        placeholder="Rua Exemplo, 123"
        error={errors.address?.message}
        {...register('address')}
      />
      <Input label="Telefone" placeholder="86999999999" error={errors.phone?.message} {...register('phone')} />

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        {submitLabel}
      </Button>
    </form>
  )
}
