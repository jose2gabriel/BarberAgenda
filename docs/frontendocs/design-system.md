# Design System — Barber Agenda

> O professor exige um Design System próprio (vale 1,0 ponto).
> Define paleta de cores, tipografia e padrão de componentes.

---

## Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Primary | `#FFFFFF` | Fundo principal |
| Secondary | `#F9FAFB` | Fundo de cards |
| Accent | `#DC2626` | Botões primários, CTAs, links, destaques de marca |
| Dark | `#1A1A1A` | Header/nav — contraste "barbearia" (preto + vermelho + branco) |
| Text Primary | `#1A1A2E` | Textos principais |
| Text Secondary | `#6B7280` | Textos secundários, placeholders |
| Success | `#4CAF50` | Status agendado, confirmações |
| Warning | `#FF9800` | Alertas |
| Error | `#F44336` | Erros de validação |
| Border | `#E5E7EB` | Bordas de inputs e cards |
| Selected | `#4F46E5` | Estado "selecionado/ativo" — cards de escolha (profissional/serviço/horário), nav ativa da sidebar, foco de input |

> Tema claro — visual moderno e limpo para navegador. Vermelho mais forte + faixa escura no header
> remetem à identidade visual clássica de barbearia (preto, vermelho e branco). **Vermelho nunca
> indica seleção** — só CTA/marca/perigo — pra não ser confundido com erro; "selecionado" usa
> sempre o indigo (`Selected`).

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
  const base = 'rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:   'bg-accent hover:bg-accent/90 text-white shadow-sm shadow-accent/20 hover:shadow-md hover:shadow-accent/25',
    secondary: 'bg-transparent border border-accent text-accent hover:bg-accent hover:text-white',
    danger:    'bg-red-800 hover:bg-red-900 text-white shadow-sm shadow-red-900/20',
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
          bg-white border rounded-xl px-4 py-2.5 text-text-primary
          placeholder-text-secondary outline-none transition-all
          focus:border-selected focus:ring-2 focus:ring-selected/20
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
    <div className={`bg-secondary border border-border rounded-xl p-6 shadow-sm shadow-black/[0.03] ${className}`}>
      {children}
    </div>
  )
}
```

### Select
```tsx
// src/shared/ui/Select.tsx — usado em FiltroAgendamentos.tsx (RF028)
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
}
```

> ⚠️ **Inconsistência conhecida:** `Select.tsx` ainda usa `border-accent`/`ring-accent` (vermelho)
> no foco e `rounded-lg` (8px), em vez de `border-selected`/`ring-selected` e `rounded-xl` como o
> resto do Design System — foi criado numa branch em paralelo, antes do padrão `--color-selected`
> existir. Ajustar quando mexer nesse componente de novo.

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
  --color-accent: #dc2626;
  --color-dark: #1a1a1a;
  --color-text-primary: #1a1a2e;
  --color-text-secondary: #6b7280;
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-error: #f44336;
  --color-border: #e5e7eb;
  --color-selected: #4f46e5;
}
```

Além do `@theme`, `index.css` define um `:focus-visible` global (outline em `--color-selected`)
pra garantir navegação por teclado visível em qualquer elemento focável, sem precisar repetir
classe de foco componente por componente.

---

## Consistência Visual

- Todo input tem label, placeholder e mensagem de erro no mesmo padrão
- Botões sempre têm estado de loading
- Cards sempre têm a mesma borda e fundo
- Espaçamento base: múltiplos de 4px (Tailwind padrão)
- Bordas arredondadas: `rounded-xl` (12px) em inputs, botões e cards — visual consistente em todo o app
- Estado "selecionado" (cards de escolha, nav ativa, foco de input) sempre em `--color-selected`
  (indigo), nunca em `--color-accent` (vermelho é só CTA/marca/perigo)
