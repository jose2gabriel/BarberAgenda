# Roadmap — Barber Agenda

## MVP (Fase 1) — Prazo Acadêmico 2026

### Módulo 1 — Identidade e Acesso
- [ ] RF001 — Cadastro de usuário
- [ ] RF002 — Autenticação JWT
- [ ] RF017 — Autorização por perfil
- [ ] RF018 — Encerramento de sessão
- [ ] RF019 — Atualização de dados
- [ ] RF030 — Recuperação de senha

### Módulo 2 — Profissionais e Serviços
- [ ] RF003 — Cadastro de profissionais
- [ ] RF004 — Listagem de profissionais
- [ ] RF014 — Cadastro de serviços
- [ ] RF015 — Seleção de serviço
- [ ] RF020 — Horário de funcionamento compartilhado
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

### Módulo 4 — Notificações
- [ ] RF012 — Notificação de agendamento
- [ ] RF013 — Notificação de cancelamento
- [ ] ADR-006 — Adapter para provedores

---

## Fase 2 — Pós-MVP (Futuras Evoluções)

- Notificações via WhatsApp (quando integração estiver estável)
- RF028 — Histórico de atendimentos com filtros avançados
- Relatórios de utilização para administradores
- Painel de métricas (Observer — MetricsObserver)
- Possível migração de módulos críticos para microsserviços

---

## Riscos Monitorados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Integração WhatsApp | Alta | Alto | Adapter com fallback para e-mail (ADR-006) |
| Motor de agendamento | Alta | Alto | Validação dupla camada + testes unitários |
| Falta de tempo | Média | Alto | MVP incremental, funcionalidades priorizadas |
| JWT / controle de sessão | Média | Alto | Biblioteca jsonwebtoken com boas práticas |
| Supabase RLS | Média | Médio | Revisão de políticas antes do deploy |
