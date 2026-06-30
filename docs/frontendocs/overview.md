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

## Estrutura de Pastas

```
frontend/
├── src/
│   ├── components/        ← componentes reutilizáveis
│   │   ├── ui/            ← botões, inputs, cards (Design System)
│   │   └── forms/         ← formulários com React Hook Form
│   ├── hooks/             ← custom hooks
│   │   ├── useAuth.ts
│   │   ├── useAgendamento.ts
│   │   └── useBarbeiro.ts
│   ├── pages/             ← páginas da aplicação
│   ├── services/          ← chamadas à API REST do backend (fetch/axios)
│   ├── schemas/           ← schemas Zod compartilhados pelos formulários
│   └── lib/
│       └── api.ts         ← client HTTP configurado (base URL do backend)
```

---

## Documentos

- [Custom Hooks](./custom-hooks.md)
- [Design System](./design-system.md)
- [Formulários e Validação](./forms-validation.md)
- [Metodologia de Uso de IA](./ai-usage.md)
