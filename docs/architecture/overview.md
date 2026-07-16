# Visão Geral da Arquitetura — Barber Agenda

## Decisão Arquitetural

O Barber Agenda adota uma combinação de três padrões em níveis distintos de granularidade:

| Nível | Padrão | Justificativa |
|-------|--------|---------------|
| Macro | Monolito Modular | Simplicidade operacional, custo baixo, equipe pequena |
| Médio | Clean Architecture + Vertical Slices | Protege o domínio de agendamento, alta coesão por módulo |
| Micro | MVVM via React | Interfaces reativas, atualização dinâmica de horários |

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React + TypeScript + Vite, Tailwind CSS, React Router |
| Backend | Node.js + Express |
| Autenticação | JWT implementado no backend |
| Banco de Dados | PostgreSQL hospedado no Supabase |
| Hospedagem | Vercel (frontend) + Render (backend) |
| Controle de Versão | Git + GitHub |

## Módulos do Sistema

O sistema é dividido internamente em módulos com isolamento lógico e responsabilidades bem definidas:

| Módulo | Responsabilidade |
|--------|-----------------|
| usuarios | Autenticação, perfil, permissões (roles calculadas: cliente / profissional / owner) |
| professionals | Cadastro de profissionais na barbearia |
| services | Catálogo de serviços, preços, duração |
| unavailabilities | Indisponibilidade dos profissionais (RF024, RF025) |
| agendamentos | Motor de agendamento: criação, conflitos, cancelamento, notificações |
| barbershops | Multi-tenant, gestão da barbearia pelo owner (ADR-007) |

## Fluxo de Dados

```
Cliente (React/MVVM)
       │
       ▼
  Express API (Node.js)
       │
  ┌────┴────┐
  │         │
Clean Arch  JWT Auth
Use Cases   Middleware
  │
  ▼
PostgreSQL (Supabase)
```

## Documentos Relacionados

- [Monolito Modular](./monolith-modular.md)
- [Clean Architecture](./clean-architecture.md)
- [Vertical Slices](./vertical-slices.md)
- [ADR-001](../adr/ADR-001-monolith-modular.md)
- [ADR-002](../adr/ADR-002-clean-architecture.md)
