# Regras de Negócio — Barbeiros (Profissionais)

Módulo: `barbeiros/`  
Requisitos relacionados: RF003, RF004, RF011, RF021, RF022, RF023, RF024, RF025, RF026

---

## Cadastro de Profissionais (RF003)

- Apenas administradores podem cadastrar profissionais
- Informações necessárias: nome, especialidade, serviços associados
- Ao ser cadastrado, o profissional recebe perfil `profissional` e acesso à área dedicada

## Listagem de Profissionais (RF004)

- Todos os usuários autenticados podem visualizar a lista de profissionais disponíveis
- A listagem exibe nome, foto (se cadastrada) e serviços oferecidos por cada profissional

## Agenda Individual (RF021)

- Cada profissional possui uma agenda independente
- Agendamentos de um profissional não interferem na agenda de outro
- O profissional visualiza apenas os atendimentos da sua própria agenda (RF011)

## Visualização de Horários (RF022)

- Clientes podem consultar os horários disponíveis de cada profissional antes de agendar
- Horários já ocupados e períodos de indisponibilidade **não são exibidos** como disponíveis
- A duração do serviço selecionado é considerada no cálculo de disponibilidade (RF016)

## Identificação do Profissional (RF026)

- O sistema sempre informa ao cliente qual profissional realizará o atendimento
- A identificação aparece na confirmação, nos detalhes e no histórico do agendamento

## Controle de Indisponibilidade (RF024, RF025)

- Profissionais podem registrar períodos em que não estarão disponíveis (folgas, férias, compromissos)
- O sistema **impede automaticamente** novos agendamentos em períodos marcados como indisponíveis
- Agendamentos já existentes nesses períodos devem ser gerenciados manualmente pelo administrador

## Horário de Funcionamento Compartilhado (RF020)

- Existe um horário base de funcionamento da barbearia
- Agendamentos só podem ser realizados dentro desse horário base
- O administrador é responsável por configurar e atualizar o horário de funcionamento
