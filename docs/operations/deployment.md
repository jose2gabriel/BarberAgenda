# Deploy — Barber Agenda

## Ambientes

| Ambiente | Frontend | Backend | Banco |
|----------|----------|---------|-------|
| Produção | Vercel | A definir | Supabase (PostgreSQL) |
| Desenvolvimento | Local (Vite) | Local (Node.js) | Supabase (projeto dev) |

## Deploy do Frontend (Vercel)

O frontend é hospedado no Vercel com deploy automático a partir da branch `main`.

1. Push para `main` dispara o build automático no Vercel
2. Build: `npm run build` (Vite gera os assets estáticos)
3. Vercel serve os arquivos estáticos com CDN global

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
