export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-error/10 border border-error/30 text-error text-sm rounded-lg px-4 py-3">
      {children}
    </div>
  )
}
