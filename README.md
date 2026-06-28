# Barber Agenda

Sistema web de agendamento para barbearias, desenvolvido como projeto da disciplina **Engenharia de Software II** — IFPI Piripiri, 2026.

**Grupo:** Silph Corp  
José Gabriel de Oliveira Farias · Geovany de Oliveira Silva Batista · Afonso Vanderlei da Silva · Paulo Henrique Sales Lima  
**Professor:** Mayllon Veras

---

## O que é

O Barber Agenda é uma aplicação web responsiva que substitui o agendamento manual feito por aplicativos de mensagens. Clientes agendam horários online, profissionais gerenciam sua agenda individual e administradores controlam o funcionamento da barbearia.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React + TypeScript + Vite |
| Backend | Node.js + Express |
| Autenticação | JWT (implementado no backend) |
| Banco de Dados | PostgreSQL via Supabase |
| Hospedagem Frontend | Vercel |

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/jose2gabriel/BarberAgenda.git
cd BarberAgenda

# Backend
cd backend
cp .env.example .env   # preencha as variáveis
npm install
npm run dev

# Frontend (em outro terminal)
cd frontend
cp .env.example .env   # preencha VITE_API_URL
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3000

## Estrutura da documentação

```
docs/
├── architecture/          # Arquitetura geral do sistema
│   ├── overview.md        # Visão geral e decisões macro
│   ├── monolith-modular.md
│   ├── clean-architecture.md
│   ├── vertical-slices.md
│   └── diagrams/
│       ├── database-diagram.md     # Modelo do banco de dados
│       ├── component-diagram.md    # Como os componentes se comunicam
│       └── use-case-diagram.md     # Casos de uso por perfil
│
├── adr/                   # Decisões arquiteturais documentadas
│   ├── ADR-001-monolith-modular.md
│   ├── ADR-002-clean-architecture.md
│   ├── ADR-003-vertical-slices.md
│   ├── ADR-004-react-mvvm.md
│   ├── ADR-005-postgresql.md
│   ├── ADR-006-adocao-de-padroes-gof.md
│   └── ADR-007-multi-tenant-barbershops.md
│
├── api/                   # Contratos da API REST
│   ├── endpoints.md            # Todas as rotas com RF rastreado
│   ├── authentication.md       # Fluxo de autenticação JWT
│   ├── request-response-examples.md
│   └── error-codes.md
│
├── business-rules/        # Regras de negócio por módulo
│   ├── usuarios.md
│   ├── barbeiros.md
│   ├── servicos.md
│   └── agendamentos.md    # Motor de agendamento — leia primeiro
│
├── development/           # Guias para o time
│   ├── contribution-guide.md
│   ├── coding-standards.md
│   ├── commit-convention.md
│   ├── branching-strategy.md
│   ├── issue-management.md
│   ├── pull-request-process.md
│   └── definition-of-done.md
│
├── project-management/
│   ├── roadmap.md         # Checklist de RFs por fase
│   ├── workflow.md
│   └── issue-template.md
│
├── operations/
│   ├── deployment.md
│   ├── environments.md
│   ├── monitoring.md
│   ├── backup-strategy.md
│   └── incident-response.md
│
└── glossary.md            # Termos do projeto
```

## Por onde começar

1. Leia a [visão geral da arquitetura](./docs/architecture/overview.md)
2. Veja o [diagrama do banco de dados](./docs/architecture/diagrams/database-diagram.md)
3. Leia as [regras do motor de agendamento](./docs/business-rules/agendamentos.md) — é o núcleo do sistema
4. Consulte os [endpoints da API](./docs/api/endpoints.md) antes de implementar qualquer rota
5. Siga o [guia de contribuição](./docs/development/contribution-guide.md)

## Documentos acadêmicos

Os documentos entregues na disciplina estão em `docs/academic/`:

- RVS — Relatório de Viabilidade de Software
- ERS — Especificação de Requisitos de Software
- Arquitetura de Software (pesquisa orientada)
- Status Report 01
- Atividade Prática — Design Patterns (ADR-006)
