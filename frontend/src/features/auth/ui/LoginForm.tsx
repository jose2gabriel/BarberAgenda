import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../model/useAuth'
import { Input } from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { ErrorMessage } from '../../../shared/ui/ErrorMessage'
import { ApiError } from '../../../shared/lib/api'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data: LoginFormData) {
    try {
      await login(data.email, data.password)
      navigate('/dashboard')
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Não foi possível entrar. Tente novamente.'
      setError('root', { message })
    }
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
      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <Link to="/recover-password" className="text-sm text-accent font-medium hover:underline self-end -mt-2">
        Esqueceu a senha?
      </Link>

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      <Button type="submit" loading={isSubmitting} className="w-full justify-center">
        Entrar
      </Button>
    </form>
  )
}
