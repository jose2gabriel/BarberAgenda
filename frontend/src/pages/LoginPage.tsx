import { Link } from 'react-router-dom'
import { Card } from '../shared/ui/Card'
import { Logo } from '../shared/ui/Logo'
import { LoginForm } from '../features/auth/ui/LoginForm'

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <Link to="/" className="text-accent text-sm font-medium hover:underline">
          ← Voltar
        </Link>

        <Card className="flex flex-col gap-6 shadow-xl shadow-black/5">
          <div className="flex flex-col items-center text-center gap-3">
            <Logo size="lg" />
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Entrar</h1>
              <p className="text-text-secondary text-sm">Acesse sua conta Barber Agenda</p>
            </div>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-text-secondary">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-accent font-semibold hover:underline">
              Cadastre-se
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
