interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <input
        className={`
          bg-secondary border rounded-lg px-4 py-2.5 text-white
          placeholder-text-secondary outline-none transition-all
          focus:border-accent
          ${error ? 'border-error' : 'border-border'}
        `}
        {...props}
      />
      {error && <span className="text-error text-xs">{error}</span>}
    </div>
  )
}
