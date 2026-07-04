# Regras de Negócio — Barbearias

Módulo: `barbershops/`  
Decisão arquitetural: ADR-007

---

## O que é uma Barbearia

A barbearia é a entidade central do sistema. Todo profissional, serviço, horário de funcionamento e agendamento pertence a uma barbearia. Um cliente pode agendar em qualquer barbearia cadastrada no sistema.

## Criação de Barbearia

- Qualquer usuário pode se cadastrar como `owner` e criar uma barbearia
- Um owner pode ter mais de uma barbearia
- Ao criar a barbearia, o owner define: nome, endereço, telefone e foto (opcional)
- A foto é armazenada no Supabase Storage (bucket `avatars`) e a URL salva no campo `avatar_url`

## O que o Owner gerencia

O owner é responsável por tudo dentro da sua barbearia:

- Cadastrar e remover profissionais
- Definir os serviços oferecidos e seus preços e durações
- Configurar o horário de funcionamento
- Acompanhar todos os agendamentos da barbearia

> O owner **não pode** gerenciar dados de outras barbearias — só as suas.

## Isolamento entre Barbearias

- Serviços de uma barbearia não aparecem em outra
- Profissionais de uma barbearia não podem ser agendados em outra
- Horários de funcionamento são independentes por barbearia
- O RLS do Supabase deve garantir esse isolamento no banco

## Profissionais dentro da Barbearia

- Um profissional pertence a uma única barbearia no MVP
- O owner cadastra o profissional e o vincula à barbearia
- O profissional gerencia apenas sua própria agenda dentro da barbearia

## Visibilidade para o Cliente

- O cliente vê a lista de barbearias disponíveis no sistema
- Dentro de uma barbearia, vê os profissionais e serviços disponíveis
- O cliente pode agendar em qualquer barbearia
