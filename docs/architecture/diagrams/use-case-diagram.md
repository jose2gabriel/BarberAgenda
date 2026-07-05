# Diagrama de Casos de Uso

> Atualizado com perfil `owner` (ADR-007). Baseado nos requisitos funcionais RF001–RF030.

```mermaid
graph LR
    CLI(("Cliente"))
    PRO(("Profissional"))
    OWN(("Owner\n(Dono da Barbearia)"))

    subgraph Sistema["Barber Agenda"]

        subgraph Acesso["Identidade e Acesso"]
            UC1["RF001 Cadastrar conta"]
            UC2["RF002 Fazer login"]
            UC18["RF018 Encerrar sessão"]
            UC19["RF019 Atualizar dados"]
            UC30["RF030 Recuperar senha"]
        end

        subgraph Barbearia["Barbearias"]
            UCB1["ADR-007 Ver barbearias"]
            UCB2["ADR-007 Criar barbearia"]
            UCB3["ADR-007 Atualizar barbearia"]
        end

        subgraph Agendamento["Agendamentos"]
            UC6["RF006 Agendar horário"]
            UC7["RF007 Validar disponibilidade"]
            UC8["RF008 Cancelar agendamento"]
            UC9["RF009 Reagendar"]
            UC10["RF010 Ver meus agendamentos"]
            UC28["RF028 Ver histórico"]
        end

        subgraph Profissionais["Profissionais"]
            UC4["RF004 Ver profissionais da barbearia"]
            UC5["RF022 Ver horários disponíveis"]
            UC11["RF011 Ver minha agenda"]
            UC24["RF024 Registrar indisponibilidade"]
        end

        subgraph GestaoOwner["Gestão da Barbearia (Owner)"]
            UC3["RF003 Cadastrar profissional"]
            UC14["RF014 Cadastrar serviço"]
            UC20["RF020 Definir horário de funcionamento"]
        end

    end

    CLI --> UC1
    CLI --> UC2
    CLI --> UC18
    CLI --> UC19
    CLI --> UC30
    CLI --> UCB1
    CLI --> UC4
    CLI --> UC5
    CLI --> UC6
    CLI --> UC8
    CLI --> UC9
    CLI --> UC10
    CLI --> UC28

    PRO --> UC2
    PRO --> UC11
    PRO --> UC24
    PRO --> UC8
    PRO --> UC28

    OWN --> UC2
    OWN --> UCB2
    OWN --> UCB3
    OWN --> UC3
    OWN --> UC14
    OWN --> UC20
    OWN --> UC10
    OWN --> UC28

    UC6 -.->|"inclui"| UC7
```

## Perfis e Permissões (RF027 + ADR-007)

| Ação | Cliente | Profissional | Owner |
|------|:-------:|:------------:|:-----:|
| Cadastrar conta | ✅ | — | — |
| Fazer login | ✅ | ✅ | ✅ |
| Ver barbearias | ✅ | ✅ | ✅ |
| Criar barbearia | — | — | ✅ |
| Gerenciar barbearia | — | — | ✅ (própria) |
| Agendar horário | ✅ | — | — |
| Cancelar agendamento | ✅ (próprio) | ✅ (próprio) | ✅ (barbearia) |
| Reagendar | ✅ | — | — |
| Ver agendamentos | ✅ (próprios) | ✅ (próprios) | ✅ (barbearia) |
| Ver agenda individual | — | ✅ | — |
| Registrar indisponibilidade | — | ✅ | — |
| Cadastrar profissional | — | — | ✅ (própria) |
| Cadastrar serviço | — | — | ✅ (própria) |
| Definir horário de funcionamento | — | — | ✅ (própria) |
