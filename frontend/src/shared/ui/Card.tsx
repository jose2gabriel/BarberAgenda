export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-secondary border border-border rounded-xl p-6 shadow-sm shadow-black/[0.03] ${className}`}>
      {children}
    </div>
  )
}
