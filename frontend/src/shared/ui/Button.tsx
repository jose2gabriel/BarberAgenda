interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:
      'bg-gradient-to-b from-accent to-red-700 hover:to-red-600 text-white shadow-sm shadow-accent/20 hover:shadow-md hover:shadow-accent/25',
    secondary: 'bg-transparent border border-accent text-accent hover:bg-accent hover:text-white',
    danger: 'bg-red-800 hover:bg-red-900 text-white shadow-sm shadow-red-900/20',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}
