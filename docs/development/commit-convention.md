# Convenção de Commits

O projeto segue o padrão **Conventional Commits**.

## Formato

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

## Tipos

| Tipo | Uso |
|------|-----|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `refactor` | Refatoração sem nova funcionalidade |
| `test` | Adição ou correção de testes |
| `docs` | Alteração em documentação |
| `chore` | Tarefas de build, config, dependências |
| `style` | Formatação, sem mudança de lógica |

## Exemplos

```
feat(agendamentos): implementar validação de conflito de horários

fix(auth): corrigir expiração de token JWT

docs(adr): adicionar ADR-006 sobre padrões GoF

test(agendamentos): adicionar testes unitários para CriarAgendamentoUseCase
```

## Escopos Sugeridos

`auth`, `usuarios`, `barbeiros`, `servicos`, `agendamentos`, `admin`, `infra`, `frontend`
