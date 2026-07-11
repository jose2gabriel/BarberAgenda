import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/model/useAuth'
import { UpdateProfileForm } from '../features/auth/ui/UpdateProfileForm'
import { ChangePasswordForm } from '../features/auth/ui/ChangePasswordForm'
import { Card } from '../shared/ui/Card'
import { Button } from '../shared/ui/Button'
import { ErrorMessage } from '../shared/ui/ErrorMessage'
import { ApiError } from '../shared/lib/api'

export function ProfilePage() {
  const { user, atualizarUsuario, excluirConta } = useAuth()
  const navigate = useNavigate()
  const [excluindo, setExcluindo] = useState(false)
  const [excluirErro, setExcluirErro] = useState<string | null>(null)

  async function handleExcluirConta() {
    const confirmado = window.confirm(
      'Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.'
    )
    if (!confirmado) return

    setExcluindo(true)
    setExcluirErro(null)
    try {
      await excluirConta()
      navigate('/')
    } catch (err) {
      setExcluirErro(err instanceof ApiError ? err.message : 'Não foi possível excluir sua conta. Tente novamente.')
    } finally {
      setExcluindo(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-primary">
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Meu perfil</h1>

        <div className="flex flex-col gap-8">
          <Card className="flex flex-col gap-4">
            <h2 className="font-semibold text-text-primary">Dados da conta</h2>
            <p className="text-text-secondary text-sm">
              E-mail: <span className="text-text-primary">{user.email}</span>
            </p>
            <p className="text-text-secondary text-sm">
              Perfil: <span className="text-text-primary">{user.roles.join(', ')}</span>
            </p>
          </Card>

          <Card className="flex flex-col gap-4">
            <h2 className="font-semibold text-text-primary">Editar dados</h2>
            <UpdateProfileForm user={user} onUpdate={atualizarUsuario} />
          </Card>

          <Card className="flex flex-col gap-4">
            <h2 className="font-semibold text-text-primary">Trocar senha</h2>
            <ChangePasswordForm onUpdate={atualizarUsuario} />
          </Card>

          <Card className="flex flex-col gap-4 border-error/40">
            <h2 className="font-semibold text-error">Excluir conta</h2>
            <p className="text-text-secondary text-sm">
              Essa ação é permanente e não pode ser desfeita.
            </p>
            {excluirErro && <ErrorMessage>{excluirErro}</ErrorMessage>}
            <Button variant="danger" loading={excluindo} onClick={handleExcluirConta} className="w-full justify-center">
              Excluir minha conta
            </Button>
          </Card>
        </div>
      </main>
    </div>
  )
}
