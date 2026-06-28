# ADR-005 — Adoção de PostgreSQL via Supabase

- **Status:** Aceito
- **Data:** Abril/2026
- **Autores:** Silph Corp (José Gabriel, Geovany, Afonso, Paulo Henrique)

## Contexto

O sistema precisa de um banco de dados relacional confiável para armazenar usuários, profissionais, serviços e agendamentos, com suporte a transações e validação de conflitos de horários.

## Decisão

Utilizar **PostgreSQL** hospedado no **Supabase** (plano gratuito).

## Justificativa

- PostgreSQL é robusto, suporta transações ACID e constraints — essenciais para validação de conflitos
- Supabase oferece PostgreSQL gerenciado com Row Level Security (RLS) e backup automático
- Plano gratuito cobre o escopo do MVP sem custo
- Supabase é utilizado exclusivamente como provedor de banco — o backend Node.js/Express controla as regras de negócio

## Consequências

- **Positivas:** custo zero, backup gerenciado, RLS para controle de acesso, familiaridade da equipe com SQL
- **Negativas:** configuração incorreta de RLS pode expor dados (mitigado por revisão antes do deploy — ver Matriz de Riscos no RVS)
- Supabase não é usado como BaaS — apenas como host do PostgreSQL

## Conformidade

- Dados armazenados em conformidade com a LGPD (RF030 / RNF010)
- Backup garantido pela infraestrutura do Supabase (RNF008)
