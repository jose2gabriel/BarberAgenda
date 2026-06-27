# Clean Architecture

## Conceito

Proposta por Robert C. Martin (Uncle Bob), a Clean Architecture organiza o sistema em camadas concêntricas com o Domínio no centro. A regra fundamental: **dependências sempre apontam para dentro**. Camadas externas (UI, BD, frameworks) podem depender das internas, mas nunca o contrário.

## Camadas

| Camada | Conteúdo |
|--------|----------|
| Frameworks e Drivers | UI, Banco de Dados, Web |
| Interface Adapters | Controllers, Gateways, DTOs |
| Use Cases | Regras de negócio da aplicação |
| Entities (Domínio) | Regras de negócio da empresa — núcleo puro |

```
┌──────────────────────────────────────┐
│         Frameworks & Drivers         │  ← Express, React, Supabase
│  ┌────────────────────────────────┐  │
│  │      Interface Adapters        │  │  ← Controllers, DTOs
│  │  ┌──────────────────────────┐  │  │
│  │  │       Use Cases          │  │  │  ← Regras de negócio
│  │  │  ┌────────────────────┐  │  │  │
│  │  │  │     Entities       │  │  │  │  ← Domínio puro
│  │  │  └────────────────────┘  │  │  │
│  │  └──────────────────────────┘  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

## Aplicação no Barber Agenda

A Clean Architecture protege o **motor de agendamento** (validação de horários, detecção de conflitos, controle de disponibilidade) como núcleo de domínio independente de tecnologias externas.

### Estrutura por módulo

```
agendamentos/
├── domain/          ← Entidades e regras puras (sem dependência externa)
├── use-cases/       ← Casos de uso da aplicação
├── adapters/        ← Controllers, DTOs
└── infrastructure/  ← Repositório / BD (PostgreSQL/Supabase)
```

## Por que Clean Architecture?

- Isola o motor de agendamento de mudanças tecnológicas
- Permite trocar banco de dados ou framework sem alterar regras de negócio
- Facilita testes unitários no núcleo do domínio
- Alinha-se naturalmente com os padrões GoF adotados (ADR-006)

## Referências

- ADR-002: [Decisão de adoção da Clean Architecture](../adr/ADR-002-clean-architecture.md)
- MARTIN, Robert C. *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall, 2017.
