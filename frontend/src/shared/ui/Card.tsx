export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-secondary border border-border rounded-xl p-6 ${className}`}>
      {children}
    </div>
  )
}
