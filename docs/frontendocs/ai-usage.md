# Metodologia de Uso de IA — Barber Agenda

> Seção obrigatória pelo professor (vale 1,0 ponto).
> Relata como a IA foi utilizada no desenvolvimento do projeto.

---

## Ferramentas Utilizadas

| Ferramenta | Como foi usada |
|-----------|---------------|
| Claude (Anthropic) | Arquitetura, documentação, decisões técnicas, revisão de código |
| GitHub Copilot | Autocompletar código durante implementação |

---

## Como a IA foi utilizada

### 1. Definição da Arquitetura

A IA foi usada como par de discussão para definir a arquitetura do sistema antes de qualquer linha de código. As decisões foram tomadas em conjunto, com o time entendendo e validando cada escolha:

- Monolito Modular vs Microsserviços — a IA explicou os trade-offs e a equipe decidiu pelo Monolito Modular dado o tamanho da equipe e o prazo
- Clean Architecture + Vertical Slices — a IA explicou o conceito e como aplicar no contexto do projeto
- Padrões GoF (Adapter e Observer) — a IA explicou quando e por que usar cada padrão

### 2. Geração da Documentação

A IA auxiliou na geração de toda a documentação técnica do projeto:

- Especificação de requisitos (RFs e RNFs)
- Diagrama de banco de dados (modelo ER)
- ADRs (Architecture Decision Records)
- Script SQL de criação das tabelas
- Guias de desenvolvimento e padrões de código

Em todos os casos, o time revisou, questionou e ajustou o conteúdo gerado.

### 3. Decisões de Segurança

A IA foi consultada sobre as melhores práticas de segurança para o MVP:

- Explicou o que é rate limiting e quando aplicar
- Mostrou como usar Zod para validação de entrada
- Explicou a diferença entre JWT simples e refresh token
- Ajudou a decidir o que implementar no MVP e o que deixar para depois

O time entendeu cada decisão antes de implementar — por exemplo, entendeu que rate limiting fica no `server.ts` e Zod fica nos routers, e por quê.

### 4. Geração de Mock Data

A IA foi usada para gerar dados de exemplo para popular o banco durante os testes:

```sql
-- Dados gerados com auxílio de IA para testes
INSERT INTO barbershops (owner_id, name, address, phone) VALUES
  ('uuid-owner-1', 'Barbearia do João', 'Rua das Flores, 123 - Piripiri/PI', '86912345678'),
  ('uuid-owner-2', 'Corte & Arte', 'Av. Principal, 456 - Piripiri/PI', '86987654321');
```

### 5. Pair Programming

Durante a implementação, a IA foi usada como assistente de código para:

- Sugerir estrutura de arquivos seguindo o padrão do projeto
- Explicar erros de TypeScript
- Revisar implementações dos custom hooks

---

## O que a IA não fez

- Não tomou decisões pelo time — sempre apresentou opções e trade-offs
- Não gerou código sem explicação — cada trecho foi explicado e entendido
- Não substituiu o entendimento técnico — o time sabe defender cada decisão

---

## Exemplo concreto de uso consciente

**Situação:** O time precisava decidir onde colocar o middleware JWT.

**Como a IA ajudou:** Explicou que JWT não deve ficar no `server.ts` porque nem toda rota precisa de autenticação (login e cadastro são públicos). Mostrou que o correto é colocar no router, rota por rota.

**O que o time aprendeu:** A diferença entre middlewares globais (rate limiting) e middlewares por rota (JWT, Zod), e o motivo de cada escolha.

Esse entendimento foi testado na prática — o time consegue explicar a decisão sem consultar a IA.
