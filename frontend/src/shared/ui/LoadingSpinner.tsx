interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-4',
}

export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <div
      className={`${sizes[size]} rounded-full border-border border-t-accent animate-spin`}
      role="status"
      aria-label="Carregando"
    />
  )
}
