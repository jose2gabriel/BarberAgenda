# Processo de Pull Request

## Requisitos

Antes de abrir um Pull Request:

* Código funcionando corretamente.
* Testes executados com sucesso.
* Commits seguindo o padrão definido.
* Documentação atualizada quando necessário.

## Estrutura do Pull Request

### Descrição

Resumo das alterações realizadas.

### Issue Relacionada

Closes #numero-da-issue

### Checklist

* [ ] Código testado
* [ ] Sem erros de compilação
* [ ] Documentação atualizada
* [ ] Commits padronizados

## Aprovação

O Pull Request deve ser revisado antes do merge.

## Fluxo

feature/*, fix/* ou docs/*
→ Pull Request para develop
→ Revisão
→ Aprovação
→ Merge para develop

## Release

develop
→ Validação da equipe
→ Merge para main
→ Produção
