# Monólito Modular

## Conceito

Monólito Modular é um estilo arquitetural onde toda a aplicação é executada como uma única unidade de implantação, porém organizada internamente em módulos independentes.

Diferentemente de um monólito tradicional, cada módulo possui responsabilidades bem definidas e baixo acoplamento com os demais módulos.

## Objetivo

O principal objetivo dessa abordagem é reduzir a complexidade operacional sem perder organização interna.

## Estrutura dos Módulos

### Usuários

Responsável por:

- Cadastro
- Autenticação
- Controle de acesso

### Barbeiros

Responsável por:

- Cadastro de profissionais
- Disponibilidade
- Agenda

### Serviços

Responsável por:

- Cadastro de serviços
- Valores
- Tempo de execução

### Agendamentos

Responsável por:

- Criação de agendamentos
- Cancelamentos
- Histórico

### Administrativo

Responsável por:

- Configurações
- Relatórios
- Gestão geral

## Vantagens

- Simplicidade de implantação
- Menor custo operacional
- Facilidade de desenvolvimento
- Comunicação interna rápida

## Desvantagens

- Escalabilidade limitada em comparação a microsserviços
- Necessidade de disciplina arquitetural

## Justificativa da Escolha

O Barber Agenda possui escopo controlado e equipe reduzida, tornando o Monólito Modular uma alternativa adequada por equilibrar simplicidade e organização.