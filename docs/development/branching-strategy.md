# Estratégia de Branches

## Branches Principais

| Branch | Finalidade |
|--------|-----------|
| `main` | Código estável em produção |
| `develop` | Integração de novas features — base para PRs |

## Branches de Feature

Criadas a partir de `develop`:

```
feat/<modulo>/<descricao-curta>
```

Exemplos:
```
feat/agendamentos/validacao-conflitos
feat/auth/recuperacao-senha
feat/barbeiros/controle-indisponibilidade
```

## Branches de Correção

```
fix/<modulo>/<descricao-curta>
```

Exemplos:
```
fix/auth/expiracao-token
fix/agendamentos/calculo-duracao-servico
```

## Fluxo

```
develop ──── feat/agendamentos/xxx ──── PR ──── develop ──── PR ──── main
```

1. Crie branch a partir de `develop`
2. Desenvolva e commit
3. Abra PR para `develop`
4. Após aprovação e testes, merge em `develop`
5. Quando `develop` estiver estável, PR para `main`
