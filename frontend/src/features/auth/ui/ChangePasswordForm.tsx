import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { ErrorMessage } from '../../../shared/ui/ErrorMessage'
import { SuccessMessage } from '../../../shared/ui/SuccessMessage'
import { ApiError } from '../../../shared/lib/api'

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Informe a senha atual'),
  newPassword: z.string().min(8, 'Nova senha deve ter pelo menos 8 caracteres'),
})

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

interface ChangePasswordFormProps {
  onUpdate: (dados: ChangePasswordFormData) => Promise<unknown>
}

export function ChangePasswordForm({ onUpdate }: ChangePasswordFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<ChangePasswordFormData>({ resolver: zodResolver(changePasswordSchema) })

  async function onSubmit(dados: ChangePasswordFormData) {
    try {
      await onUpdate(dados)
      reset()
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Não foi possível trocar a senha. Tente novamente.'
      setError('root', { message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Senha atual"
        type="password"
        error={errors.currentPassword?.message}
        {...register('currentPassword')}
      />
      <Input label="Nova senha" type="password" error={errors.newPassword?.message} {...register('newPassword')} />

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
      {isSubmitSuccessful && !errors.root && <SuccessMessage>Senha alterada com sucesso.</SuccessMessage>}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        Trocar senha
      </Button>
    </form>
  )
}
