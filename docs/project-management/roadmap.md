# Roadmap — Barber Agenda

## MVP (Fase 1) — Prazo Acadêmico 2026

### Etapa 0 — Infraestrutura Base
- [x] Executar `sql/01_create_tables.sql` no Supabase
- [x] Executar `sql/02_indexes.sql` no Supabase
- [x] Configurar Express com rate limiting (`security-guide.md`)
- [x] Configurar middleware `validate()` com Zod

### Módulo 1 — Identidade e Acesso
- [x] RF001 — Cadastro de usuário (com validação Zod)
- [x] RF002 — Autenticação JWT
- [x] RF017 — Autorização por perfil (cliente | profissional | owner)
- [x] RF018 — Encerramento de sessão
- [x] RF019 — Atualização de dados
- [x] RF030 — Recuperação de senha
- [ ] RNF010 — Exclusão de conta e dados pessoais (LGPD)

### Módulo 2 — Barbearias, Profissionais e Serviços
- [x] RF031 — Criação de barbearia (promove usuário a owner, ADR-007)
- [ ] RF032 — Listagem e detalhes de barbearias
- [ ] RF033 — Atualização de dados da barbearia (owner)
- [ ] RF003 — Cadastro de profissionais na barbearia
- [ ] RF004 — Listagem de profissionais da barbearia
- [ ] RF026 — Dados do profissional (detalhe)
- [ ] RF014 — Cadastro de serviços da barbearia
- [ ] RF015 — Seleção de serviço
- [ ] RF020 — Horário de funcionamento por barbearia
- [ ] RF021 — Agenda individual por profissional
- [ ] RF022 — Visualização de horários disponíveis do profissional
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
- [ ] RF028 — Histórico de atendimentos (endpoint básico, `GET /appointments/history`)

### Módulo 4 — Frontend
- [ ] Design System aplicado (cores, tipografia, componentes base)
- [ ] `useAuth` implementado e testado
- [ ] `useAgendamento` implementado e testado
- [ ] `useBarbeiro` implementado e testado
- [ ] Formulários com React Hook Form + Zod (login, cadastro, agendamento)
- [ ] Fluxo completo testado: cadastro → login → agendar → cancelar

### Módulo 5 — Notificações (se houver tempo)
- [ ] RF012 — Notificação de agendamento
- [ ] RF013 — Notificação de cancelamento
- [ ] ADR-006 — Adapter para provedores

### Módulo 6 — Avatares (Storage)
- [ ] Criar bucket `avatars` (público) no Supabase Storage (`architecture/storage.md`)
- [ ] Middleware de upload (Multer)
- [ ] `PATCH /users/me/avatar`
- [ ] `PATCH /barbershops/:id/avatar` (owner)
- [ ] `PATCH /barbershops/:barbershopId/professionals/:id/avatar` (owner ou profissional próprio)
- [ ] `PATCH /barbershops/:barbershopId/services/:id/avatar` (owner)

---

## Fase 2 — Pós-MVP (Futuras Evoluções)

- RLS no Supabase (`security-guide.md` — seção de itens futuros)
- Refresh token
- Notificações via WhatsApp (quando integração estiver estável)
- RF028 — Histórico de atendimentos: filtros avançados (data, profissional, status) — endpoint básico já é MVP (Módulo 3)
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

---

## Observações sobre a documentação (não são tarefas de código)

- **RF017 vs RF027:** `ADR-007` se refere a "Perfis (RF027 atualizado)" tratando do mesmo requisito de autorização por perfil que em `usuarios.md` é RF017. São o mesmo requisito com dois números — vale o time decidir qual numeração é a oficial e padronizar nas docs.
- **RNF002 (desempenho), RNF003 (disponibilidade) e RNF008 (backup)** — cobertos pela infraestrutura do Supabase (`operations/monitoring.md`, `operations/backup-strategy.md`). Não geram tarefa de implementação no MVP, só ficam documentados como decisão arquitetural.
