# Regras de Negócio — Serviços

Módulo: `services/`  
Requisitos relacionados: RF014, RF015, RF016

---

## Cadastro de Serviços (RF014)

- Apenas o **owner** pode cadastrar, editar e remover serviços — e somente das barbearias que ele mesmo possui (ADR-007)
- Informações por serviço: nome, descrição, duração (em minutos) e preço
- A **duração** é obrigatória — ela é usada diretamente pelo motor de agendamento

## Seleção de Serviço (RF015)

- Durante o agendamento, o cliente deve selecionar um serviço
- A lista exibe: nome, duração estimada e preço
- A seleção do serviço é obrigatória antes de escolher horário

## Controle de Duração (RF016)

- A duração do serviço é considerada ao calcular a disponibilidade de horários
- Exemplo: se um corte dura 60 minutos e o cliente seleciona 14h, o horário de 14h30 também é bloqueado para esse profissional
- Isso impede sobreposição de atendimentos
