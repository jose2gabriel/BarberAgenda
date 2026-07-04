# Barber Agenda — Contexto do Projeto

## O que é
Sistema web de agendamento para barbearias. Multi-tenant — um sistema, várias barbearias.

## Stack
- Backend: Node.js + Express + TypeScript
- Banco: PostgreSQL via Supabase (@supabase/supabase-js, sem ORM)
- Autenticação: JWT + bcrypt
- Validação: Zod (middleware validate() em src/shared/middlewares/validate.ts)
- Rate limiting: express-rate-limit (configurado em src/app.ts)

## Arquitetura
- Clean Architecture + Vertical Slices (ADR-002, ADR-003)
- Cada módulo tem: domain/, use-cases/, adapters/, infrastructure/
- Padrão de router: função que recebe controller por injeção de dependência

## Perfis
- cliente, profissional, owner (não existe admin)

## Estrutura de pastas
src/
├── app.ts
├── server.ts
├── shared/
│   ├── middlewares/ (validate.ts, rateLimiter.ts, errorHandler.ts)
│   └── database/ (supabase.ts)
├── usuarios/
├── barbershops/
├── agendamentos/
├── servicos/
└── profissionais/

## Regras importantes
- Nunca acesse o banco diretamente de um use case — use repositórios
- Sempre valide dados de entrada com Zod no adapter (controller/router)
- Senhas sempre com bcrypt
- Segredos sempre em variáveis de ambiente
- JWT no router, rate limiting no app.ts