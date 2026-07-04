# Design System — Barber Agenda

> O professor exige um Design System próprio (vale 1,0 ponto).
> Define paleta de cores, tipografia e padrão de componentes.

---

## Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Primary | `#1A1A2E` | Fundo principal, headers |
| Secondary | `#16213E` | Fundo de cards |
| Accent | `#E94560` | Botões primários, destaques |
| Text Primary | `#FFFFFF` | Textos principais |
| Text Secondary | `#A0A0B0` | Textos secundários, placeholders |
| Success | `#4CAF50` | Status agendado, confirmações |
| Warning | `#FF9800` | Alertas |
| Error | `#F44336` | Erros de validação |
| Border | `#2A2A4A` | Bordas de inputs e cards |

> Tema escuro — transmite modernidade e profissionalismo para o contexto de barbearia.

---

## Tipografia

| Uso | Fonte | Tamanho | Peso |
|-----|-------|---------|------|
| Títulos | Inter | 24–32px | 700 |
| Subtítulos | Inter | 18–20px | 600 |
| Corpo | Inter | 14–16px | 400 |
| Labels | Inter | 12px | 500 |
| Código | JetBrains Mono | 13px | 400 |

---

## Componentes Base

### Botão Primário
```tsx
// src/shared/ui/Button.tsx
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
    primary:   'bg-red-500 hover:bg-red-600 text-white',
    secondary: 'bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
    danger:    'bg-red-800 hover:bg-red-900 text-white',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]}`} disabled={loading || props.disabled} {...props}>
      {loading ? 'Carregando...' : children}
    </button>
  )
}
```

### Input
```tsx
// src/shared/ui/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <input
        className={`
          bg-[#16213E] border rounded-lg px-4 py-2.5 text-white
          placeholder-gray-500 outline-none transition-all
          focus:border-red-500
          ${error ? 'border-red-500' : 'border-[#2A2A4A]'}
        `}
        {...props}
      />
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  )
}
```

### Card
```tsx
// src/shared/ui/Card.tsx
export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-[#16213E] border border-[#2A2A4A] rounded-xl p-6 ${className}`}>
      {children}
    </div>
  )
}
```

---

## Variáveis Tailwind (tailwind.config.ts)

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary:   '#1A1A2E',
        secondary: '#16213E',
        accent:    '#E94560',
        border:    '#2A2A4A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

---

## Consistência Visual

- Todo input tem label, placeholder e mensagem de erro no mesmo padrão
- Botões sempre têm estado de loading
- Cards sempre têm a mesma borda e fundo
- Espaçamento base: múltiplos de 4px (Tailwind padrão)
- Bordas arredondadas: `rounded-lg` (8px) para inputs, `rounded-xl` (12px) para cards
