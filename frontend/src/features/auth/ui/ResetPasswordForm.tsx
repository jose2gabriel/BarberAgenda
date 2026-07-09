import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { api, ApiError } from '../../../shared/lib/api'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { ErrorMessage } from '../../../shared/ui/ErrorMessage'

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmNewPassword'],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm({ token }: { token: string }) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormData>({ resolver: zodResolver(resetPasswordSchema) })

  async function onSubmit(data: ResetPasswordFormData) {
    try {
      await api.patch('/auth/reset-password', { token, newPassword: data.newPassword })
      navigate('/login')
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Não foi possível redefinir a senha. Tente novamente.'
      setError('root', { message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Nova senha"
        type="password"
        placeholder="••••••••"
        error={errors.newPassword?.message}
        {...register('newPassword')}
      />
      <Input
        label="Confirmar nova senha"
        type="password"
        placeholder="••••••••"
        error={errors.confirmNewPassword?.message}
        {...register('confirmNewPassword')}
      />

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        Redefinir senha
      </Button>
    </form>
  )
}
