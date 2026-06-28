# ADR-006 — Adoção de Padrões GoF (Adapter e Observer)

- **Status:** Aceito
- **Data:** Junho/2026
- **Autores:** Silph Corp (José Gabriel, Geovany, Afonso, Paulo Henrique)

## Contexto

Durante a análise arquitetural do MVP, a equipe identificou dois pontos críticos de acoplamento:

1. **Notificações externas:** o sistema depende de serviços externos (WhatsApp, e-mail) que podem mudar ou falhar.
2. **Ações pós-agendamento:** criação de agendamento dispara múltiplas ações secundárias (notificação, auditoria, métricas) concentradas em um único fluxo.

## Decisão

Adotar os padrões **Adapter** e **Observer** do catálogo GoF.

---

## Padrão Adapter

### Problema
Chamada direta ao provider externo (WhatsApp) dentro do use case — trocar o provider exigiria alterar regras de negócio.

### Solução

| Elemento | Papel no Barber Agenda |
|----------|----------------------|
| Interface (contrato) | `INotificationService` — define o contrato de envio |
| Adapter WhatsApp | `WhatsAppAdapter` — implementa o contrato via API externa |
| Adapter E-mail | `EmailAdapter` — implementa o contrato via SMTP/SendGrid |
| Adapter Interno | `InternalAdapter` — fallback sem dependência externa |
| Use Case | `AgendamentoUseCase` — usa apenas a interface, não o adapter |

---

## Padrão Observer

### Problema
Todas as ações pós-agendamento concentradas no `AgendamentoService`, gerando alta responsabilidade e dificultando extensão.

### Solução

| Elemento | Papel no Barber Agenda |
|----------|----------------------|
| Publisher (Subject) | `AgendamentoService` — emite eventos ao criar/cancelar |
| Observer: Notificação | `NotificationObserver` — dispara envio ao cliente |
| Observer: Auditoria | `AuditObserver` — registra log de alterações |
| Observer: Métricas | `MetricsObserver` — coleta dados de uso |

---

## Comparativo: Antes × Depois

| Aspecto | Antes (sem padrões) | Depois (ADR-006) |
|---------|--------------------|--------------------|
| Notificações | Chamada direta ao provider no use case | Interface `INotificationService` via Adapter |
| Ações pós-agendamento | Tudo concentrado no `AgendamentoService` | Subscribers independentes via Observer |
| Troca de provider | Exige alteração nas regras de negócio | Apenas substituir o Adapter |
| Testabilidade | Testes dependem de integração real | Mock da interface em testes unitários |
| Acoplamento | Alto — módulos dependem de implementações | Baixo — módulos dependem de contratos |

## Consequências

- **Positivas:** menor acoplamento, maior testabilidade, extensibilidade sem refatoração estrutural
- **Negativas:** mais interfaces e arquivos; requer disciplina para não criar adapters desnecessários
