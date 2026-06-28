# Gerenciamento de Issues

## Criação de Issues

Toda tarefa, bug ou melhoria deve ter uma issue no GitHub antes de ser iniciada.

### Labels

| Label | Uso |
|-------|-----|
| `feature` | Nova funcionalidade |
| `bug` | Comportamento incorreto |
| `refactor` | Melhoria de código sem nova funcionalidade |
| `docs` | Documentação |
| `blocked` | Issue bloqueada por dependência |

### Atribuição

- Cada issue deve ter um responsável (`assignee`)
- Relacione a issue ao módulo correspondente no título: `[agendamentos] Implementar validação de conflitos`

## Referência nos Commits

Use `closes #<numero>` no commit ou PR para fechar a issue automaticamente:

```
feat(agendamentos): implementar validação de conflitos

closes #42
```
