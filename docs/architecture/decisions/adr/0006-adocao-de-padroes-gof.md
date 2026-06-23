# ADR 0006 - Adoção de Padrões GoF

## Status
Aprovado

## Contexto

Durante a análise do MVP BarberAgenda foram identificados pontos de acoplamento relacionados a integrações externas e ao fluxo de criação de agendamentos.

O sistema poderá utilizar serviços externos de notificação, como e-mail ou WhatsApp, que podem ser substituídos futuramente.

Além disso, a criação de um agendamento poderá exigir a execução de ações adicionais, como envio de notificações, registro de logs e atualização de métricas.

## Decisão

### Adapter
Será criada uma interface `NotificationService` para abstrair serviços externos de notificação.

Adaptadores concretos serão responsáveis por integrar o sistema com provedores específicos, permitindo que a camada de domínio permaneça desacoplada de bibliotecas e APIs externas.

### Observer
Será adotado um mecanismo de eventos para ações relacionadas ao ciclo de vida dos agendamentos.

Quando um agendamento for criado, o sistema emitirá um evento `AppointmentCreated`.

Observadores independentes poderão reagir ao evento para executar responsabilidades específicas, como envio de notificações, auditoria e métricas.

## Consequências

### Positivas
- Redução do acoplamento com serviços externos.
- Facilidade para substituir provedores de notificação.
- Maior extensibilidade para novas funcionalidades.
- Separação entre regras de negócio e efeitos colaterais.
- Melhor preparação para o Spec-Driven Development.

### Negativas
- Aumento da quantidade de classes e interfaces.
- Maior complexidade arquitetural inicial.
- Necessidade de manutenção dos contratos entre componentes.
- Curva de aprendizado para compreensão dos padrões adotados.

