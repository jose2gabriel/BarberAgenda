# ADR-001 — Adoção de Monolito Modular

- **Status:** Aceito
- **Data:** Abril/2026
- **Autores:** Silph Corp (José Gabriel, Geovany, Afonso, Paulo Henrique)

## Contexto

O projeto Barber Agenda é desenvolvido por uma equipe de 4 integrantes com prazo acadêmico definido. Era necessário escolher uma abordagem arquitetural macro que equilibrasse organização, simplicidade de deploy e viabilidade de entrega.

## Opções Consideradas

1. **Microsserviços** — alta modularidade, mas complexidade de infraestrutura incompatível com o prazo e tamanho da equipe.
2. **Monolito Tradicional** — simples, mas sem separação de responsabilidades, tornando evolução difícil.
3. **Monolito Modular** — aplicação única com módulos internos bem definidos e isolados logicamente.

## Decisão

Adotar o **Monolito Modular**.

## Justificativa

- Equipe pequena e prazo acadêmico não suportam overhead de microsserviços
- Módulos internos garantem organização sem complexidade de deploy distribuído
- Infraestrutura gratuita (Vercel + Supabase) é suficiente para o escopo do MVP
- Arquitetura permite evolução futura para microsserviços se necessário

## Consequências

- **Positivas:** deploy simples, custo zero, consistência transacional nativa, desenvolvimento mais rápido
- **Negativas:** escalabilidade horizontal limitada, risco de degradação arquitetural sem disciplina de equipe
