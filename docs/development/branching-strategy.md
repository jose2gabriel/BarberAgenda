# Estratégia de Branches

## Branches Principais

### main

Contém versões estáveis e prontas para produção.

### develop

Contém a integração das funcionalidades em desenvolvimento.

## Branches de Trabalho

### feature/<nome>

Utilizada para novas funcionalidades.

Exemplo:
feature/agendamento-online

### fix/<nome>

Utilizada para correção de bugs.

Exemplo:
fix/erro-login

### docs/<nome>

Utilizada para documentação.

Exemplo:
docs/development-documentation

### hotfix/<nome>

Utilizada para correções urgentes em produção.

Exemplo:
hotfix/falha-autenticacao

## Fluxo

Issue
→ Branch
→ Desenvolvimento
→ Pull Request
→ Revisão
→ Merge para develop
