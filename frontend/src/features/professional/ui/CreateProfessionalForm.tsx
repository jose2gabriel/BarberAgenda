import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { ErrorMessage } from '../../../shared/ui/ErrorMessage'
import { ApiError } from '../../../shared/lib/api'

const createProfessionalSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(150),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido').max(20),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  specialty: z.string().max(100).optional(),
})

type CreateProfessionalFormData = z.infer<typeof createProfessionalSchema>

interface CreateProfessionalFormProps {
  onCreate: (dados: CreateProfessionalFormData) => Promise<unknown>
  onSuccess: () => void
}

export function CreateProfessionalForm({ onCreate, onSuccess }: CreateProfessionalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateProfessionalFormData>({ resolver: zodResolver(createProfessionalSchema) })

  async function onSubmit(dados: CreateProfessionalFormData) {
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
      <Input label="Nome" placeholder="Nome completo" error={errors.name?.message} {...register('name')} />
      <Input
        label="E-mail"
        type="email"
        placeholder="voce@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input label="Telefone" placeholder="86999999999" error={errors.phone?.message} {...register('phone')} />
      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label="Especialidade (opcional)"
        placeholder="Barba, corte..."
        error={errors.specialty?.message}
        {...register('specialty')}
      />

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        Adicionar profissional
      </Button>
    </form>
  )
}
