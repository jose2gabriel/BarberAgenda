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
| Frontend | HTML, CSS, TypeScript, Vite |
| Backend | Node.js + Express |
| Autenticação | JWT implementado no backend |
| Banco de Dados | PostgreSQL hospedado no Supabase |
| Hospedagem | Vercel (frontend) |
| Controle de Versão | Git + GitHub |

## Módulos do Sistema

O sistema é dividido internamente em módulos com isolamento lógico e responsabilidades bem definidas:

| Módulo | Responsabilidade |
|--------|-----------------|
| Usuarios | Autenticação, perfil, permissões (JWT) |
| Barbeiros | Cadastro, agenda, disponibilidade |
| Servicos | Catálogo, preços, duração |
| Agendamentos | Criação, validação de conflitos, notificações (Observer) |
| Barbershops | Multi-tenant, gestão da barbearia pelo owner (ADR-007) |

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
