# Workflow do Projeto

## Fluxo de Desenvolvimento

Issue
→ Criação da Branch
→ Desenvolvimento
→ Commit
→ Push
→ Pull Request
→ Revisão
→ Aprovação
→ Merge para develop

## Fluxo de Release

develop
→ Validação
→ Aprovação da Equipe
→ Merge para main
→ Produção

## Estratégia de Branches

### main

Contém versões estáveis e prontas para produção.

### develop

Contém a integração das funcionalidades em desenvolvimento.

### feature/<nome>

Utilizada para novas funcionalidades.

### fix/<nome>

Utilizada para correção de defeitos.

### docs/<nome>

Utilizada para documentação.

### hotfix/<nome>

Utilizada para correções urgentes em produção.

## Convenção de Commits

O projeto utiliza o padrão Conventional Commits.

Exemplos:

* feat: adicionar cadastro de usuários
* fix: corrigir conflito de horários
* docs: atualizar documentação
* refactor: reorganizar módulo de agendamentos

## Pull Requests

Todo Pull Request deve:

* Estar associado a uma Issue
* Seguir os padrões definidos pela equipe
* Passar por revisão
* Ser aprovado antes do merge

## Definition of Done

Uma tarefa será considerada concluída quando:

* Os critérios de aceitação forem atendidos
* A documentação estiver atualizada quando necessário
* O Pull Request estiver aprovado
* O merge tiver sido realizado
