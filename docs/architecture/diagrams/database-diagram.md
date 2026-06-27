# Diagrama do Banco de Dados

> Atualizado para suportar múltiplas barbearias no mesmo sistema (decisão documentada na ADR-007).  
> Renderiza automaticamente no GitHub.

```mermaid
erDiagram

    users {
        uuid id PK
        varchar name
        varchar email UK
        varchar phone
        varchar password_hash
        enum role "cliente | profissional | owner"
        timestamp created_at
        timestamp updated_at
    }

    barbershops {
        uuid id PK
        uuid owner_id FK
        varchar name
        varchar address
        varchar phone
        timestamp created_at
        timestamp updated_at
    }

    professionals {
        uuid id PK
        uuid user_id FK
        uuid barbershop_id FK
        varchar specialty
        timestamp created_at
    }

    services {
        uuid id PK
        uuid barbershop_id FK
        varchar name
        text description
        int duration_minutes
        decimal price
        timestamp created_at
    }

    professional_services {
        uuid professional_id FK
        uuid service_id FK
    }

    business_hours {
        uuid id PK
        uuid barbershop_id FK
        int day_of_week "0=Dom, 6=Sab"
        time open_time
        time close_time
    }

    unavailabilities {
        uuid id PK
        uuid professional_id FK
        timestamp starts_at
        timestamp ends_at
        text reason
        timestamp created_at
    }

    appointments {
        uuid id PK
        uuid client_id FK
        uuid professional_id FK
        uuid service_id FK
        uuid barbershop_id FK
        date date
        time start_time
        time end_time
        enum status "agendado | concluido | cancelado"
        timestamp created_at
        timestamp updated_at
    }

    password_resets {
        uuid id PK
        uuid user_id FK
        varchar token UK
        timestamp expires_at
        boolean used
    }

    users ||--o{ barbershops : "é dono de (owner)"
    users ||--o| professionals : "pode ser"
    users ||--o{ appointments : "realiza (cliente)"
    users ||--o{ password_resets : "solicita"

    barbershops ||--o{ professionals : "tem"
    barbershops ||--o{ services : "oferece"
    barbershops ||--o{ business_hours : "define"
    barbershops ||--o{ appointments : "recebe"

    professionals ||--o{ appointments : "atende"
    professionals ||--o{ professional_services : "oferece"
    professionals ||--o{ unavailabilities : "registra"

    services ||--o{ professional_services : "pertence a"
    services ||--o{ appointments : "é realizado em"
```

## Observações Importantes

### `users`
- `email` tem constraint `UNIQUE` em todo o sistema (RNF007)
- `password_hash` armazena o hash bcrypt — nunca a senha em texto puro (RNF001)
- `role` define o nível de acesso:
  - `cliente` — agenda em qualquer barbearia
  - `profissional` — vinculado a uma barbearia, gerencia própria agenda
  - `owner` — dono de uma barbearia, gerencia profissionais, serviços e horários

### `barbershops` — Barbearias
- Entidade central do sistema multi-tenant
- `owner_id` aponta para o `user` com `role = owner`
- Um owner pode ter mais de uma barbearia (relação 1-para-muitos)
- Serviços, horários de funcionamento e profissionais pertencem à barbearia

### `professionals`
- Todo profissional é também um `user` com `role = profissional`
- `barbershop_id` define a qual barbearia o profissional pertence
- Um profissional pertence a uma única barbearia no MVP

### `services`
- `barbershop_id` — cada barbearia define seu próprio catálogo de serviços
- `duration_minutes` é obrigatório — usado pelo motor de agendamento para calcular `end_time` (RF016)
- Um serviço pertence a uma única barbearia

### `professional_services`
- Relaciona quais serviços cada profissional oferece dentro da sua barbearia
- Apenas serviços da mesma barbearia podem ser associados ao profissional

### `business_hours`
- `barbershop_id` — cada barbearia define seu próprio horário de funcionamento (RF020)
- O owner configura e atualiza
- O motor de agendamento consulta esta tabela para validar horários

### `unavailabilities`
- Registra períodos em que um profissional não está disponível (RF024)
- O motor de agendamento bloqueia agendamentos nesse intervalo (RF025)

### `appointments`
- `barbershop_id` — registrado para facilitar consultas e relatórios por barbearia
- `end_time` é calculado como `start_time + duration_minutes` do serviço (RF016)
- `status`: `agendado`, `concluido` ou `cancelado` (RF029)
- Validação de conflito: verifica sobreposição de `[start_time, end_time]` para o mesmo `professional_id` e `date`

### `password_resets`
- Token de uso único com expiração (RF030)
- Campo `used` impede reuso do mesmo token
