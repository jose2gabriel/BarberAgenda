# Páginas do Sistema — Barber Agenda

> Mapeamento completo de telas baseado no backend implementado.
> Cada página corresponde a endpoints reais já existentes.

---

## Páginas Públicas (sem autenticação)

### `/login` — Login
- **Feature:** `features/auth/`
- **Endpoints:** `POST /api/v1/auth/login`
- **Elementos:** formulário email + senha, link para cadastro, link para recuperar senha
- **Hook:** `useAuth`

### `/register` — Cadastro
- **Feature:** `features/auth/`
- **Endpoints:** `POST /api/v1/auth/register`
- **Elementos:** formulário nome, email, telefone, senha, confirmação de senha
- **Hook:** `useAuth`

### `/recover-password` — Solicitar Recuperação de Senha
- **Feature:** `features/auth/`
- **Endpoints:** `POST /api/v1/auth/recover-password`
- **Elementos:** formulário email, mensagem de confirmação de envio

### `/reset-password` — Redefinir Senha
- **Feature:** `features/auth/`
- **Endpoints:** `PATCH /api/v1/auth/reset-password`
- **Elementos:** formulário nova senha + confirmação, token via query param `?token=...`
- Alias de `/redefinir-senha`, que é o link real enviado por e-mail

### `/register-barbershop` — Cadastro Guiado de Dono de Barbearia
- **Feature:** `features/auth/` + `features/barbershop/`
- **Endpoints:** `POST /api/v1/auth/register`, `POST /api/v1/barbershops`
- **Elementos:** fluxo único (cadastro de usuário + criação da barbearia) acessado pelo link
  "É dono de uma barbearia?" na Home

> `/dashboard` foi removido (era idêntico a `/barbershops` na prática) — a rota continua registrada
> só como `<Navigate to="/barbershops" replace />`, pra não quebrar links antigos.

---

## Páginas do Cliente (role: cliente)

### `/barbershops` — Listagem de Barbearias
- **Feature:** `features/barbershop/`
- **Endpoints:** `GET /api/v1/barbershops`
- **Elementos:** cards de barbearias com foto, nome, endereço e botão "Ver profissionais"
- **Hook:** `useBarbeiro`

### `/barbershops/:id` — Detalhes da Barbearia
- **Feature:** `features/barbershop/`
- **Endpoints:** `GET /api/v1/barbershops/:id`, `GET /api/v1/barbershops/:id/professionals`, `GET /api/v1/barbershops/:id/services`
- **Elementos:** foto da barbearia, nome, endereço, lista de profissionais, lista de serviços, botão "Agendar"
- **Hook:** `useBarbeiro`

### `/appointments/new` — Novo Agendamento
- **Feature:** `features/agendamento/`
- **Endpoints:** `GET /api/v1/barbershops/:id/professionals`, `GET /api/v1/barbershops/:id/services`, `POST /api/v1/appointments`
- **Elementos:** seleção de profissional, seleção de serviço, seleção de data, seleção de horário disponível, botão confirmar
- **Hook:** `useAgendamento`

### `/appointments` — Meus Agendamentos
- **Feature:** `features/agendamento/`
- **Endpoints:** `GET /api/v1/appointments`
- **Elementos:** lista de agendamentos futuros com status, botões cancelar e reagendar
- **Hook:** `useAgendamento`

### `/profile` — Meu Perfil
- **Feature:** `features/auth/`
- **Endpoints:** `GET /api/v1/users/me`, `PATCH /api/v1/users/me`, `DELETE /api/v1/users/me`
- **Elementos:** dados do usuário, formulário de edição, botão excluir conta

---

## Páginas do Profissional (role: profissional)

### `/professional/schedule` — Minha Agenda
- **Feature:** `features/agendamento/`
- **Endpoints:** `GET /api/v1/appointments` (filtrado por profissional), `PATCH /api/v1/appointments/:id/cancelar`
- **Elementos:** lista de agendamentos do profissional com status e botão "Cancelar" (agendamentos ativos)
- **Hook:** `useAgendamento`

### `/professional/unavailability` — Minha Indisponibilidade
- **Feature:** `features/agendamento/`
- **Endpoints:** `POST /api/v1/barbershops/:id/professionals/:id/unavailability`
- **Elementos:** calendário para selecionar período, campo motivo, lista de indisponibilidades registradas

---

## Páginas do Owner (role: owner)

### `/owner/barbershops` — Minhas Barbearias
- **Feature:** `features/barbershop/`
- **Endpoints:** `GET /api/v1/barbershops`, `POST /api/v1/barbershops`
- **Elementos:** lista de barbearias do owner, botão criar nova barbearia
- **Hook:** `useBarbeiro`

### `/owner/barbershops/:id` — Gerenciar Barbearia
- **Feature:** `features/barbershop/`
- **Endpoints:** `GET /api/v1/barbershops/:id`, `PATCH /api/v1/barbershops/:id`
- **Elementos:** formulário de edição (nome, endereço, telefone, foto), horário de funcionamento

### `/owner/barbershops/:id/professionals` — Gerenciar Profissionais
- **Feature:** `features/barbershop/`
- **Endpoints:** `GET /api/v1/barbershops/:id/professionals`, `POST /api/v1/barbershops/:id/professionals`
- **Elementos:** lista de profissionais, formulário cadastrar novo profissional

### `/owner/barbershops/:id/services` — Gerenciar Serviços
- **Feature:** `features/barbershop/`
- **Endpoints:** `GET /api/v1/barbershops/:id/services`, `POST /api/v1/barbershops/:id/services`
- **Elementos:** lista de serviços (nome, preço, duração, foto), formulário cadastrar novo serviço

### `/owner/barbershops/:id/hours` — Horário de Funcionamento
- **Feature:** `features/barbershop/`
- **Endpoints:** `GET /api/v1/barbershops/:id/hours`, `POST /api/v1/barbershops/:id/hours`
- **Elementos:** formulário de horário de abertura/fechamento por dia da semana

---

## Navegação (Sidebar)

Todas as telas autenticadas são envolvidas por `ProtectedRoute`, que renderiza a `Sidebar`
globalmente (`widgets/sidebar/Sidebar.tsx`) — não há mais cabeçalho por página. A sidebar é
retrátil (`SidebarContext`, persistida em `localStorage`) e os links variam por papel:

- **Todos os papéis:** Barbearias, Meus agendamentos, Meu perfil.
- **Owner:** enquanto nenhuma barbearia estiver "ativa", só aparece "Minhas barbearias". Ao entrar
  em `/owner/barbershops/:id` (clicando na lista ou navegando direto pela URL), essa barbearia vira
  a **barbearia ativa** (`ActiveBarbershopContext`, persistida em `localStorage`) e a sidebar passa
  a mostrar atalhos diretos: Editar barbearia, Profissionais, Serviços, Horários, Trocar barbearia.
- **Profissional:** "Minha agenda" e "Indisponibilidade" aparecem direto, sem seleção prévia (um
  profissional contratado só tem uma barbearia). Ficam no mesmo grupo "Sua barbearia" do owner —
  não há seção separada.

---

## Componentes Compartilhados (shared/ui)

| Componente | Uso |
|-----------|-----|
| `Button` | Todos os formulários e ações |
| `Input` | Todos os formulários |
| `Card` | Cards de barbearia, profissional, agendamento |
| `Avatar` | Foto de barbearia, profissional, serviço e usuário |
| `StatusBadge` | Status do agendamento (agendado, concluído, cancelado) |
| `LoadingSpinner` | Durante chamadas à API |
| `ErrorMessage` | Exibição de erros de validação e API |

---

## Rotas por Perfil — Resumo

| Rota | Público | Cliente | Profissional | Owner |
|------|:-------:|:-------:|:------------:|:-----:|
| `/login` | ✅ | — | — | — |
| `/register` | ✅ | — | — | — |
| `/recover-password` | ✅ | — | — | — |
| `/reset-password` | ✅ | — | — | — |
| `/register-barbershop` | ✅ | — | — | — |
| `/barbershops` | — | ✅ | ✅ | ✅ |
| `/barbershops/:id` | — | ✅ | ✅ | ✅ |
| `/appointments/new` | — | ✅ | — | — |
| `/appointments` | — | ✅ | ✅ | ✅ |
| `/profile` | — | ✅ | ✅ | ✅ |
| `/professional/schedule` | — | — | ✅ | — |
| `/professional/unavailability` | — | — | ✅ | — |
| `/owner/barbershops` | — | — | — | ✅ |
| `/owner/barbershops/:id` | — | — | — | ✅ |
| `/owner/barbershops/:id/professionals` | — | — | — | ✅ |
| `/owner/barbershops/:id/services` | — | — | — | ✅ |
| `/owner/barbershops/:id/hours` | — | — | — | ✅ |
