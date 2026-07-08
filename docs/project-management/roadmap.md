# Roadmap — Barber Agenda

## MVP (Fase 1) — Prazo Acadêmico 2026

### Etapa 0 — Infraestrutura Base ✅
- [x] Executar `sql/01_create_tables.sql` no Supabase
- [x] Executar `sql/02_indexes.sql` no Supabase
- [x] Configurar Express com rate limiting (`security-guide.md`)
- [x] Configurar middleware `validate()` com Zod

### Módulo 1 — Identidade e Acesso ✅
- [x] RF001 — Cadastro de usuário
- [x] RF002 — Autenticação JWT
- [x] RF017 — Autorização por perfil (cliente | profissional | owner)
- [x] RF018 — Encerramento de sessão
- [x] RF019 — Atualização de dados
- [x] RF030 — Recuperação de senha

### Módulo 2 — Barbearias, Profissionais e Serviços ✅
- [x] ADR-007 — Criação de barbearia (owner)
- [x] RF003 — Cadastro de profissionais na barbearia
- [x] RF004 — Listagem de profissionais da barbearia
- [x] RF014 — Cadastro de serviços da barbearia
- [x] RF015 — Listagem de serviços
- [ ] RF020 — Horário de funcionamento por barbearia
- [ ] RF021 — Agenda individual por profissional
- [ ] RF024 — Controle de indisponibilidade
- [ ] RF025 — Bloqueio por indisponibilidade

### Módulo 3 — Motor de Agendamento
- [ ] RF006 — Agendamento de horário
- [ ] RF007 — Validação de disponibilidade
- [ ] RF008 — Cancelamento
- [ ] RF009 — Reagendamento
- [ ] RF010 — Consulta de agendamentos (cliente)
- [ ] RF011 — Consulta de agenda (profissional)
- [ ] RF016 — Controle de duração do serviço
- [ ] RF029 — Controle de status

### Módulo 4 — Frontend

#### Etapa 1 — Infraestrutura Frontend
- [x] Configurar Vite + React + TypeScript
- [x] Configurar Tailwind CSS com Design System (`docs/frontendocs/design-system.md`)
- [x] Configurar React Router
- [x] Configurar client HTTP (`src/shared/lib/api.ts`)
- [x] Criar componentes base: `Button`, `Input`, `Card`, `Avatar`, `StatusBadge`, `LoadingSpinner`, `ErrorMessage`

#### Etapa 2 — Auth (depende de: Módulo 1 ✅)
- [ ] `useAuth` implementado (`features/auth/model/useAuth.ts`)
- [ ] Página `/login` com React Hook Form + Zod
- [ ] Página `/register` com React Hook Form + Zod
- [ ] Página `/recover-password`
- [ ] Página `/reset-password`
- [ ] Proteção de rotas por role (cliente / profissional / owner)

#### Etapa 3 — Barbearias e Profissionais (depende de: Módulo 2 ✅)
- [ ] `useBarbeiro` implementado (`features/barbershop/model/useBarbeiro.ts`)
- [ ] Página `/barbershops` — listagem de barbearias
- [ ] Página `/barbershops/:id` — detalhes, profissionais e serviços
- [ ] Página `/owner/barbershops` — gerenciar barbearias (owner)
- [ ] Página `/owner/barbershops/:id` — editar barbearia
- [ ] Página `/owner/barbershops/:id/professionals` — gerenciar profissionais
- [ ] Página `/owner/barbershops/:id/services` — gerenciar serviços

#### Etapa 4 — Agendamentos (depende de: Módulo 3 🔄)
- [ ] `useAgendamento` implementado (`features/agendamento/model/useAgendamento.ts`)
- [ ] Página `/appointments/new` — novo agendamento
- [ ] Página `/appointments` — meus agendamentos com cancelar/reagendar
- [ ] Página `/professional/schedule` — agenda do profissional
- [ ] Página `/professional/unavailability` — registrar indisponibilidade

#### Etapa 5 — Perfil
- [ ] Página `/profile` — ver e editar dados, excluir conta

### Módulo 5 — Notificações (se houver tempo)
- [ ] RF012 — Notificação de agendamento
- [ ] RF013 — Notificação de cancelamento
- [ ] ADR-006 — Adapter para provedores

---

## Fase 2 — Pós-MVP (Futuras Evoluções)

- RLS no Supabase (`security-guide.md` — seção de itens futuros)
- Refresh token
- Upload de imagens (Supabase Storage — `architecture/storage.md`)
- Notificações via WhatsApp (quando integração estiver estável)
- RF028 — Histórico de atendimentos com filtros avançados
- Relatórios de utilização para owners
- Painel de métricas (Observer — MetricsObserver)
- Possível migração de módulos críticos para microsserviços

---

## Riscos Monitorados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Motor de agendamento | Alta | Alto | Validação dupla camada + testes unitários |
| Falta de tempo | Média | Alto | MVP incremental, funcionalidades priorizadas |
| JWT / controle de sessão | Média | Alto | Biblioteca jsonwebtoken com boas práticas |
| Sistema sem rodar na apresentação | Média | Alto | Testar fluxo completo com antecedência, não na véspera |
| Integração WhatsApp | Alta | Alto | Adapter com fallback para e-mail (ADR-006) — fora do MVP |
