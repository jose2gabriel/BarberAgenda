# Autenticação — Barber Agenda

## Estratégia

O sistema utiliza **JWT (JSON Web Token)** implementado no backend Node.js/Express para autenticação e controle de sessão. O Supabase é utilizado apenas como banco de dados — a autenticação é responsabilidade exclusiva do backend.

## Fluxo de Autenticação

```
1. Cliente envia POST /auth/login { email, senha }
2. Backend valida credenciais no PostgreSQL
3. Senha verificada com bcrypt (RNF001)
4. Backend gera token JWT assinado
5. Token retornado ao cliente
6. Cliente armazena o token e envia em todas as requisições:
   Authorization: Bearer <token>
7. Middleware de autenticação valida o token a cada requisição (RF017)
```

## Estrutura do Token JWT

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "id": "user_id",
    "email": "usuario@email.com",
    "role": "cliente | profissional | owner",
    "iat": 1234567890,
    "exp": 1234567890
  }
}
```

## Segurança das Credenciais (RNF001)

- Senhas armazenadas com **bcrypt** — nunca em texto puro
- Tokens JWT assinados com secret seguro armazenado em variável de ambiente
- Tokens com expiração definida (RNF006)
- Invalidação de sessão via logout (RF018)

## Controle de Acesso por Perfil (RF027)

O campo `role` no payload do JWT define as permissões:

| Role | Acesso |
|------|--------|
| `cliente` | Rotas de agendamento e perfil próprio |
| `profissional` | Rotas de cliente + gerenciamento de agenda própria |
| `owner` | Gerenciamento completo das barbearias que possui (não da plataforma toda — ADR-007) |

## Recuperação de Senha (RF030)

1. Usuário solicita recuperação via `POST /auth/recover-password`
2. Sistema envia e-mail com link de redefinição (token temporário)
3. Usuário redefine senha via `PATCH /auth/reset-password`
4. Token de recuperação é invalidado após uso

## Referências

- RNF001 — Segurança das Credenciais
- RNF006 — Gerenciamento de Sessão
- RF002 — Autenticação de Usuário
- RF017 — Autorização de Acesso
- RF018 — Encerramento de Sessão
- RF030 — Recuperação de Senha
