import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, type, ...props }: InputProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const ehSenha = type === 'password'
  const tipoReal = ehSenha && mostrarSenha ? 'text' : type

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <div className="relative">
        <input
          type={tipoReal}
          className={`
            w-full bg-white border rounded-xl px-4 py-2.5 text-text-primary
            placeholder-text-secondary outline-none transition-all
            focus:border-selected focus:ring-2 focus:ring-selected/20
            ${ehSenha ? 'pr-11' : ''}
            ${error ? 'border-error' : 'border-border'}
          `}
          {...props}
        />
        {ehSenha && (
          <button
            type="button"
            onClick={() => setMostrarSenha((v) => !v)}
            tabIndex={-1}
            aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {mostrarSenha ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
          </button>
        )}
      </div>
      {error && <span className="text-error text-xs">{error}</span>}
    </div>
  )
}
