# Ambientes

## Desenvolvimento (Local)

| Camada | Endereço |
|--------|----------|
| Frontend | http://localhost:5174 (Vite dev server — porta fixada em `vite.config.ts` pro link
  de redefinir senha por e-mail sempre apontar pro lugar certo) |
| Backend | http://localhost:3000 |
| Banco | Supabase projeto de desenvolvimento |

## Produção

| Camada | Endereço |
|--------|----------|
| Frontend | Vercel (URL gerada automaticamente) |
| Backend | Render (Web Service Node — free tier, hiberna após inatividade) |
| Banco | Supabase projeto de produção |

## Variáveis por Ambiente

Nunca compartilhe credenciais de produção em desenvolvimento. Use projetos separados no Supabase para cada ambiente.

`backend/.env.example` e `frontend/.env.example` no repositório contêm as variáveis necessárias
sem valores reais:

```env
# backend/.env.example
PORT=
JWT_SECRET=
JWT_EXPIRES_IN=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
EMAIL_USER=
EMAIL_APP_PASSWORD=
FRONTEND_URL=

# frontend/.env.example
VITE_API_URL=
```
