# ADR-007 — Suporte a Múltiplas Barbearias (Multi-tenant)

- **Status:** Aceito
- **Data:** Junho/2026
- **Autores:** Silph Corp (José Gabriel, Geovany, Afonso, Paulo Henrique)

## Contexto

Durante o desenvolvimento do MVP, identificou-se que um profissional pode ser dono de uma barbearia e ter outros profissionais trabalhando sob ela. O sistema precisa suportar múltiplas barbearias num único ambiente, onde clientes podem agendar em qualquer barbearia cadastrada.

## Decisão

Introduzir a entidade `barbershops` como centro do modelo de dados, tornando o sistema **multi-tenant por barbearia**.

## O que muda

### Perfis (RF027 atualizado)

| Perfil | Antes | Depois |
|--------|-------|--------|
| `cliente` | Agenda no sistema | Agenda em qualquer barbearia |
| `profissional` | Vinculado ao sistema | Vinculado a uma barbearia |
| `admin` | Admin global | **Removido** — substituído por `owner` |
| `owner` | Não existia | Dono de uma ou mais barbearias |

### Entidades afetadas

| Entidade | Mudança |
|----------|---------|
| `barbershops` | **Nova** — entidade central |
| `professionals` | Adicionado `barbershop_id` |
| `services` | Adicionado `barbershop_id` — cada barbearia define os seus |
| `business_hours` | Adicionado `barbershop_id` — cada barbearia define os seus |
| `appointments` | Adicionado `barbershop_id` — para consultas e relatórios |

## Permissões por Perfil

| Ação | Cliente | Profissional | Owner |
|------|:-------:|:------------:|:-----:|
| Agendar em qualquer barbearia | ✅ | — | — |
| Ver profissionais de uma barbearia | ✅ | ✅ | ✅ |
| Gerenciar própria agenda | — | ✅ | — |
| Registrar indisponibilidade | — | ✅ | ✅ |
| Cadastrar profissionais na barbearia | — | — | ✅ |
| Cadastrar serviços da barbearia | — | — | ✅ |
| Definir horário de funcionamento | — | — | ✅ |
| Criar barbearia | — | — | ✅ |

## Justificativa

- Reflete o modelo real de negócio: um barbeiro pode ser dono e ter uma equipe
- Não existe necessidade de admin global — o owner gerencia o que é dele
- Serviços e horários por barbearia evitam conflito entre estabelecimentos diferentes
- A entidade `barbershops` permite crescimento natural do sistema

## Consequências

- **Positivas:** modelo mais próximo da realidade, escalável para múltiplas barbearias, sem admin global desnecessário
- **Negativas:** aumenta a complexidade das queries (sempre filtrar por `barbershop_id`), requer atenção ao RLS do Supabase para garantir isolamento entre barbearias
- **Atenção:** todas as rotas da API que antes usavam `admin` precisam ser revisadas para usar `owner` com validação de que o owner está agindo sobre a sua própria barbearia
