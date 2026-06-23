# Visão Geral da Arquitetura

## Introdução

A arquitetura de software define a estrutura fundamental de um sistema, organizando seus componentes, responsabilidades e formas de comunicação. Uma arquitetura bem definida facilita a manutenção, evolução e escalabilidade da aplicação.

O projeto Barber Agenda tem como objetivo fornecer uma plataforma para gerenciamento de agendamentos em barbearias, permitindo o controle de usuários, barbeiros, serviços e horários.

## Objetivos Arquiteturais

A arquitetura foi definida visando:

- Facilidade de manutenção
- Baixo acoplamento entre módulos
- Alta coesão das funcionalidades
- Facilidade para testes
- Escalabilidade futura
- Organização do código

## Tecnologias Utilizadas

### Frontend

- React
- TypeScript

### Backend

- ASP.NET Core

### Banco de Dados

- PostgreSQL

## Padrões Arquiteturais Adotados

O sistema utiliza uma combinação de padrões arquiteturais:

### Monólito Modular

Responsável pela divisão do sistema em módulos de negócio independentes.

### Clean Architecture

Responsável pela separação de responsabilidades e proteção das regras de negócio.

### Vertical Slices

Responsável pela organização do código por funcionalidades.

### MVVM

Utilizado no frontend para separar interface, estado e lógica de apresentação.

## Estrutura Geral

O sistema é dividido nos seguintes módulos:

- Usuários
- Barbeiros
- Serviços
- Agendamentos
- Administrativo

Cada módulo possui regras de negócio próprias e é desenvolvido de forma independente.