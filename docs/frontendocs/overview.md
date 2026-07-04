# Frontend — Barber Agenda

> ⚠️ O frontend **não** se conecta diretamente ao Supabase. Toda comunicação passa
> pela API REST do backend (Node.js + Express), conforme ADR-005. O Supabase é
> acessado exclusivamente pelo backend.

## Stack

| Tecnologia | Uso |
|-----------|-----|
| React + Vite | Framework e build tool |
| TypeScript | Tipagem estática |
| React Hook Form | Gerenciamento de formulários |
| Zod | Validação de schemas (mesma regra do backend, duplicada no frontend para UX) |
| Tailwind CSS | Estilização |
| fetch / axios | Chamadas à API REST do backend |

---

## Estrutura de Pastas (Feature-Sliced Design)

Organização baseada em FSD — cada camada só pode importar das camadas abaixo dela.

```
frontend/
├── src/
│   ├── app/                    ← configuração global (rotas, providers, estilos)
│   │   └── App.tsx
│   │
│   ├── pages/                  ← composição de widgets por página
│   │   ├── LoginPage.tsx
│   │   ├── CadastroPage.tsx
│   │   ├── AgendamentoPage.tsx
│   │   ├── MeusAgendamentosPage.tsx
│   │   └── DashboardPage.tsx
│   │
│   ├── widgets/                ← blocos visuais compostos por features
│   │   ├── Header/
│   │   └── AgendaCalendar/
│   │
│   ├── features/               ← funcionalidades com lógica de negócio
│   │   ├── auth/               ← login, cadastro, logout
│   │   │   ├── ui/             ← LoginForm.tsx, CadastroForm.tsx
│   │   │   ├── model/          ← useAuth.ts
│   │   │   └── api/            ← authService.ts (chama o backend)
│   │   ├── agendamento/        ← criar, cancelar, reagendar
│   │   │   ├── ui/             ← AgendamentoForm.tsx, SlotPicker.tsx
│   │   │   ├── model/          ← useAgendamento.ts
│   │   │   └── api/            ← agendamentoService.ts
│   │   └── barbershop/         ← listar barbearias e profissionais
│   │       ├── ui/             ← BarbershopCard.tsx, ProfissionalList.tsx
│   │       ├── model/          ← useBarbeiro.ts
│   │       └── api/            ← barbershopService.ts
│   │
│   ├── entities/               ← tipos e interfaces de domínio
│   │   ├── usuario/
│   │   │   └── types.ts        ← interface User
│   │   ├── agendamento/
│   │   │   └── types.ts        ← interface Appointment
│   │   └── barbershop/
│   │       └── types.ts        ← interface Barbershop
│   │
│   └── shared/                 ← código reutilizável sem lógica de negócio
│       ├── ui/                 ← Button.tsx, Input.tsx, Card.tsx (Design System)
│       ├── schemas/            ← schemas Zod compartilhados
│       └── lib/
│           └── api.ts          ← client HTTP (base URL do backend)
```

## Regra de Importação FSD

```
app → pages → widgets → features → entities → shared
```

Cada camada só pode importar das camadas abaixo. Nunca ao contrário.

Exemplo correto:
```typescript
// features/agendamento/model/useAgendamento.ts
import { Appointment } from '../../../entities/agendamento/types'  ✅ entities está abaixo
import { api } from '../../../shared/lib/api'                       ✅ shared está abaixo
```

Exemplo errado:
```typescript
// shared/ui/Button.tsx
import { useAuth } from '../../features/auth/model/useAuth'  ❌ features está acima
```

---

## Documentos

- [Custom Hooks](./custom-hooks.md)
- [Design System](./design-system.md)
- [Formulários e Validação](./forms-validation.md)
- [Metodologia de Uso de IA](./ai-usage.md)
