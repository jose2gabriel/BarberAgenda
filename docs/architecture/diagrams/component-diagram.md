# Diagrama de Componentes

> Mostra como frontend, backend e banco de dados se comunicam no Barber Agenda.

```mermaid
graph TD
    subgraph Cliente["Navegador (Cliente)"]
        UI["React + Vite\nMVVM via Hooks"]
    end

    subgraph Backend["Backend (Node.js + Express)"]
        MW["Middleware JWT\nAutenticação / Autorização"]
        
        subgraph Modulos["Módulos (Vertical Slices)"]
            MOD_USR["usuarios/\nCadastro, Login, Perfil"]
            MOD_BAR["barbeiros/\nAgenda, Disponibilidade"]
            MOD_SRV["servicos/\nCatálogo"]
            MOD_AGD["agendamentos/\nMotor de Agendamento"]
            MOD_ADM["administrativo/\nPainel, Relatórios"]
        end

        subgraph Patterns["Padrões GoF (ADR-006)"]
            OBS["Observer\nAgendamentoService"]
            ADP["Adapter\nINotificationService"]
        end

        subgraph Adapters["Implementações do Adapter"]
            EMAIL["EmailAdapter"]
            INTERNAL["InternalAdapter\n(fallback)"]
        end
    end

    subgraph Infra["Infraestrutura"]
        DB[("PostgreSQL\nSupabase")]
        VERCEL["Vercel\nFrontend CDN"]
    end

    UI -->|"HTTPS REST\nAuthorization: Bearer token"| MW
    MW --> MOD_USR
    MW --> MOD_BAR
    MW --> MOD_SRV
    MW --> MOD_AGD
    MW --> MOD_ADM

    MOD_AGD -->|"emite evento"| OBS
    OBS -->|"notifica"| ADP
    ADP --> EMAIL
    ADP --> INTERNAL

    MOD_USR --> DB
    MOD_BAR --> DB
    MOD_SRV --> DB
    MOD_AGD --> DB
    MOD_ADM --> DB

    VERCEL -->|"serve"| UI
```

## Fluxo de uma Requisição Autenticada

```mermaid
sequenceDiagram
    actor Cliente
    participant React as React (Frontend)
    participant API as Express API
    participant JWT as Middleware JWT
    participant UC as Use Case
    participant DB as PostgreSQL

    Cliente->>React: Ação na interface
    React->>API: POST /api/v1/appointments\nAuthorization: Bearer token
    API->>JWT: Valida token
    JWT-->>API: token válido + role
    API->>UC: Executa CriarAgendamentoUseCase
    UC->>DB: Verifica conflitos
    DB-->>UC: Horário disponível
    UC->>DB: Insere agendamento
    DB-->>UC: Agendamento criado
    UC-->>API: Resultado
    API-->>React: 201 Created
    React-->>Cliente: Confirmação na tela
```

## Responsabilidades por Camada

| Camada | Responsabilidade | Tecnologia |
|--------|-----------------|-----------|
| Frontend | Apresentação, estado local, chamadas à API | React + TypeScript + Vite |
| Middleware | Validação do JWT em toda requisição protegida | jsonwebtoken |
| Módulos | Regras de negócio isoladas por domínio | Node.js + Express |
| Use Cases | Orquestração da lógica de negócio (Clean Architecture) | TypeScript |
| Repositórios | Acesso ao banco de dados | PostgreSQL via Supabase |
| Observer | Disparo de eventos pós-agendamento | Padrão GoF |
| Adapter | Envio de notificações desacoplado do provider | Padrão GoF |
