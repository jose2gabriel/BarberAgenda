# Processo de Pull Request

## Antes de Abrir o PR

- [ ] Código segue os [coding standards](./coding-standards.md)
- [ ] Commits seguem a [convenção](./commit-convention.md)
- [ ] Branch atualizada com `develop`
- [ ] Testes passando localmente
- [ ] [Definition of Done](./definition-of-done.md) verificada

## Abrindo o PR

- **Título:** `[módulo] Descrição curta da mudança`
- **Descrição:** o que foi feito, por que e como testar
- **Relacione a issue:** `closes #<numero>`
- **Assign:** pelo menos 1 revisor do time

## Revisão

- Mínimo de **1 aprovação** antes do merge
- Comentários devem ser respondidos ou resolvidos antes do merge
- O autor do PR é responsável por fazer as alterações solicitadas

## Merge

- Usar **Squash and Merge** para manter o histórico limpo em `develop`
- Deletar a branch após o merge
