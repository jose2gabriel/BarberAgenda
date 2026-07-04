# Clean Architecture

## Conceito

A Clean Architecture é um padrão arquitetural proposto por Robert C. Martin que organiza a aplicação em camadas independentes.

Seu principal objetivo é proteger as regras de negócio de detalhes externos como banco de dados, frameworks e interfaces.

## Regra da Dependência

As dependências devem sempre apontar para dentro da aplicação.

text
Presentation
↓
Application
↓
Domain

Infrastructure
↑

## Camada Domain

Responsável por:

Entidades
Regras de negócio
Objetos de valor

Exemplos:

Usuario
Barbeiro
Servico
Agendamento

## Camada Application

Responsável por:

Casos de uso
Orquestração de regras de negócio

Exemplos:

Criar Agendamento
Cancelar Agendamento
Cadastrar Serviço

## Camada Infrastructure

Responsável por:

Banco de dados
APIs externas
Serviços de terceiros

## Camada Presentation

Responsável por:

Controllers
Endpoints
Interface com usuário

## Benefícios

Baixo acoplamento
Facilidade de testes
Maior manutenção
Independência tecnológica

## Aplicação no Barber Agenda

A Clean Architecture garante que as regras de negócio do sistema permaneçam independentes da tecnologia utilizada para persistência e apresentação.