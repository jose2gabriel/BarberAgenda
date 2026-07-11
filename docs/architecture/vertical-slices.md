# Vertical Slices

## Conceito

A organização por Vertical Slices divide o código por **funcionalidades completas** (features), em vez de por tipo técnico (controllers, services, repositories). Cada slice contém tudo que a feature precisa para funcionar de ponta a ponta.

## Horizontal vs. Vertical

| Critério | Horizontal | Vertical (Slices) |
|----------|-----------|-------------------|
| Coesão por módulo | Baixa — tipos misturados | Alta — tudo junto |
| Acoplamento entre features | Alto — dependência cruzada | Baixo — módulos isolados |
| Localização de código | Difícil — arquivos espalhados | Fácil — tudo no módulo |
| Escalabilidade em equipe | Conflitos frequentes | Times por feature independentes |
| Curva inicial | Simples | Requer planejamento |

## Estrutura no Barber Agenda

```
barber-agenda/
├── agendamentos/
│   ├── domain/
│   ├── use-cases/
│   ├── adapters/
│   └── infrastructure/
├── professionals/
│   ├── domain/
│   ├── use-cases/
│   ├── adapters/
│   └── infrastructure/
├── services/
│   ├── domain/
│   ├── use-cases/
│   ├── adapters/
│   └── infrastructure/
├── barbershops/
│   ├── domain/
│   ├── use-cases/
│   ├── adapters/
│   └── infrastructure/
├── unavailabilities/
│   ├── domain/
│   ├── use-cases/
│   ├── adapters/
│   └── infrastructure/
└── usuarios/
    ├── domain/
    ├── use-cases/
    ├── adapters/
    └── infrastructure/
```

## Benefícios para o Time

- Cada integrante pode trabalhar em um módulo sem conflitos de merge
- Mudanças em `agendamentos/` não afetam `services/` ou `usuarios/`
- Testes ficam próximos do código que testam
- Onboarding facilitado: para entender uma feature, basta olhar um único diretório

## Referências

- ADR-003: [Decisão de adoção de Vertical Slices](../adr/ADR-003-vertical-slices.md)
- FOWLER, Martin. *Patterns of Enterprise Application Architecture*. Addison-Wesley, 2002.
