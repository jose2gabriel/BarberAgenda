# Códigos de Erro — Barber Agenda

## Formato Padrão de Erro

```json
{
  "error": "CODIGO_DO_ERRO",
  "message": "Descrição legível do problema."
}
```

---

## HTTP 400 — Bad Request

| Código | Mensagem | Causa |
|--------|----------|-------|
| `VALIDATION_ERROR` | Dados inválidos na requisição. | Campo obrigatório ausente ou formato incorreto |
| `INVALID_DATE` | Data ou horário inválido. | Data no passado ou formato incorreto |

## HTTP 401 — Unauthorized

| Código | Mensagem | Causa |
|--------|----------|-------|
| `MISSING_TOKEN` | Token de autenticação não fornecido. | Header Authorization ausente |
| `INVALID_TOKEN` | Token inválido ou expirado. | JWT mal formado ou expirado |

## HTTP 403 — Forbidden

| Código | Mensagem | Causa |
|--------|----------|-------|
| `INSUFFICIENT_PERMISSIONS` | Você não tem permissão para esta ação. | Role do usuário insuficiente (RF027) |

## HTTP 404 — Not Found

| Código | Mensagem | Causa |
|--------|----------|-------|
| `USER_NOT_FOUND` | Usuário não encontrado. | ID ou e-mail inexistente |
| `PROFESSIONAL_NOT_FOUND` | Profissional não encontrado. | ID inexistente |
| `SERVICE_NOT_FOUND` | Serviço não encontrado. | ID inexistente |
| `APPOINTMENT_NOT_FOUND` | Agendamento não encontrado. | ID inexistente ou não pertence ao usuário |

## HTTP 409 — Conflict

| Código | Mensagem | Causa |
|--------|----------|-------|
| `EMAIL_ALREADY_EXISTS` | E-mail já cadastrado. | Violação de unicidade (RNF007) |
| `SCHEDULE_CONFLICT` | Horário indisponível para este profissional. | Conflito de agendamentos (RF007) |
| `PROFESSIONAL_UNAVAILABLE` | Profissional indisponível neste período. | Período de indisponibilidade registrado (RF025) |

## HTTP 500 — Internal Server Error

| Código | Mensagem | Causa |
|--------|----------|-------|
| `INTERNAL_ERROR` | Erro interno do servidor. | Erro inesperado no backend |
| `DATABASE_ERROR` | Erro ao acessar o banco de dados. | Falha na conexão com o Supabase/PostgreSQL |
