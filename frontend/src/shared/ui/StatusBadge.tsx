export type AppointmentStatus = 'agendado' | 'concluido' | 'cancelado'

const labels: Record<AppointmentStatus, string> = {
  agendado: 'Agendado',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
}

// Mapeamento de cores conforme docs/frontendocs/design-system.md
// (Success = "Status agendado, confirmações").
const styles: Record<AppointmentStatus, string> = {
  agendado: 'bg-success/15 text-success border-success/30',
  concluido: 'bg-border/40 text-text-secondary border-border',
  cancelado: 'bg-error/15 text-error border-error/30',
}

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}
