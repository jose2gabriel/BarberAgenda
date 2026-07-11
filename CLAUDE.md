# Barber Agenda — Contexto do Projeto

## O que é
Sistema web de agendamento para barbearias. Multi-tenant — um sistema, várias barbearias, cada
owner só enxerga/gerencia as suas (ADR-007).

## Stack

### Backend
- Node.js + Express + TypeScript
- Banco: PostgreSQL via Supabase (`@supabase/supabase-js`, sem ORM)
- Autenticação: JWT + bcrypt
- Validação: Zod (middleware `validate()` em `src/shared/middlewares/validate.ts`)
- Rate limiting: `express-rate-limit` (`apiLimiter` + `authLimiter`, configurados em `src/app.ts`)
- E-mail: Nodemailer/Gmail — dois serviços separados: `NodemailerEmailService` (recuperação de
  senha) e `EmailNotificationService` (confirmação/cancelamento de agendamento, RF012/RF013)

### Frontend
- React + Vite + TypeScript
- Tailwind CSS v4 (tokens em `@theme`, `src/index.css`) — cores: `--color-accent` (vermelho),
  `--color-dark`, `--color-primary/secondary`, `--color-text-primary/secondary`
- React Router (rotas em `src/app/App.tsx`)
- React Hook Form + Zod nos formulários
- Ícones: `lucide-react` (monocromáticos, sem emoji)
- Feature-Sliced Design (ver `docs/frontendocs/overview.md`)

## Arquitetura

### Backend — Clean Architecture + Vertical Slices (ADR-002, ADR-003)
Cada módulo tem: `domain/` (entidades, interfaces), `use-cases/`, `adapters/`
(controllers/routes/schemas), `infrastructure/` (repositórios Supabase).

```
backend/src/
├── app.ts / server.ts
├── shared/         ← middlewares (validate, autenticar, rateLimiter, errorHandler),
│                     infrastructure (NodemailerEmailService, EmailNotificationService)
├── usuarios/       ← auth, perfil, roles
├── barbershops/    ← multi-tenant, horário de funcionamento
├── professionals/  ← cadastro de profissionais na barbearia
├── services/       ← catálogo de serviços
├── unavailabilities/ ← indisponibilidade dos profissionais
└── agendamentos/   ← motor de agendamento (core do sistema)
```

Nunca acesse o banco diretamente de um use case — sempre via repositório injetado (interface em
`domain/interfaces`, implementação Supabase em `infrastructure/repositories`).

### Frontend — Feature-Sliced Design (ADR-008)
```
frontend/src/
├── app/        ← rotas, providers (App.tsx, ProtectedRoute.tsx)
├── pages/      ← uma página = composição de features/widgets (ver docs/frontendocs/pages.md)
├── widgets/    ← sidebar/ (nav global retrátil, renderizada por ProtectedRoute)
├── features/   ← auth, agendamento, barbershop, professional, service
├── entities/   ← types.ts por entidade de domínio
└── shared/     ← ui/ (Design System), lib/api.ts (client HTTP), schemas/ (Zod)
```
Regra de import: `app → pages → widgets → features → entities → shared` (nunca ao contrário).

## Perfis (roles)
`cliente`, `profissional`, `owner` — não existe admin. Um mesmo usuário pode acumular papéis
(ex.: owner que também atua como profissional na própria barbearia). As roles **não são
armazenadas** — são calculadas a cada login/refresh por `construirRolesUsuario` (`app.ts`):
cliente sempre; owner se `barbeariaRepository.existePorOwnerId`; profissional se
`profissionalRepository.buscarPorUserId` encontrar vínculo. O JWT carrega `role` (legado/exibição)
e `roles: Role[]` (autorização real). `POST /auth/refresh-token` reemite o token com roles
atualizadas sem pedir senha de novo.

**Autorização correta:** nunca confiar no `role` singular pra checar permissão — sempre checar a
relação real (`agendamento.clientId === userId`, `profissional.userId === userId`,
`barbearia.ownerId === userId`). Um bug já existiu em `CancelarAgendamentoUseCase`/
`ConcluirAgendamentoUseCase` por comparar IDs de tabelas diferentes — corrigido nesse padrão.

## Regras importantes
- Nunca acesse o banco diretamente de um use case — use repositórios
- Sempre valide dados de entrada com Zod no adapter (controller/router)
- Senhas sempre com bcrypt
- Segredos sempre em variáveis de ambiente (nunca commitar `.env` real; `.env.example` deste repo
  tem credenciais reais do Supabase/Gmail — não editar/committar sem confirmar com o dono)
- JWT no router, rate limiting no `app.ts`
- Notificações (RF012/RF013) via `INotificationService` — Adapter (ADR-006); só o **cliente**
  recebe e-mail (confirmação ao criar, aviso ao cancelar); falha de envio nunca bloqueia a operação
  (try/catch que só loga)
- Frontend não acessa o Supabase diretamente — tudo passa pela API REST do backend (ADR-005)

## Documentação
- Regras de negócio por módulo: `docs/business-rules/`
- ADRs: `docs/adr/`
- Páginas do frontend: `docs/frontendocs/pages.md`
- Roadmap e status das fases: `docs/project-management/roadmap.md`
