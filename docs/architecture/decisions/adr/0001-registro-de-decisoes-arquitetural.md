# ADR-0001-Registro-de-decisoes

## Status
Aprovado

## Contexto
A escolha do Monolito Modular se justifica pela simplicidade operacional e pela redução da
complexidade de infraestrutura. Como o projeto encontra-se em estágio inicial com equipe reduzida,
adotar microsserviços aumentaria exponencialmente a complexidade de desenvolvimento,
comunicação entre serviços e deploy.

## Decisão
Justificativa técnica:
• Um único processo facilita debugging e desenvolvimento local.
• Módulos internos (usuários, barbeiros, agendamentos) garantem organização sem overhead
operacional.
• A evolução para microsserviços é possível no futuro, extraindo módulos como serviços
independentes.

## Consequências
Positivas

• Redução da complexidade de infraestrutura e deploy.
• Desenvolvimento mais rápido para uma equipe pequena.
• Facilidade de manutenção e debugging em um único projeto.
• Melhor organização interna através da separação em módulos.
• Menor custo operacional no estágio inicial do sistema.

Negativas

• Crescimento do sistema pode aumentar o acoplamento entre módulos.
• Escalabilidade limitada em comparação com microsserviços.
• Uma falha no sistema pode impactar toda a aplicação.
• Deploy único pode dificultar atualizações independentes de módulos específicos.
