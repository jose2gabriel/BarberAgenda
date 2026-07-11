interface LogoProps {
  size?: 'sm' | 'lg'
}

const sizes = {
  sm: 'w-9 h-9',
  lg: 'w-12 h-12',
}

export function Logo({ size = 'sm' }: LogoProps) {
  return <img src="/logo.png" alt="Barber Agenda" className={`${sizes[size]} object-contain`} />
}
