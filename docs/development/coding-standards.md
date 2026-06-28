# Padrões de Código — Barber Agenda

## Linguagem e Runtime

- **TypeScript** em todo o projeto (frontend e backend)
- Node.js no backend com Express
- React no frontend com Vite

## Organização dos Arquivos

Seguir estrutura de **Vertical Slices** — cada módulo contém tudo que precisa:

```
modulo/
├── domain/
│   └── Entidade.ts
├── use-cases/
│   └── CriarAgendamentoUseCase.ts
├── adapters/
│   ├── AgendamentoController.ts
│   └── AgendamentoDTO.ts
└── infrastructure/
    └── AgendamentoRepository.ts
```

## Nomenclatura

| Artefato | Convenção | Exemplo |
|----------|-----------|---------|
| Classes | PascalCase | `AgendamentoUseCase` |
| Interfaces | IPascalCase | `INotificationService` |
| Arquivos | PascalCase | `AgendamentoController.ts` |
| Hooks React | camelCase com `use` | `useAgendamento` |
| Componentes | PascalCase | `AgendaCalendar.tsx` |
| Variáveis/funções | camelCase | `criarAgendamento()` |
| Constantes | UPPER_SNAKE_CASE | `JWT_SECRET` |

## Regras Gerais

- **Nunca** acesse o banco diretamente de um use case — use repositórios
- **Nunca** importe de outro módulo diretamente — use interfaces/contratos
- **Sempre** valide dados de entrada nos controllers (camada de adapters)
- Senhas **nunca** em texto puro — use bcrypt
- Segredos **nunca** no código — use variáveis de ambiente (`.env`)

## TypeScript

- `strict: true` habilitado no `tsconfig.json`
- Evite `any` — use tipos genéricos ou `unknown` quando necessário
- Defina DTOs tipados para request/response de cada endpoint

## Testes

- Testes unitários no domínio e use cases (sem dependência de banco)
- Use mocks para interfaces externas (`INotificationService`, repositórios)
- Nomenclatura: `NomeDoArquivo.spec.ts`
