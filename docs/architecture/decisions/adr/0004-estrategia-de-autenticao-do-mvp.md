# 0004 - Estratégia de Autenticação do MVP

## Status
Aprovado

## Contexto
O Barber Agenda necessita de um sistema de autenticação para controlar o acesso de clientes, barbeiros e administradores. Como o projeto encontra-se em fase de MVP e possui equipe reduzida, é importante minimizar a complexidade de implementação e os riscos relacionados à segurança.

## Decisão
Foi decidido utilizar autenticação baseada em JWT (JSON Web Token) integrada ao back-end do sistema. Essa abordagem permite controle direto sobre login, permissões e sessões dos usuários, mantendo a autenticação integrada ao Monolito Modular do projeto.

A solução foi escolhida por sua simplicidade de integração, ampla adoção no desenvolvimento web moderno e facilidade de implementação com React no front-end.

## Consequências 
Positivas
• Controle completo da autenticação pela equipe.
• Fácil integração com React e APIs REST.
• Estrutura simples para o MVP.
• Menor dependência de serviços externos.
• Facilidade de evolução futura para autenticação mais robusta.

Negativas

• Responsabilidade da equipe sobre segurança e gerenciamento de tokens.
• Necessidade de implementar proteção contra expiração e ataques.
• Maior esforço de manutenção comparado a serviços prontos como Firebase Auth ou Auth0.
