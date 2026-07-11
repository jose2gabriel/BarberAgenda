# Monolito Modular

## Conceito

Um Monolito Modular é uma aplicação única dividida internamente em módulos com isolamento lógico, responsabilidades bem definidas e barreiras de domínio respeitadas. Os módulos compartilham infraestrutura (rede, banco, processo), mas não compartilham estado interno nem dependem uns dos outros diretamente.

## Por que Monolito Modular no Barber Agenda?

Com equipe reduzida (4 integrantes) e prazo acadêmico, microsserviços aumentariam exponencialmente a complexidade de desenvolvimento e deploy. O Monolito Modular oferece:

- Desenvolvimento e deploy simplificados
- Menor custo de infraestrutura (Vercel free tier + Supabase free tier)
- Consistência transacional nativa (sem SAGA ou 2PC)
- Organização interna sem overhead operacional
- Possibilidade de evolução para microsserviços no futuro

## Vantagens e Desvantagens

| Vantagens | Desvantagens |
|-----------|-------------|
| Desenvolvimento e deploy simplificados vs. microsserviços | Crescimento excessivo pode aumentar complexidade |
| Menor custo de infraestrutura | Deploy conjunto — falha pode afetar toda a aplicação |
| Consistência transacional nativa | Escalabilidade horizontal limitada vs. microsserviços |
| Facilidade de evoluir para microsserviços no futuro | Requer disciplina arquitetural para não degradar |

## Módulos Internos

```
barber-agenda/
├── usuarios/          ← Autenticação, perfil, permissões (JWT)
├── professionals/     ← Cadastro de profissionais na barbearia
├── services/          ← Catálogo, preços, duração
├── unavailabilities/  ← Indisponibilidade dos profissionais (RF024, RF025)
├── agendamentos/      ← Criação, validação de conflitos, notificações
└── barbershops/       ← Multi-tenant, gestão da barbearia pelo owner (ADR-007)
```

> **Regra:** módulos se comunicam por interfaces bem definidas, nunca por acesso direto a repositórios ou banco de dados uns dos outros.

## Referências

- ADR-001: [Decisão de adoção do Monolito Modular](../adr/ADR-001-monolith-modular.md)
