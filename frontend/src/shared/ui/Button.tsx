interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({ variant = 'primary', size = 'md', loading, children, ...props }: ButtonProps) {
  const base = 'rounded-lg font-semibold transition-all duration-200 flex items-center gap-2'

  const variants = {
    primary: 'bg-accent hover:bg-accent/90 text-white',
    secondary: 'bg-transparent border border-accent text-accent hover:bg-accent hover:text-white',
    danger: 'bg-red-800 hover:bg-red-900 text-white',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}
