# Exemplos de Request e Response

## Cadastro de Usuário (RF001)

**Request**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "João da Silva",
  "email": "joao@email.com",
  "phone": "86912345678",
  "password": "senhaSegura123"
}
```

**Response 201**
```json
{
  "id": "uuid-do-usuario",
  "name": "João da Silva",
  "email": "joao@email.com",
  "role": "cliente",
  "createdAt": "2026-06-01T10:00:00Z"
}
```

---

## Login (RF002)

**Request**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senhaSegura123"
}
```

**Response 200**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-do-usuario",
    "name": "João da Silva",
    "role": "cliente"
  }
}
```

---

## Criar Agendamento (RF006, RF007)

**Request**
```http
POST /api/v1/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "professionalId": "uuid-do-barbeiro",
  "serviceId": "uuid-do-servico",
  "date": "2026-06-15",
  "time": "14:00"
}
```

**Response 201**
```json
{
  "id": "uuid-do-agendamento",
  "status": "agendado",
  "professional": { "id": "uuid", "name": "Carlos Barbeiro" },
  "service": { "id": "uuid", "name": "Corte + Barba", "duration": 60 },
  "date": "2026-06-15",
  "startTime": "14:00",
  "endTime": "15:00",
  "createdAt": "2026-06-01T10:30:00Z"
}
```

**Response 409 — Conflito de horário (RF007)**
```json
{
  "error": "SCHEDULE_CONFLICT",
  "message": "O horário selecionado não está disponível para este profissional."
}
```

---

## Cancelar Agendamento (RF008)

**Request**
```http
DELETE /api/v1/appointments/:id
Authorization: Bearer <token>
```

**Response 200**
```json
{
  "id": "uuid-do-agendamento",
  "status": "cancelado",
  "cancelledAt": "2026-06-10T09:00:00Z"
}
```
