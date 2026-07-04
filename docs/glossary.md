# Glossário — Barber Agenda

| Termo | Definição |
|-------|-----------|
| **ADR** | Architecture Decision Record — documento que registra uma decisão arquitetural, seu contexto, as opções consideradas e as consequências |
| **Adapter** | Padrão GoF que converte a interface de uma classe em outra esperada pelo cliente, desacoplando o sistema de implementações externas |
| **Agendamento** | Reserva de um horário com um profissional para um serviço específico |
| **Barbearia (barbershop)** | Entidade central do sistema multi-tenant (ADR-007). Possui um owner, profissionais, serviços e horário de funcionamento próprios |
| **bcrypt** | Algoritmo de hash utilizado para armazenar senhas com segurança (RNF001) |
| **Clean Architecture** | Arquitetura proposta por Uncle Bob onde dependências sempre apontam para o centro (domínio), isolando regras de negócio de tecnologias externas |
| **DoD** | Definition of Done — critérios que uma tarefa deve atender para ser considerada concluída |
| **DTO** | Data Transfer Object — objeto usado para transferir dados entre camadas sem expor entidades de domínio |
| **GoF** | Gang of Four — autores do livro *Design Patterns* (1994), catálogo de 23 padrões de projeto clássicos |
| **INotificationService** | Interface (contrato) que abstrai o envio de notificações, implementada por adapters (WhatsApp, e-mail, interno) |
| **JWT** | JSON Web Token — padrão para transmitir informações de autenticação de forma segura entre cliente e servidor |
| **LGPD** | Lei Geral de Proteção de Dados — legislação brasileira que regula o tratamento de dados pessoais |
| **Monolito Modular** | Arquitetura de aplicação única dividida internamente em módulos com isolamento lógico e responsabilidades bem definidas |
| **Motor de Agendamento** | Núcleo central do sistema responsável por validar disponibilidade, detectar conflitos e registrar agendamentos |
| **MVP** | Minimum Viable Product — versão mínima do produto com as funcionalidades essenciais para validação |
| **Multi-tenant** | Modelo onde um único sistema atende múltiplas barbearias isoladas entre si, cada uma com seus próprios dados (ADR-007) |
| **MVVM** | Model-View-ViewModel — padrão de apresentação onde o ViewModel expõe dados observáveis e a View se atualiza automaticamente via data binding |
| **Observer** | Padrão GoF onde um objeto (publisher) notifica automaticamente seus dependentes (subscribers) sobre eventos |
| **Owner** | Perfil de usuário dono de uma ou mais barbearias. Gerencia profissionais, serviços e horários de funcionamento das barbearias que possui (ADR-007) |
| **RLS** | Row Level Security — mecanismo do PostgreSQL/Supabase para controlar quais linhas cada usuário pode acessar. Planejado para pós-MVP (ver security-guide.md) |
| **RNF** | Requisito Não Funcional — restrição de qualidade do sistema (desempenho, segurança, usabilidade) |
| **RF** | Requisito Funcional — funcionalidade que o sistema deve oferecer |
| **RVS** | Relatório de Viabilidade de Software — documento que analisa a viabilidade do projeto nas dimensões TELOS |
| **React Hook Form** | Biblioteca de gerenciamento de formulários no frontend, integrada com Zod via `zodResolver` |
| **Supabase** | Plataforma de banco de dados gerenciado que fornece PostgreSQL como serviço, utilizado exclusivamente como provedor de BD no projeto |
| **TELOS** | Framework de análise de viabilidade: Technical, Economic, Legal, Operational, Schedule |
| **Vertical Slices** | Organização do código por funcionalidades completas (features) em vez de por tipo técnico (controllers, services, etc.) |
| **Vite** | Ferramenta de build rápida para projetos TypeScript/React no frontend |
| **Zod** | Biblioteca de validação de schemas em TypeScript. Usada no backend (validação de entrada) e no frontend (junto com React Hook Form) |
