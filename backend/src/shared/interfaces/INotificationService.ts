export interface DadosNotificacaoAgendamento {
  clienteEmail: string
  clienteNome: string
  profissionalNome: string
  servicoNome: string
  date: string
  startTime: string
}

/**
 * RF012/RF013 — Notificações de agendamento (Adapter — ADR-006).
 * Hoje só existe o provedor de e-mail (ver EmailNotificationService);
 * WhatsApp/interno ficam pra Fase 2 (roadmap.md), então não há
 * Observer/multi-adapter aqui ainda — só a interface que os use cases
 * de agendamento dependem, sem conhecer o provedor concreto.
 */
export interface INotificationService {
  notificarAgendamentoCriado(dados: DadosNotificacaoAgendamento): Promise<void>
  notificarAgendamentoCancelado(dados: DadosNotificacaoAgendamento): Promise<void>
}
