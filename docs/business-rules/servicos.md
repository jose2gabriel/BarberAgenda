# Regras de Negócio - Serviços

## Cadastro

* O sistema deve permitir o cadastro dos serviços oferecidos pela barbearia.
* Todo serviço deve possuir nome, duração e valor.

## Seleção

* O usuário deve selecionar um serviço durante o processo de agendamento.

## Duração

* A duração do serviço deve ser considerada no cálculo da disponibilidade da agenda.
* Horários ocupados por um serviço não podem ser utilizados por outro atendimento simultaneamente.

# Regras de Negócio - Agendamentos

## Criação

* O usuário deve selecionar um barbeiro.
* O usuário deve selecionar um serviço.
* O usuário deve escolher um horário disponível.

## Validação

* Não podem existir dois agendamentos para o mesmo profissional no mesmo horário.
* O sistema deve impedir agendamentos em horários ocupados.
* O sistema deve impedir agendamentos em períodos de indisponibilidade.

## Reagendamento

* O usuário pode alterar um agendamento existente.
* O novo horário deve respeitar todas as regras de disponibilidade.

## Cancelamento

* O usuário pode cancelar um agendamento existente.
* O sistema deve registrar o cancelamento.

## Notificações

* O sistema deve notificar o usuário após a confirmação do agendamento.
* O sistema deve notificar o usuário quando ocorrer um cancelamento.

## Consulta

* O usuário pode visualizar seus agendamentos.
* O barbeiro pode visualizar os atendimentos presentes em sua agenda.
