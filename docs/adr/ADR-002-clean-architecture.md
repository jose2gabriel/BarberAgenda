# ADR-002 — Adoção de Clean Architecture

- **Status:** Aceito
- **Data:** Abril/2026
- **Autores:** Silph Corp (José Gabriel, Geovany, Afonso, Paulo Henrique)

## Contexto

O motor de agendamento é o núcleo mais complexo do sistema, envolvendo validação de horários, detecção de conflitos e controle de disponibilidade. Era necessário proteger essas regras de dependências tecnológicas externas.

## Opções Consideradas

1. **Arquitetura em Camadas tradicional** — simples, mas cria acoplamento entre regras de negócio e tecnologias (ORM, banco).
2. **Clean Architecture** — regras de negócio no centro, sem dependência de frameworks externos.

## Decisão

Adotar **Clean Architecture** no backend.

## Justificativa

- Isola o motor de agendamento de mudanças em banco de dados ou frameworks
- Facilita testes unitários no domínio sem necessidade de banco real
- Alinha-se com os padrões GoF adotados (ADR-006): Adapter e Observer dependem de interfaces, não de implementações

## Consequências

- **Positivas:** domínio testável, independente de tecnologia, preparado para evoluções
- **Negativas:** mais arquivos e camadas em comparação com abordagem tradicional, curva inicial maior
