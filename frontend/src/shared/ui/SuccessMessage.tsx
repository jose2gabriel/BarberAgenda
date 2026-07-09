export function SuccessMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-success/10 border border-success/30 text-success text-sm rounded-lg px-4 py-3">
      {children}
    </div>
  )
}
