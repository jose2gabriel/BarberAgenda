import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../shared/ui/Card'
import { Logo } from '../shared/ui/Logo'
import { RegisterForm } from '../features/auth/ui/RegisterForm'
import { CreateBarbershopForm } from '../features/barbershop/ui/CreateBarbershopForm'
import { useAuth } from '../features/auth/model/useAuth'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import type { Barbershop } from '../entities/barbershop/types'

/**
 * Fluxo guiado: cadastro de usuário (passo 1) + criação da barbearia
 * (passo 2). Por baixo continua sendo POST /auth/register seguido de
 * POST /barbershops (RF031) — o usuário nasce "cliente" e só vira
 * "owner" ao concluir o passo 2, igual ao resto do sistema.
 */
export function RegisterBarbershopPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const { login, refreshUser } = useAuth()
  const { criarBarbearia } = useBarbeiro()
  const navigate = useNavigate()

  async function handleUsuarioCadastrado({ email, password }: { email: string; password: string }) {
    await login(email, password)
    setStep(2)
  }

  async function handleBarbeariaCriada(barbershop: Barbershop) {
    // O role vira "owner" no backend (RF031) — recarrega a sessão antes
    // de navegar, senão a página seguinte ainda veria o usuário como cliente.
    await refreshUser()
    navigate(`/owner/barbershops/${barbershop.id}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="w-full max-w-sm flex flex-col gap-4">
        {step === 1 ? (
          <Link to="/" className="text-accent text-sm font-medium hover:underline">
            ← Voltar
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-accent text-sm font-medium hover:underline text-left"
          >
            ← Voltar
          </button>
        )}

        <Card className="flex flex-col gap-6 shadow-xl shadow-black/5">
          <div className="flex flex-col items-center text-center gap-3">
            <Logo size="lg" />
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                {step === 1 ? 'Cadastre sua barbearia' : 'Configure sua barbearia'}
              </h1>
              <p className="text-text-secondary text-sm">
                {step === 1 ? 'Passo 1 de 2 — crie sua conta' : 'Passo 2 de 2 — dados da sua barbearia'}
              </p>
            </div>
          </div>

          {step === 1 ? (
            <RegisterForm onSuccess={handleUsuarioCadastrado} />
          ) : (
            <CreateBarbershopForm
              onCreate={criarBarbearia}
              onSuccess={handleBarbeariaCriada}
              submitLabel="Concluir cadastro"
            />
          )}

          {step === 1 && (
            <p className="text-center text-sm text-text-secondary">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-accent font-semibold hover:underline">
                Entrar
              </Link>
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
