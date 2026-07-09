import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api, ApiError } from '../../../shared/lib/api'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { ErrorMessage } from '../../../shared/ui/ErrorMessage'
import { SuccessMessage } from '../../../shared/ui/SuccessMessage'

const recoverPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

type RecoverPasswordFormData = z.infer<typeof recoverPasswordSchema>

export function RecoverPasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RecoverPasswordFormData>({ resolver: zodResolver(recoverPasswordSchema) })

  async function onSubmit(data: RecoverPasswordFormData) {
    try {
      const { message } = await api.post<{ message: string }>('/auth/recover-password', data)
      setSuccessMessage(message)
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Não foi possível enviar o link. Tente novamente.'
      setError('root', { message })
    }
  }

  // A resposta é sempre genérica (exista ou não o e-mail) — anti-enumeração,
  // ver SolicitarRecuperacaoSenhaUseCase no backend.
  if (successMessage) {
    return <SuccessMessage>{successMessage}</SuccessMessage>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="E-mail"
        type="email"
        placeholder="voce@email.com"
        error={errors.email?.message}
        {...register('email')}
      />

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        Enviar link de recuperação
      </Button>
    </form>
  )
}
