# ADR-004 — Adoção de React com padrão MVVM

- **Status:** Aceito
- **Data:** Abril/2026
- **Autores:** Silph Corp (José Gabriel, Geovany, Afonso, Paulo Henrique)

## Contexto

O frontend precisa exibir horários disponíveis, listas de profissionais e estados de agendamento de forma dinâmica e reativa, sem recarregamento de página.

## Opções Consideradas

1. **HTML/CSS/TS puro com Vite** — simples, mas gerenciamento de estado complexo para interfaces reativas.
2. **React com padrão MVVM** — componentes reativos com hooks como ViewModel.

## Decisão

Utilizar **React com padrão MVVM**, implementado via hooks customizados.

## Mapeamento MVVM → React

| MVVM | React | Exemplo |
|------|-------|---------|
| Model | Serviços de API, DTOs | `agendamentoService.ts` |
| ViewModel | Custom Hooks | `useAgendamento`, `useBarbeiro` |
| View | Componentes React | `AgendaCalendar.tsx` |
| Data Binding | useState / useEffect / Context | Estado reativo |

## Justificativa

- MVVM é o padrão dominante em interfaces reativas modernas
- React + hooks implementam naturalmente o conceito de ViewModel com data binding
- Atualização automática da UI ao mudar estado (horários, disponibilidade)

## Consequências

- **Positivas:** UI reativa, separação clara de responsabilidades no frontend, testabilidade dos hooks
- **Negativas:** curva de aprendizado em hooks customizados para membros menos familiarizados com React
