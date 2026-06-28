# Monitoramento

## Disponibilidade (RNF003)

Meta: **99% de uptime mensal**.

- **Frontend (Vercel):** Vercel fornece status em https://vercel-status.com
- **Banco (Supabase):** Status em https://status.supabase.com
- **Backend:** monitoramento manual inicialmente; considerar UptimeRobot ou similar no futuro

## Desempenho (RNF002)

Meta: **resposta em até 2 segundos em 95% das requisições**.

- Monitorar via logs do Express em desenvolvimento
- Queries lentas identificadas via painel do Supabase (Query Performance)

## Alertas

Para o MVP acadêmico, alertas são verificados manualmente. Em produção futura, considerar:
- Alertas de downtime via UptimeRobot
- Alertas de erro via Sentry
