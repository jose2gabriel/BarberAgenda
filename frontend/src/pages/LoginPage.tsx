import { Card } from '../shared/ui/Card'
import { LoginForm } from '../features/auth/ui/LoginForm'

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-sm flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Entrar</h1>
          <p className="text-text-secondary text-sm">Acesse sua conta Barber Agenda</p>
        </div>

        <LoginForm />
      </Card>
    </div>
  )
}
