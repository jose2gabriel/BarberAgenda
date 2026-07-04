# Resposta a Incidentes

## Classificação

| Severidade | Descrição | Exemplo |
|------------|-----------|---------|
| **P1 — Crítico** | Sistema fora do ar ou dados comprometidos | Banco inacessível, vazamento de dados |
| **P2 — Alto** | Funcionalidade principal indisponível | Motor de agendamento com erro, login quebrado |
| **P3 — Médio** | Funcionalidade secundária com problema | Notificações não enviando |
| **P4 — Baixo** | Problema visual ou de usabilidade | Layout quebrado em um navegador específico |

## Fluxo de Resposta

1. **Identificar** — qual funcionalidade está afetada? Qual o erro?
2. **Comunicar** — notificar os demais integrantes
3. **Investigar** — verificar logs do backend e painel do Supabase
4. **Corrigir** — criar branch `fix/<modulo>/<descricao>` e abrir PR
5. **Verificar** — smoke test após deploy da correção
6. **Documentar** — registrar o incidente e a solução

## Contatos

| Função | Responsável |
|--------|------------|
| Backend | José Gabriel / Geovany |
| Frontend | Afonso / Paulo Henrique |
| Banco / Infra | Qualquer integrante com acesso ao Supabase |
