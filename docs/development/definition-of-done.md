# Definition of Done (DoD)

Uma tarefa é considerada **concluída** quando todos os critérios abaixo são atendidos:

## Funcionalidade

- [ ] Implementação completa do requisito funcional (RF correspondente)
- [ ] Validações de entrada implementadas no controller
- [ ] Respostas de erro retornam os códigos e mensagens corretos (ver `error-codes.md`)

## Qualidade de Código

- [ ] Código segue os [coding standards](./coding-standards.md)
- [ ] Nenhum `any` sem justificativa documentada
- [ ] Sem segredos hardcoded (senhas, tokens, URLs de banco)

## Segurança

- [ ] Rotas protegidas verificam JWT (RF017)
- [ ] Permissões verificadas por `role` (RF027)
- [ ] Senhas tratadas com bcrypt (RNF001)

## Testes

- [ ] Testes unitários escritos para use cases e domínio
- [ ] Testes passando (`npm test`)

## Documentação

- [ ] Endpoint documentado em `api/endpoints.md` (se aplicável)
- [ ] Regra de negócio documentada em `business-rules/` (se aplicável)
- [ ] ADR criada se houver decisão arquitetural relevante

## Revisão

- [ ] PR aprovado por pelo menos 1 membro do time
- [ ] Branch atualizada com `develop` sem conflitos
- [ ] Issue fechada após merge

## Segurança (obrigatório em todo endpoint)

- [ ] Input validado com Zod no controller
- [ ] Rota protegida por middleware JWT (se aplicável)
- [ ] Nenhum dado sensível em `console.log`
- [ ] Nenhum segredo hardcoded no código
