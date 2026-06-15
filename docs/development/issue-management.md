# Gerenciamento de Issues

## Objetivo

As Issues representam tarefas, melhorias, correções de bugs e atividades de documentação do projeto.

## Estrutura de uma Issue

### Título

O título deve ser curto e objetivo.

Exemplos:

feat: implementar cadastro de usuários

fix: corrigir conflito de horários

docs: criar documentação de desenvolvimento

### Descrição

Toda Issue deve conter:

#### Contexto

Descrição do problema ou necessidade.

#### Objetivo

Resultado esperado da tarefa.

#### Critérios de Aceitação

Checklist que define quando a tarefa será considerada concluída.

Exemplo:

* [ ] Implementação concluída
* [ ] Testes realizados
* [ ] Documentação atualizada

## Tipos de Issue

### Feature

Nova funcionalidade.

### Bug

Correção de defeitos.

### Documentation

Alterações de documentação.

### Refactor

Melhorias internas do código.

### Maintenance

Atividades de manutenção.

## Relacionamento com Branches

Toda branch deve estar associada a uma Issue.

Exemplo:

Issue #12

docs: estabelecer documentação inicial de desenvolvimento

Branch:
docs/development-standards

## Relacionamento com Pull Requests

Todo Pull Request deve referenciar a Issue correspondente.

Exemplo:

Closes #12
