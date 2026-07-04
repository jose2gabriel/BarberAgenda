# Endpoints da API — Barber Agenda

> ⚠️ Este documento define os contratos da API do MVP. As rotas aqui listadas devem ser implementadas pelo backend (Node.js + Express). Cada rota está rastreada ao requisito funcional ou decisão arquitetural que a originou.

Base URL: `https://<backend-url>/api/v1`

Todas as rotas marcadas com ✅ requerem o header:
```
Authorization: Bearer <token_jwt>
```

---

## Autenticação

| Método | Rota | Referência | Auth |
|--------|------|-----------|------|
| POST | `/auth/register` | RF001 — Cadastro de usuário | ❌ |
| POST | `/auth/login` | RF002 — Login, retorna token JWT | ❌ |
| POST | `/auth/logout` | RF018 — Encerramento de sessão | ✅ |
| POST | `/auth/recover-password` | RF030 — Solicita recuperação de senha por e-mail | ❌ |
| PATCH | `/auth/reset-password` | RF030 — Redefine senha com token recebido por e-mail | ❌ |

---

## Usuários

| Método | Rota | Referência | Auth |
|--------|------|-----------|------|
| GET | `/users/me` | RF019 — Dados do usuário autenticado | ✅ |
| PATCH | `/users/me` | RF019 — Atualização de dados cadastrais | ✅ |
| DELETE | `/users/me` | RNF010 — Exclusão de conta (LGPD) | ✅ |

---

## Barbearias

| Método | Rota | Referência | Auth |
|--------|------|-----------|------|
| GET | `/barbershops` | Lista todas as barbearias do sistema | ✅ |
| POST | `/barbershops` | Cria uma nova barbearia | ✅ Owner |
| GET | `/barbershops/:id` | Detalhes de uma barbearia | ✅ |
| PATCH | `/barbershops/:id` | Atualiza dados da barbearia | ✅ Owner (própria) |

> **Regra:** o owner só pode editar barbearias que ele mesmo criou. O backend valida isso comparando o `owner_id` da barbearia com o `id` do token JWT.

---

## Profissionais

| Método | Rota | Referência | Auth |
|--------|------|-----------|------|
| GET | `/barbershops/:barbershopId/professionals` | RF004 — Lista profissionais da barbearia | ✅ |
| POST | `/barbershops/:barbershopId/professionals` | RF003 — Cadastra profissional na barbearia | ✅ Owner (própria) |
| GET | `/barbershops/:barbershopId/professionals/:id` | RF026 — Dados do profissional | ✅ |
| GET | `/barbershops/:barbershopId/professionals/:id/available-slots` | RF005, RF022 — Horários disponíveis | ✅ |
| POST | `/barbershops/:barbershopId/professionals/:id/unavailability` | RF024 — Registra indisponibilidade | ✅ Profissional (próprio) |
| DELETE | `/barbershops/:barbershopId/professionals/:id/unavailability/:uid` | RF024 — Remove indisponibilidade | ✅ Profissional (próprio) |

> **Nota sobre `/available-slots`:** recebe `?date=YYYY-MM-DD&serviceId=uuid` como query params. O backend calcula os slots livres considerando agendamentos existentes, indisponibilidades, horário de funcionamento da barbearia e duração do serviço (RF007, RF016, RF025).

---

## Serviços

| Método | Rota | Referência | Auth |
|--------|------|-----------|------|
| GET | `/barbershops/:barbershopId/services` | RF015 — Lista serviços da barbearia | ✅ |
| POST | `/barbershops/:barbershopId/services` | RF014 — Cadastra serviço na barbearia | ✅ Owner (própria) |
| PATCH | `/barbershops/:barbershopId/services/:id` | RF014 — Atualiza serviço | ✅ Owner (própria) |

---

## Horário de Funcionamento

| Método | Rota | Referência | Auth |
|--------|------|-----------|------|
| GET | `/barbershops/:barbershopId/business-hours` | RF020 — Consulta horário de funcionamento | ✅ |
| PUT | `/barbershops/:barbershopId/business-hours` | RF020 — Atualiza horário de funcionamento | ✅ Owner (própria) |

---

## Agendamentos

| Método | Rota | Referência | Auth |
|--------|------|-----------|------|
| GET | `/appointments` | RF010 — Agendamentos do usuário autenticado (futuros) | ✅ |
| POST | `/appointments` | RF006, RF007 — Cria agendamento com validação de conflito | ✅ |
| GET | `/appointments/:id` | RF010 — Detalhes de um agendamento | ✅ |
| PATCH | `/appointments/:id/reschedule` | RF009 — Reagendamento | ✅ |
| PATCH | `/appointments/:id/cancel` | RF008 — Cancelamento | ✅ |
| GET | `/appointments/history` | RF028 — Histórico de atendimentos (passados) | ✅ |

> **Nota sobre acesso:** `GET /appointments` retorna resultados filtrados pelo `role` do token JWT:
> - `cliente` — vê apenas os seus próprios agendamentos
> - `profissional` — vê os agendamentos da sua agenda
> - `owner` — vê todos os agendamentos das suas barbearias

---

## Avatares (Storage)

| Método | Rota | Referência | Auth |
|--------|------|-----------|------|
| PATCH | `/users/me/avatar` | Atualiza avatar do usuário — ver `architecture/storage.md` | ✅ |
| PATCH | `/barbershops/:id/avatar` | Atualiza avatar da barbearia | ✅ Owner (própria) |
| PATCH | `/barbershops/:barbershopId/professionals/:id/avatar` | Atualiza avatar do profissional | ✅ Owner (própria) ou Profissional (próprio) |
| PATCH | `/barbershops/:barbershopId/services/:id/avatar` | Atualiza avatar do serviço | ✅ Owner (própria) |

> Todas essas rotas usam o middleware `upload` (Multer) descrito em `architecture/storage.md` e retornam a `avatar_url` pública gerada pelo Supabase Storage.

---

## Permissões por Perfil (RF027 + ADR-007)

| Ação | Cliente | Profissional | Owner |
|------|:-------:|:------------:|:-----:|
| Agendar em qualquer barbearia | ✅ | — | — |
| Cancelar / reagendar próprio agendamento | ✅ | ✅ | ✅ |
| Ver próprios agendamentos e histórico | ✅ | ✅ | ✅ |
| Ver agenda própria | — | ✅ | — |
| Registrar indisponibilidade | — | ✅ | — |
| Cadastrar profissionais na barbearia | — | — | ✅ |
| Cadastrar serviços da barbearia | — | — | ✅ |
| Definir horário de funcionamento | — | — | ✅ |
| Criar barbearia | — | — | ✅ |
