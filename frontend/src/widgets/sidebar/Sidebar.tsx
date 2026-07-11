import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/model/useAuth'
import { Button } from '../../shared/ui/Button'
import { Logo } from '../../shared/ui/Logo'

function linkClass({ isActive }: { isActive: boolean }) {
  return `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive ? 'bg-accent text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
  }`
}

/**
 * Sidebar global das telas autenticadas (renderizada por ProtectedRoute).
 * Os links de owner/profissional só aparecem pra quem tem esses papéis
 * em `user.roles` — um cliente comum só vê Painel/Barbearias/Meus
 * agendamentos/Meu perfil.
 */
export function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  const ehOwner = !!user?.roles.includes('owner')
  const ehProfissional = !!user?.roles.includes('profissional')

  return (
    <aside className="w-60 shrink-0 bg-dark min-h-screen flex flex-col">
      <div className="px-5 py-6 flex items-center gap-2 border-b border-white/10">
        <Logo size="sm" />
        <span className="font-bold text-lg text-white">Barber Agenda</span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-3 py-6">
        <NavLink to="/dashboard" className={linkClass} end>
          Painel
        </NavLink>
        <NavLink to="/barbershops" className={linkClass}>
          Barbearias
        </NavLink>
        <NavLink to="/appointments" className={linkClass}>
          Meus agendamentos
        </NavLink>
        {ehOwner && (
          <NavLink to="/owner/barbershops" className={linkClass}>
            Minhas barbearias
          </NavLink>
        )}
        {ehProfissional && (
          <NavLink to="/professional/schedule" className={linkClass}>
            Minha agenda
          </NavLink>
        )}
        {ehProfissional && (
          <NavLink to="/professional/unavailability" className={linkClass}>
            Indisponibilidade
          </NavLink>
        )}
        <NavLink to="/profile" className={linkClass}>
          Meu perfil
        </NavLink>
      </nav>

      <div className="px-3 py-6 border-t border-white/10">
        <Button variant="secondary" size="sm" onClick={handleLogout} className="w-full justify-center">
          Sair
        </Button>
      </div>
    </aside>
  )
}
