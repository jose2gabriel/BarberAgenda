# Guia de Segurança — Barber Agenda

> Para o MVP, apenas Rate Limiting e Zod são obrigatórios.
> RLS e Refresh Token ficam para versões futuras.

---

## 1. Rate Limiting

**O que resolve:** impede ataques de força bruta no login.

**Quando implementar:** primeiro dia, junto com a configuração do Express.

### Instalação

```bash
npm install express-rate-limit
```

### Implementação

```typescript
// src/shared/middlewares/rateLimiter.ts
import rateLimit from 'express-rate-limit'

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  message: {
    error: 'TOO_MANY_REQUESTS',
    message: 'Muitas tentativas. Tente novamente em 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100,
  message: {
    error: 'TOO_MANY_REQUESTS',
    message: 'Limite de requisições atingido.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})
```

### Uso no servidor

```typescript
// server.ts
app.use(apiLimiter)
app.use('/auth/login', authLimiter)
app.use('/auth/recover-password', authLimiter)
```

---

## 2. Validação de Entrada com Zod

**O que resolve:** garante que os dados que chegam na API são válidos antes de qualquer processamento.

**Quando implementar:** desde o primeiro endpoint.

### Instalação

```bash
npm install zod
```

### Middleware genérico

```typescript
// src/shared/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Dados inválidos na requisição.',
        details: result.error.flatten().fieldErrors,
      })
    }

    req.body = result.data
    next()
  }
}
```

### Schemas por módulo

```typescript
// usuarios/adapters/UsuarioSchema.ts
import { z } from 'zod'

export const cadastroSchema = z.object({
  name:     z.string().min(2).max(150),
  email:    z.string().email('E-mail inválido'),
  phone:    z.string().min(10).max(20),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
})

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
})

export type CadastroDTO = z.infer<typeof cadastroSchema>
export type LoginDTO    = z.infer<typeof loginSchema>
```

```typescript
// agendamentos/adapters/AgendamentoSchema.ts
import { z } from 'zod'

export const criarAgendamentoSchema = z.object({
  professionalId: z.string().uuid('ID do profissional inválido'),
  serviceId:      z.string().uuid('ID do serviço inválido'),
  date:           z.string().date('Data inválida'),
  time:           z.string().regex(/^\d{2}:\d{2}$/, 'Horário inválido (use HH:MM)'),
})

export type CriarAgendamentoDTO = z.infer<typeof criarAgendamentoSchema>
```

### Uso no router

```typescript
// router.appointment.ts
router.post('/', autenticar, validate(criarAgendamentoSchema), controller.criar)
```

---

## Checklist de Segurança — antes do deploy

- [ ] Rate limiting ativo nas rotas de auth
- [ ] Zod validando todos os endpoints
- [ ] `.env` no `.gitignore`
- [ ] JWT_SECRET com pelo menos 32 caracteres aleatórios
- [ ] Nenhum `console.log` com senha, token ou dados sensíveis
- [ ] Repositório GitHub revisado antes de tornar público

---

## Itens para versões futuras (pós-MVP)

- RLS no Supabase
- Refresh token
