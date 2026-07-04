# ADR-0003- Definição-da-stack-tecnologica-do-mvp

## Status
Aprovado

## Contexto
O Barber Agenda é um MVP desenvolvido para gerenciamento de agendamentos de barbearia. O projeto precisa de uma stack tecnológica que ofereça simplicidade de desenvolvimento, baixo custo operacional, facilidade de manutenção e suporte a interfaces reativas e atualizações em tempo real dos horários de agendamento.

## Decisão
Foi definida uma stack baseada em arquitetura web moderna utilizando:

• Front-end em React, utilizando conceitos de MVVM com hooks e gerenciamento de estado reativo.
• Back-end organizado em Monolito Modular com Clean Architecture e Vertical Slices.
• Banco de dados relacional, devido à necessidade de consistência transacional nos agendamentos, controle de conflitos de horário e relacionamento entre usuários, barbeiros, serviços e horários.

A escolha prioriza produtividade da equipe, organização modular e facilidade de evolução futura do sistema.

## Consequências 
Positivas

Desenvolvimento mais rápido para o MVP.
• Interface reativa e dinâmica com React.
• Melhor organização e manutenção do código.
• Consistência e integridade dos dados de agendamento.
• Facilidade de evolução futura para microsserviços.

Negativas

• Estrutura arquitetural inicial mais complexa.
• Possível limitação de escalabilidade no crescimento do sistema.
• Necessidade de disciplina arquitetural para manter o isolamento dos módulos.
