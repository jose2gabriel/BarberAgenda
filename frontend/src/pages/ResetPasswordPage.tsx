import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '../shared/ui/Card'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { Logo } from '../shared/ui/Logo'
import { ResetPasswordForm } from '../features/auth/ui/ResetPasswordForm'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <Card className="w-full max-w-sm flex flex-col gap-6 shadow-xl shadow-black/5">
        <div className="flex flex-col items-center text-center gap-3">
          <Logo size="lg" />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Redefinir senha</h1>
            <p className="text-text-secondary text-sm">Escolha uma nova senha para sua conta</p>
          </div>
        </div>

        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <ErrorMessage>Link inválido ou incompleto. Solicite uma nova recuperação de senha.</ErrorMessage>
        )}

        <p className="text-center text-sm text-text-secondary">
          <Link to="/login" className="text-accent font-semibold hover:underline">
            Voltar para o login
          </Link>
        </p>
      </Card>
    </div>
  )
}
