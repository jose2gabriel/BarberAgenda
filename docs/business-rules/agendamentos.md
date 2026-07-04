# Regras de Negócio - Agendamentos

## Criação de Agendamentos

- O usuário deve selecionar um profissional.
- O usuário deve selecionar um serviço.
- O usuário deve selecionar uma data e horário disponíveis.
- O sistema deve validar a disponibilidade antes da confirmação.

## Disponibilidade

- Não podem existir dois agendamentos para o mesmo profissional no mesmo horário.
- O sistema deve considerar a duração do serviço ao verificar disponibilidade.
- Horários ocupados devem ser bloqueados para novos agendamentos.
- Períodos de indisponibilidade devem impedir novos agendamentos.

## Reagendamento

- O usuário pode reagendar um atendimento existente.
- O novo horário deve respeitar as regras de disponibilidade.
- O sistema deve validar conflitos antes da confirmação.

## Cancelamento

- O usuário pode cancelar um agendamento existente.
- O sistema deve registrar o cancelamento.
- O horário cancelado deve voltar a ficar disponível.

## Consulta

- O usuário pode visualizar seus agendamentos.
- O profissional pode visualizar sua agenda de atendimentos.

## Notificações

- O sistema deve notificar o usuário após a confirmação do agendamento.
- O sistema deve notificar o usuário em caso de cancelamento.
- As notificações devem conter informações do serviço, profissional, data e horário.

## Identificação do Profissional

- Todo agendamento deve estar vinculado a um profissional.
- O sistema deve informar ao usuário qual profissional realizará o atendimento.