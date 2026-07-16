# Deploy — Barber Agenda

## Ambientes

| Ambiente | Frontend | Backend | Banco |
|----------|----------|---------|-------|
| Produção | Vercel | Render | Supabase (PostgreSQL) |
| Desenvolvimento | Local (Vite) | Local (Node.js) | Supabase (projeto dev) |

Monorepo — `frontend/` e `backend/` são deployados como dois serviços separados, cada um
com "Root Directory" apontado pra sua pasta.

## Deploy do Frontend (Vercel)

O frontend é hospedado no Vercel com deploy automático a partir da branch `main`.

1. Root Directory do projeto na Vercel: `frontend`
2. Build: `npm run build` (Vite gera os assets estáticos em `dist/`)
3. `frontend/vercel.json` reescreve todas as rotas pra `index.html` — necessário porque o
   React Router faz roteamento client-side (sem isso, dar refresh numa rota tipo
   `/barbershops/123` retornaria 404)
4. Vercel serve os arquivos estáticos com CDN global
5. Variável de ambiente `VITE_API_URL` aponta pra URL do backend no Render (`/api/v1`)

## Deploy do Backend (Render)

O backend é um serviço Web Node.js "sempre ligado" (não serverless) — `render.yaml` na raiz
do repositório descreve o serviço (Blueprint), ou pode ser configurado manualmente:

1. Root Directory: `backend`
2. Build Command: `npm install && npm run build` (compila `src/` → `dist/` via `tsc`)
3. Start Command: `npm run start` (`node dist/server.js`)
4. A porta vem de `process.env.PORT`, injetada automaticamente pelo Render — `server.ts` já
   lê essa variável, nenhuma mudança de código necessária
5. Variáveis de ambiente sensíveis (`sync: false` no blueprint) precisam ser preenchidas
   manualmente no painel do Render — nunca commitadas

## Variáveis de Ambiente

### Backend

```env
DATABASE_URL=postgresql://...  # Supabase connection string
JWT_SECRET=...                  # Segredo para assinar tokens JWT
PORT=3000
NODE_ENV=production
```

### Frontend

```env
VITE_API_URL=https://<backend-url>/api/v1
```

## Checklist de Deploy

- [ ] Variáveis de ambiente configuradas no ambiente de destino
- [ ] Políticas RLS do Supabase revisadas
- [ ] Testes passando na branch `main`
- [ ] Backup do banco verificado
- [ ] Smoke test após deploy (login, agendamento, cancelamento)
