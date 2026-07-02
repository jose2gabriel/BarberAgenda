# Roadmap — Barber Agenda

## MVP (Fase 1) — Prazo Acadêmico 2026

### Etapa 0 — Infraestrutura Base
- [x] Executar `sql/01_create_tables.sql` no Supabase
- [x] Executar `sql/02_indexes.sql` no Supabase
- [x] Configurar Express com rate limiting (`security-guide.md`)
- [x] Configurar middleware `validate()` com Zod

### Módulo 1 — Identidade e Acesso
- [ ] RF001 — Cadastro de usuário (com validação Zod)
- [ ] RF002 — Autenticação JWT
- [ ] RF017 — Autorização por perfil (cliente | profissional | owner)
- [ ] RF018 — Encerramento de sessão
- [ ] RF019 — Atualização de dados
- [ ] RF030 — Recuperação de senha

### Módulo 2 — Barbearias, Profissionais e Serviços
- [ ] ADR-007 — Criação de barbearia (owner)
- [ ] RF003 — Cadastro de profissionais na barbearia
- [ ] RF004 — Listagem de profissionais da barbearia
- [ ] RF014 — Cadastro de serviços da barbearia
- [ ] RF015 — Seleção de serviço
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

---

## Fase 2 — Pós-MVP (Futuras Evoluções)

- RLS no Supabase (`security-guide.md` — seção de itens futuros)
- Refresh token
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
