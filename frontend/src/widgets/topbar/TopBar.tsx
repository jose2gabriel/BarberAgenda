import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useSidebarState } from '../sidebar/SidebarContext'

/**
 * Faixa fina só pra alternar a sidebar retrátil — não duplica
 * logo/usuário/sair, que já vivem na sidebar.
 */
export function TopBar() {
  const { collapsed, toggle } = useSidebarState()
  const Icon = collapsed ? PanelLeftOpen : PanelLeftClose

  return (
    <div className="h-14 border-b border-border flex items-center px-4 bg-primary">
      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
        className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:bg-secondary hover:text-text-primary transition-colors"
      >
        <Icon size={18} strokeWidth={1.75} />
      </button>
    </div>
  )
}
