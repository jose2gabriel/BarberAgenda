import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../shared/ui/Card'
import { Logo } from '../shared/ui/Logo'
import { RegisterForm } from '../features/auth/ui/RegisterForm'

type TipoConta = 'cliente' | 'barbeiro'

export function RegisterPage() {
  const [tipoConta, setTipoConta] = useState<TipoConta>('cliente')
  const navigate = useNavigate()

  function handleTipoConta(tipo: TipoConta) {
    setTipoConta(tipo)
    if (tipo === 'barbeiro') {
      navigate('/register-barbershop')
    }
  }

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
              <h1 className="text-2xl font-bold text-text-primary">Criar conta</h1>
              <p className="text-text-secondary text-sm">Cadastre-se na Barber Agenda</p>
            </div>
          </div>

          <div className="flex gap-2 rounded-lg bg-secondary p-1">
            <button
              type="button"
              onClick={() => handleTipoConta('cliente')}
              className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
                tipoConta === 'cliente' ? 'bg-accent text-white' : 'text-text-secondary'
              }`}
            >
              Sou cliente
            </button>
            <button
              type="button"
              onClick={() => handleTipoConta('barbeiro')}
              className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
                tipoConta === 'barbeiro' ? 'bg-accent text-white' : 'text-text-secondary'
              }`}
            >
              Sou barbeiro
            </button>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-text-secondary">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-accent font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
