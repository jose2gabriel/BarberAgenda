import { Link } from 'react-router-dom'
import { Card } from '../shared/ui/Card'
import { RecoverPasswordForm } from '../features/auth/ui/RecoverPasswordForm'

export function RecoverPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <Card className="w-full max-w-sm flex flex-col gap-6 shadow-xl shadow-black/5">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-lg">
            BA
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Recuperar senha</h1>
            <p className="text-text-secondary text-sm">
              Informe seu e-mail e enviaremos um link para redefinir sua senha
            </p>
          </div>
        </div>

        <RecoverPasswordForm />

        <p className="text-center text-sm text-text-secondary">
          Lembrou a senha?{' '}
          <Link to="/login" className="text-accent font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </Card>
    </div>
  )
}
