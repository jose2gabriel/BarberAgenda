# Design System — Barber Agenda

> O professor exige um Design System próprio (vale 1,0 ponto).
> Define paleta de cores, tipografia e padrão de componentes.

---

## Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Primary | `#FFFFFF` | Fundo principal |
| Secondary | `#F9FAFB` | Fundo de cards |
| Accent | `#E94560` | Botões primários, destaques, links |
| Text Primary | `#1A1A2E` | Textos principais |
| Text Secondary | `#6B7280` | Textos secundários, placeholders |
| Success | `#4CAF50` | Status agendado, confirmações |
| Warning | `#FF9800` | Alertas |
| Error | `#F44336` | Erros de validação |
| Border | `#E5E7EB` | Bordas de inputs e cards |

> Tema claro — visual moderno e limpo para navegador, com destaques em vermelho (accent) para ações e links.

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
  className?: string
}

export function Button({ variant = 'primary', size = 'md', loading, children, className = '', ...props }: ButtonProps) {
  const base = 'rounded-lg font-semibold transition-all duration-200 flex items-center gap-2'

  const variants = {
    primary:   'bg-accent hover:bg-accent/90 text-white',
    secondary: 'bg-transparent border border-accent text-accent hover:bg-accent hover:text-white',
    danger:    'bg-red-800 hover:bg-red-900 text-white',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading || props.disabled} {...props}>
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
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <input
        className={`
          bg-white border rounded-lg px-4 py-2.5 text-text-primary
          placeholder-text-secondary outline-none transition-all
          focus:border-accent focus:ring-2 focus:ring-accent/20
          ${error ? 'border-error' : 'border-border'}
        `}
        {...props}
      />
      {error && <span className="text-error text-xs">{error}</span>}
    </div>
  )
}
```

### Card
```tsx
// src/shared/ui/Card.tsx
export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-secondary border border-border rounded-xl p-6 ${className}`}>
      {children}
    </div>
  )
}
```

---

## Tokens de Cor (Tailwind v4 — CSS-first)

O projeto usa Tailwind v4, que define tokens via `@theme` diretamente no CSS (`src/index.css`),
em vez de `tailwind.config.ts`:

```css
/* src/index.css */
@import 'tailwindcss';

@theme {
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --color-primary: #ffffff;
  --color-secondary: #f9fafb;
  --color-accent: #e94560;
  --color-text-primary: #1a1a2e;
  --color-text-secondary: #6b7280;
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-error: #f44336;
  --color-border: #e5e7eb;
}
```

---

## Consistência Visual

- Todo input tem label, placeholder e mensagem de erro no mesmo padrão
- Botões sempre têm estado de loading
- Cards sempre têm a mesma borda e fundo
- Espaçamento base: múltiplos de 4px (Tailwind padrão)
- Bordas arredondadas: `rounded-lg` (8px) para inputs, `rounded-xl` (12px) para cards
