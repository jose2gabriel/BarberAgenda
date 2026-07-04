# 0005 - Padronização de ORM

## Status
Aprovado

## Contexto
O Barber Agenda necessita de uma forma padronizada para acesso ao banco de dados, garantindo organização, produtividade e facilidade de manutenção no desenvolvimento do sistema. Como o projeto possui funcionalidades de agendamento, usuários e gerenciamento de barbeiros, é importante manter uma camada de persistência bem estruturada.

## Decisão
Foi definida a utilização do Prisma ORM como ferramenta de acesso ao banco de dados da aplicação.

O Prisma foi escolhido por oferecer tipagem forte, facilidade de integração com aplicações modernas em JavaScript/TypeScript e maior produtividade no desenvolvimento. Além disso, sua integração com arquiteturas modulares facilita a organização dos repositórios e entidades do sistema.

## Consequências 
Positivas

• Redução da complexidade de consultas SQL manuais.
• Maior produtividade no desenvolvimento.
• Melhor organização e padronização do código.
• Integração eficiente com TypeScript.
• Facilidade de manutenção e evolução do banco de dados.

Negativas

• Dependência de uma biblioteca externa.
• Necessidade de aprendizado da ferramenta pela equipe.
• Possível limitação em consultas muito específicas ou complexas.
