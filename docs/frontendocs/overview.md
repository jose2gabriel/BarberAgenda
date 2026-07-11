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
│   │   ├── App.tsx
│   │   └── ProtectedRoute.tsx  ← protege rotas por role e renderiza a Sidebar globalmente
│   │
│   ├── pages/                  ← composição de widgets/features por página (ver pages.md)
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx, RegisterPage.tsx, RegisterBarbershopPage.tsx
│   │   ├── RecoverPasswordPage.tsx, ResetPasswordPage.tsx
│   │   ├── BarbershopsPage.tsx, BarbershopDetailPage.tsx
│   │   ├── NewAppointmentPage.tsx, AppointmentsPage.tsx
│   │   ├── ProfessionalSchedulePage.tsx, UnavailabilityPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── OwnerBarbershopsPage.tsx, OwnerBarbershopDetailPage.tsx,
│   │       OwnerProfessionalsPage.tsx, OwnerServicesPage.tsx, OwnerBusinessHoursPage.tsx
│   │
│   ├── widgets/                ← blocos visuais compostos por features
│   │   └── sidebar/             ← Sidebar.tsx (nav global, retrátil) + SidebarContext.tsx
│   │
│   ├── features/               ← funcionalidades com lógica de negócio
│   │   ├── auth/                ← login, cadastro, logout, perfil
│   │   │   ├── ui/               ← LoginForm.tsx, RegisterForm.tsx, ...
│   │   │   └── model/            ← AuthContext.tsx, useAuth.ts
│   │   ├── agendamento/          ← criar, cancelar, reagendar
│   │   │   └── model/            ← useAgendamento.ts
│   │   ├── barbershop/           ← listar/gerenciar barbearias
│   │   │   ├── ui/
│   │   │   └── model/            ← useBarbeiro.ts, ActiveBarbershopContext.tsx
│   │   ├── professional/         ← gerenciar profissionais (owner)
│   │   │   └── ui/
│   │   └── service/               ← gerenciar serviços (owner)
│   │       └── ui/
│   │
│   ├── entities/               ← tipos de domínio (types.ts por entidade)
│   │   ├── usuario/, appointment/, barbershop/, professional/, service/
│   │
│   └── shared/                 ← código reutilizável sem lógica de negócio
│       ├── ui/                 ← Button, Input, Card, Avatar, StatusBadge, Logo, LoadingSpinner...
│       ├── schemas/            ← schemas Zod compartilhados
│       └── lib/
│           └── api.ts          ← client HTTP (base URL do backend)
```

Ícones em toda a UI usam `lucide-react` (monocromáticos, sem emoji).

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

- [Páginas do Sistema](./pages.md)
- [Custom Hooks](./custom-hooks.md)
- [Design System](./design-system.md)
- [Formulários e Validação](./forms-validation.md)
- [Metodologia de Uso de IA](./ai-usage.md)
