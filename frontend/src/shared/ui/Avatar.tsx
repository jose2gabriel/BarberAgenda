interface AvatarProps {
  src?: string | null
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-base',
  lg: 'w-20 h-20 text-2xl',
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  if (src) {
    return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} />
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-secondary border border-border flex items-center justify-center font-semibold text-text-secondary`}
    >
      {getInitials(name)}
    </div>
  )
}
