# Vertical Slices

## Conceito

Vertical Slices é uma abordagem que organiza o sistema por funcionalidades em vez de camadas técnicas.

Cada funcionalidade contém tudo o que precisa para funcionar:

- Casos de uso
- Regras de negócio
- Persistência
- Contratos

## Organização Tradicional

Controllers/
Services/
Repositories/
Entities/

Essa estrutura tende a espalhar arquivos relacionados por diversas pastas.

Organização por Fatias Verticais
Usuarios/
Barbeiros/
Servicos/
Agendamentos/

Cada módulo contém sua própria estrutura interna.

## Exemplo
Agendamentos/
├── Domain/
├── Application/
├── Infrastructure/
└── Presentation/

## Benefícios

## Alta Coesão

Todos os arquivos relacionados permanecem próximos.

## Baixo Acoplamento

Mudanças em uma funcionalidade afetam menos partes do sistema.

## Escalabilidade

Novas funcionalidades podem ser adicionadas sem impactar módulos existentes.

## Manutenção

A localização do código torna-se mais simples.

## Aplicação no Barber Agenda

O sistema será organizado pelos módulos:

Usuários
Barbeiros
Serviços
Agendamentos

Cada módulo seguirá os princípios da Clean Architecture, mantendo independência e organização interna.