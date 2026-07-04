# Barber Agenda

Sistema web de agendamento para barbearias, desenvolvido como projeto da disciplina **Engenharia de Software II** — IFPI Piripiri, 2026.

**Grupo:** Silph Corp  
José Gabriel de Oliveira Farias · Geovany de Oliveira Silva Batista · Afonso Vanderlei da Silva · Paulo Henrique Sales Lima  
**Professor:** Mayllon Veras

---

## O que é

O Barber Agenda é uma aplicação web responsiva que substitui o agendamento manual feito por aplicativos de mensagens. Clientes agendam horários em qualquer barbearia cadastrada, profissionais gerenciam sua agenda individual e owners (donos de barbearia) controlam profissionais, serviços e horário de funcionamento das barbearias que possuem (ADR-007).

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React + TypeScript + Vite |
| Formulários | React Hook Form + Zod |
| Backend | Node.js + Express (padrão services/controllers com injeção de dependência) |
| Autenticação | JWT (implementado no backend) |
| Validação de entrada | Zod (backend e frontend) |
| Rate Limiting | express-rate-limit |
| Banco de Dados | PostgreSQL via Supabase (`@supabase/supabase-js`, sem ORM) |
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
│   ├── ADR-007-multi-tenant-barbershops.md   # owner + barbershops — leia antes de implementar perfis
│   └── ADR-008-feature-sliced-design.md      # organização do frontend em FSD
│
├── api/                   # Contratos da API REST
│   ├── endpoints.md            # Todas as rotas com RF rastreado
│   ├── authentication.md       # Fluxo de autenticação JWT
│   ├── request-response-examples.md
│   └── error-codes.md
│
├── business-rules/        # Regras de negócio por módulo
│   ├── usuarios.md
│   ├── barbershops.md     # Regras da entidade barbearia (ADR-007)
│   ├── barbeiros.md
│   ├── servicos.md
│   └── agendamentos.md    # Motor de agendamento — núcleo do sistema
│
├── development/           # Guias para o time
│   ├── contribution-guide.md   # Ordem de implementação recomendada
│   ├── coding-standards.md
│   ├── security-guide.md       # Rate limiting + Zod (obrigatórios no MVP)
│   ├── commit-convention.md
│   ├── branching-strategy.md
│   ├── issue-management.md
│   ├── pull-request-process.md
│   └── definition-of-done.md
│
├── project-management/
│   ├── roadmap.md         # Checklist de RFs por etapa
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
├── sql/                   # Scripts SQL para o Supabase
│   ├── 01_create_tables.sql
│   ├── 02_indexes.sql
│   └── 03_test_queries.sql
│
├── frontend/              # Documentação exigida pela disciplina de PI1
│   ├── overview.md         # Stack e estrutura de pastas
│   ├── custom-hooks.md     # useAuth, useAgendamento, useBarbeiro
│   ├── forms-validation.md # React Hook Form + Zod
│   ├── design-system.md    # Cores, tipografia, componentes
│   └── ai-usage.md         # Metodologia de uso de IA
│
└── glossary.md            # Termos do projeto
```

## Por onde começar

1. Leia a [visão geral da arquitetura](docs/architecture/overview.md)
2. Leia a [ADR-007](docs/adr/ADR-007-multi-tenant-barbershops.md) — define os perfis cliente/profissional/owner
3. Veja o [diagrama do banco de dados](docs/architecture/diagrams/database-diagram.md)
4. Execute os [scripts SQL](docs/sql/01_create_tables.sql) no Supabase
5. Leia o [guia de segurança](docs/development/security-guide.md) — rate limiting e Zod são obrigatórios desde o início
6. Leia as [regras do motor de agendamento](docs/business-rules/agendamentos.md) — é o núcleo do sistema
7. Consulte os [endpoints da API](docs/api/endpoints.md) antes de implementar qualquer rota
8. Siga a [ordem de implementação](docs/development/contribution-guide.md) no guia de contribuição

## Documentos acadêmicos

Os documentos entregues nas disciplinas estão referenciados abaixo:

- RVS — Relatório de Viabilidade de Software
- ERS — Especificação de Requisitos de Software
- Arquitetura de Software (pesquisa orientada)
- Status Report 01
- Atividade Prática — Design Patterns (ADR-006)
- Modelagem de Banco de Dados (Programação para Internet I)
