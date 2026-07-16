interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
}

export function Select({ label, error, children, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <select
        className={`
          bg-white border rounded-lg px-4 py-2.5 text-text-primary
          outline-none transition-all
          focus:border-accent focus:ring-2 focus:ring-accent/20
          ${error ? 'border-error' : 'border-border'}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-error text-xs">{error}</span>}
    </div>
  )
}
