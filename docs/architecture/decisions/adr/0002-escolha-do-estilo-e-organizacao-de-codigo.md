# ADR-0002-Escolha-do-estilo-e-organizacao-de-codigo

## Status
Aprovado

## Contexto
O sistema de agendamento da barbearia possui regras críticas de negócio, como validação de horários disponíveis, prevenção de conflitos entre agendamentos e gerenciamento da disponibilidade dos barbeiros. Essas regras precisam permanecer independentes de frameworks, banco de dados ou tecnologias externas, garantindo maior estabilidade e facilidade de manutenção. Além disso, o crescimento do sistema exige uma organização que reduza o acoplamento entre funcionalidades.

## Decisão
Foi adotada a Clean Architecture para proteger o núcleo do domínio e garantir que as regras de negócio sejam independentes da infraestrutura. Em conjunto, utilizou-se a abordagem de Vertical Slices (feature-based), organizando o sistema por funcionalidades, como usuários, barbeiros, serviços e agendamentos. Cada módulo possui seus próprios controllers, use cases e repositórios, promovendo isolamento e independência entre as funcionalidades.

## Consequências 
Positivas

• Maior organização e escalabilidade do sistema.
• Redução do acoplamento entre funcionalidades.
• Facilidade de manutenção e evolução do software.
• Regras de negócio protegidas contra mudanças tecnológicas.
• Melhor suporte para testes e futuras integrações.

Negativas

• Estrutura inicial mais complexa.
• Necessidade de maior conhecimento arquitetural da equipe.
• Maior tempo de configuração no início do projeto.