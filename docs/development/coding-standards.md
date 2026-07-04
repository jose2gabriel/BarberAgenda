# Padrões de Código — Barber Agenda

## Linguagem e Runtime

- **TypeScript** em todo o projeto (frontend e backend)
- Node.js no backend com Express
- React no frontend com Vite
- `strict: true` habilitado no `tsconfig.json`

---

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
│   ├── AgendamentoDTO.ts
│   └── AgendamentoSchema.ts   ← schema Zod de validação
└── infrastructure/
    └── AgendamentoRepository.ts
```

---

## Nomenclatura

| Artefato | Convenção | Exemplo |
|----------|-----------|---------|
| Classes | PascalCase | `AgendamentoUseCase` |
| Interfaces | IPascalCase | `INotificationService` |
| Arquivos | PascalCase | `AgendamentoController.ts` |
| Schemas Zod | camelCase + Schema | `criarAgendamentoSchema` |
| Hooks React | camelCase com `use` | `useAgendamento` |
| Componentes | PascalCase | `AgendaCalendar.tsx` |
| Variáveis/funções | camelCase | `criarAgendamento()` |
| Constantes | UPPER_SNAKE_CASE | `JWT_SECRET` |

---

## Regras Gerais

- **Nunca** acesse o banco diretamente de um use case — use repositórios
- **Nunca** importe de outro módulo diretamente — use interfaces/contratos
- **Sempre** valide dados de entrada nos controllers com Zod
- Senhas **nunca** em texto puro — use bcrypt
- Segredos **nunca** no código — use variáveis de ambiente (`.env`)
- `.env` **sempre** no `.gitignore` — nunca commitar

---

## TypeScript

- `strict: true` no `tsconfig.json`
- Evite `any` — use tipos genéricos ou `unknown`
- Defina DTOs tipados para request/response de cada endpoint
- Os tipos do Zod substituem DTOs manuais — use `z.infer<typeof schema>`

---

## Segurança (obrigatório desde o início)

Veja o guia completo em [security-guide.md](./security-guide.md).

Resumo das obrigações:

| Item | Quando implementar | Lib |
|------|--------------------|-----|
| Rate limiting | Primeiro dia, junto com o Express | `express-rate-limit` |
| Validação de entrada | Em todo endpoint, desde o primeiro | `zod` |
| RLS no Supabase | Ao criar as tabelas | SQL no painel do Supabase |
| Refresh token | Após login básico funcionando | `jsonwebtoken` |

---

## Testes

- Testes unitários no domínio e use cases (sem dependência de banco)
- Use mocks para interfaces externas (`INotificationService`, repositórios)
- Nomenclatura: `NomeDoArquivo.spec.ts`
