import { NavLink, useNavigate } from 'react-router-dom'
import {
  Store,
  Calendar,
  User,
  Pencil,
  Users,
  Scissors,
  Clock,
  RefreshCw,
  CalendarClock,
  Ban,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from 'lucide-react'
import { useAuth } from '../../features/auth/model/useAuth'
import { useActiveBarbershop } from '../../features/barbershop/model/ActiveBarbershopContext'
import { useSidebarState } from './SidebarContext'
import { Button } from '../../shared/ui/Button'
import { Logo } from '../../shared/ui/Logo'

interface SidebarLinkProps {
  to: string
  icon: LucideIcon
  label: string
  collapsed: boolean
  end?: boolean
}

function SidebarLink({ to, icon: Icon, label, collapsed, end }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          collapsed ? 'justify-center' : ''
        } ${isActive ? 'bg-accent text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`
      }
    >
      <Icon size={18} strokeWidth={1.75} className="shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  )
}

function SectionLabel({ children, collapsed }: { children: string; collapsed: boolean }) {
  if (collapsed) return <div className="h-px bg-white/10 mx-2 my-2" />
  return <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-white/40">{children}</p>
}

/**
 * Sidebar global das telas autenticadas (renderizada por ProtectedRoute).
 * Retrátil (ver SidebarContext) e diferenciada por papel:
 * - Todo mundo: Painel, Barbearias, Meus agendamentos, Meu perfil.
 * - Owner: só "Minhas barbearias" até ele selecionar uma (ver
 *   ActiveBarbershopContext); depois disso, viram atalhos diretos da
 *   barbearia ativa (editar, profissionais, serviços, horários).
 * - Profissional: Minha agenda/Indisponibilidade aparecem direto, sem
 *   seleção — ele só tem uma barbearia por regra de negócio. Fica no
 *   mesmo grupo "Sua barbearia" do owner, não numa seção separada.
 */
export function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { activeBarbershopId } = useActiveBarbershop()
  const { collapsed, toggle } = useSidebarState()
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  const ehOwner = !!user?.roles.includes('owner')
  const ehProfissional = !!user?.roles.includes('profissional')

  return (
    <aside
      className={`${collapsed ? 'w-16' : 'w-60'} shrink-0 bg-dark min-h-screen flex flex-col transition-all duration-200`}
    >
      <div
        className={`py-6 flex items-center border-b border-white/10 ${
          collapsed ? 'flex-col gap-3 px-0' : 'justify-between px-5'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Logo size="sm" />
          {!collapsed && <span className="font-bold text-lg text-white truncate">Barber Agenda</span>}
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ToggleIcon size={16} strokeWidth={1.75} />
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-3 py-6 overflow-y-auto">
        <SidebarLink to="/barbershops" icon={Store} label="Barbearias" collapsed={collapsed} />
        <SidebarLink to="/appointments" icon={Calendar} label="Meus agendamentos" collapsed={collapsed} />
        <SidebarLink to="/profile" icon={User} label="Meu perfil" collapsed={collapsed} />

        {(ehOwner || ehProfissional) && (
          <>
            <SectionLabel collapsed={collapsed}>Sua barbearia</SectionLabel>

            {ehOwner &&
              (activeBarbershopId ? (
                <>
                  <SidebarLink
                    to={`/owner/barbershops/${activeBarbershopId}`}
                    icon={Pencil}
                    label="Editar barbearia"
                    collapsed={collapsed}
                    end
                  />
                  <SidebarLink
                    to={`/owner/barbershops/${activeBarbershopId}/professionals`}
                    icon={Users}
                    label="Profissionais"
                    collapsed={collapsed}
                  />
                  <SidebarLink
                    to={`/owner/barbershops/${activeBarbershopId}/services`}
                    icon={Scissors}
                    label="Serviços"
                    collapsed={collapsed}
                  />
                  <SidebarLink
                    to={`/owner/barbershops/${activeBarbershopId}/hours`}
                    icon={Clock}
                    label="Horários"
                    collapsed={collapsed}
                  />
                  <SidebarLink
                    to="/owner/barbershops"
                    icon={RefreshCw}
                    label="Trocar barbearia"
                    collapsed={collapsed}
                    end
                  />
                </>
              ) : (
                <SidebarLink to="/owner/barbershops" icon={Store} label="Minhas barbearias" collapsed={collapsed} />
              ))}

            {ehProfissional && (
              <>
                <SidebarLink
                  to="/professional/schedule"
                  icon={CalendarClock}
                  label="Minha agenda"
                  collapsed={collapsed}
                />
                <SidebarLink
                  to="/professional/unavailability"
                  icon={Ban}
                  label="Indisponibilidade"
                  collapsed={collapsed}
                />
              </>
            )}
          </>
        )}
      </nav>

      <div className={`px-3 py-6 border-t border-white/10 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <button
            type="button"
            onClick={handleLogout}
            title="Sair"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-accent border border-accent hover:bg-accent hover:text-white transition-colors"
          >
            <LogOut size={18} strokeWidth={1.75} />
          </button>
        ) : (
          <Button variant="secondary" size="sm" onClick={handleLogout} className="w-full justify-center">
            Sair
          </Button>
        )}
      </div>
    </aside>
  )
}
