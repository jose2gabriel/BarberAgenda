# Regras de Negócio — Agendamentos

Módulo: `agendamentos/`  
Requisitos relacionados: RF006, RF007, RF008, RF009, RF010, RF012, RF013, RF016, RF028, RF029

---

## Motor de Agendamento

Núcleo central e de maior complexidade técnica do sistema. Integra clientes, profissionais, serviços e disponibilidade de horários.

### Fluxo de Criação

| Etapa | Ação |
|-------|------|
| 1 | Cliente se autentica (JWT) |
| 2 | Escolhe um profissional |
| 3 | Seleciona um serviço |
| 4 | Escolhe uma data disponível |
| 5 | Sistema verifica conflitos de horários (backend) |
| 6 | Cliente seleciona o horário e confirma |
| 7 | Sistema valida disponibilidade e registra o agendamento |
| 8 | Usuário recebe confirmação do agendamento |

---

## Validação de Disponibilidade (RF007)

- O backend verifica, em **dupla camada** (lógica + banco), se o horário está disponível
- Um horário é considerado **indisponível** quando:
  - Já existe agendamento com sobreposição (considerando duração do serviço — RF016)
  - O profissional registrou indisponibilidade naquele período (RF025)
  - O horário está fora do funcionamento da barbearia (RF020)
- Em caso de conflito, retorna `409 SCHEDULE_CONFLICT`

## Restrição de Auto-Agendamento

- Um profissional não pode criar um agendamento tendo a si mesmo como profissional — checado em
  `CriarAgendamentoUseCase` comparando `profissional.userId` com o `clientId` da requisição
- Retorna `400 SELF_BOOKING_NOT_ALLOWED`
- O frontend também esconde o próprio profissional da lista de seleção em `/barbershops/:id`
  (só quando o usuário logado tem o papel `profissional` nessa barbearia) — a validação real,
  porém, é só no backend

## Status do Agendamento (RF029)

| Status | Descrição |
|--------|-----------|
| `agendado` | Agendamento confirmado e ativo |
| `concluido` | Atendimento realizado |
| `cancelado` | Agendamento cancelado pelo cliente, profissional ou owner |

## Cancelamento (RF008)

- Cliente, profissional e owner podem cancelar agendamentos (owner apenas dentro de sua barbearia)
- Ao cancelar, o horário é liberado automaticamente para novos agendamentos
- O usuário recebe notificação de cancelamento (RF013)

## Reagendamento (RF009)

- O cliente pode alterar a data/horário de um agendamento existente
- O sistema valida disponibilidade no novo horário antes de confirmar a alteração
- O horário anterior é liberado após confirmação

## Notificações (RF012, RF013)

Eventos que disparam notificações ao cliente:

| Evento | Notificação |
|--------|-------------|
| Confirmação de agendamento | Detalhes do atendimento confirmado (RF012) |
| Cancelamento de agendamento | Aviso de cancelamento com detalhes (RF013) |

As notificações são enviadas via `INotificationService` (padrão Adapter — ADR-006). O provedor padrão pode ser e-mail, WhatsApp ou notificação interna.

## Histórico de Atendimentos (RF028)

- Clientes e profissionais podem consultar atendimentos realizados anteriormente
- O histórico inclui: data, horário, profissional, serviço e status final
- Dados históricos são preservados mesmo após cancelamento de conta (anonimizados — RNF010)
- **Filtros avançados** (status, profissional, período de/até) implementados em `/appointments`
  — 100% client-side, filtrando o array já retornado por `GET /appointments` (que não tem corte
  de data — devolve todo o histórico do usuário, passado e futuro, não só os agendamentos
  futuros)
- **Pendente:** os mesmos filtros ainda não existem em `/professional/schedule` (agenda do
  profissional) — hoje só o lado do cliente tem essa UI, embora a regra diga que profissionais
  também devem poder consultar com filtros

## Consulta de Agendamentos (RF010, RF011)

- **Cliente:** visualiza apenas seus próprios agendamentos
- **Profissional:** visualiza todos os agendamentos da sua agenda
- **Owner:** visualiza agendamentos das barbearias que possui (não da plataforma toda — cada owner só vê suas próprias barbearias, ADR-007)
