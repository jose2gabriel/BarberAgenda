# Regras de Negócio — Usuários

Módulo: `usuarios/`  
Requisitos relacionados: RF001, RF002, RF017, RF018, RF019, RF030, RNF001, RNF006, RNF007, RNF010

---

## Cadastro (RF001)

- O sistema deve aceitar: nome, e-mail, telefone e senha
- **E-mails duplicados são proibidos** (RNF007) — retorna `409 EMAIL_ALREADY_EXISTS`
- A senha deve ser armazenada com **bcrypt** — nunca em texto puro (RNF001)
- Todo novo usuário recebe o perfil `cliente` por padrão
- O perfil `owner` é definido no momento do cadastro, quando o usuário escolhe criar uma barbearia
- O perfil `profissional` é atribuído pelo owner ao cadastrar o profissional em sua barbearia (ADR-007)

## Autenticação (RF002)

- Login realizado com e-mail + senha
- Sistema gera token JWT após validação bem-sucedida
- Token contém: `id`, `email`, `role`, `iat`, `exp`
- Credenciais incorretas retornam `401` sem indicar qual campo está errado (segurança)

## Autorização (RF017)

- Todas as rotas protegidas requerem token JWT válido no header `Authorization`
- O campo `role` no token define o nível de acesso:
  - `cliente` — acesso às próprias funcionalidades de agendamento
  - `profissional` — cliente + gestão de agenda própria
  - `owner` — gestão completa das barbearias que possui (ADR-007)

## Encerramento de Sessão (RF018)

- O usuário pode encerrar a sessão a qualquer momento
- O token é invalidado no backend

## Atualização de Dados (RF019)

- Usuário pode atualizar: nome, telefone e senha
- Para alterar a senha, é necessário informar a senha atual
- E-mail não pode ser alterado após o cadastro

## Recuperação de Senha (RF030)

- Usuário solicita recuperação informando o e-mail cadastrado
- Sistema envia link com token temporário de redefinição
- Token de recuperação tem validade limitada
- Após uso, o token é invalidado

## Exclusão de Dados — LGPD (RNF010)

- Usuário pode solicitar exclusão de sua conta e dados pessoais
- Agendamentos futuros são cancelados automaticamente
- Dados de auditoria histórica podem ser mantidos de forma anonimizada
