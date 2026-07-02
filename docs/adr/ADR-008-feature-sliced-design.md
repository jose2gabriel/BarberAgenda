# ADR-008 — Adoção de Feature-Sliced Design no Frontend

- **Status:** Aceito
- **Data:** Julho/2026
- **Autores:** Silph Corp (José Gabriel, Geovany, Afonso, Paulo Henrique)

## Contexto

A documentação inicial do frontend usava uma organização plana (`components/`, `hooks/`, `pages/`, `services/`). Com o crescimento do número de features (auth, agendamento, barbershop), essa estrutura tende a gerar acoplamento entre funcionalidades distintas e dificultar a localização do código.

## Decisão

Adotar **Feature-Sliced Design (FSD)** na organização do frontend.

## Estrutura de Camadas

```
app → pages → widgets → features → entities → shared
```

Cada camada só pode importar das camadas abaixo dela — nunca para cima.

| Camada | Responsabilidade |
|--------|-----------------|
| `app` | Configuração global — rotas, providers, estilos |
| `pages` | Composição de widgets por página |
| `widgets` | Blocos visuais compostos por features |
| `features` | Funcionalidades com lógica de negócio (ui + model + api) |
| `entities` | Tipos e interfaces de domínio |
| `shared` | Código reutilizável sem lógica de negócio (Design System, client HTTP) |

## Onde ficam os artefatos existentes

| Artefato | Antes | Depois (FSD) |
|----------|-------|--------------|
| `useAuth.ts` | `hooks/` | `features/auth/model/` |
| `useAgendamento.ts` | `hooks/` | `features/agendamento/model/` |
| `useBarbeiro.ts` | `hooks/` | `features/barbershop/model/` |
| `LoginForm.tsx` | `components/forms/` | `features/auth/ui/` |
| `Button.tsx`, `Input.tsx` | `components/ui/` | `shared/ui/` |
| Schemas Zod | `schemas/` | `shared/schemas/` |
| `api.ts` (client HTTP) | `lib/` | `shared/lib/` |

## Justificativa

- Features isoladas — mudança em `agendamento/` não afeta `auth/`
- Regra de importação clara — evita dependências circulares
- Fácil de explicar na apresentação — cada feature é auto-contida
- Custom Hooks ficam próximos da feature que os usa

## Consequências

- **Positivas:** alta coesão por feature, baixo acoplamento entre features, estrutura escalável
- **Negativas:** mais pastas do que a estrutura anterior, curva inicial de aprendizado da regra de importação
- O backend **não** usa FSD — mantém Vertical Slices + Clean Architecture (ADR-003)
