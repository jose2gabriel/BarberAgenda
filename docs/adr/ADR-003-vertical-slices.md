# ADR-003 — Adoção de Vertical Slices

- **Status:** Aceito
- **Data:** Abril/2026
- **Autores:** Silph Corp (José Gabriel, Geovany, Afonso, Paulo Henrique)

## Contexto

Com 4 integrantes desenvolvendo funcionalidades em paralelo, era necessário uma forma de organizar o código que minimizasse conflitos e tornasse o trabalho independente por feature.

## Decisão

Organizar o backend em **Vertical Slices** — cada módulo (usuarios, barbeiros, servicos, agendamentos, administrativo) contém seus próprios controllers, use cases e repositórios.

## Justificativa

- Reduz conflitos de merge entre membros da equipe
- Facilita localização do código relacionado a uma funcionalidade
- Alta coesão interna por módulo e baixo acoplamento entre módulos

## Consequências

- **Positivas:** autonomia por módulo, menos conflitos, código mais fácil de navegar
- **Negativas:** pode haver duplicação de utilitários entre módulos se não houver shared layer bem definida
