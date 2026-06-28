# Ambientes

## Desenvolvimento (Local)

| Camada | Endereço |
|--------|----------|
| Frontend | http://localhost:5173 (Vite dev server) |
| Backend | http://localhost:3000 |
| Banco | Supabase projeto de desenvolvimento |

## Produção

| Camada | Endereço |
|--------|----------|
| Frontend | Vercel (URL gerada automaticamente) |
| Backend | A definir |
| Banco | Supabase projeto de produção |

## Variáveis por Ambiente

Nunca compartilhe credenciais de produção em desenvolvimento. Use projetos separados no Supabase para cada ambiente.

Arquivo `.env.example` no repositório contém as variáveis necessárias sem valores reais:

```env
DATABASE_URL=
JWT_SECRET=
PORT=
NODE_ENV=
VITE_API_URL=
```
