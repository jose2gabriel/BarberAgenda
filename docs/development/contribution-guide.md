# Guia de Contribuição

## Primeiros Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/jose2gabriel/BarberAgenda.git
   cd BarberAgenda
   ```

2. Instale as dependências:
   ```bash
   # Backend
   cd backend && npm install

   # Frontend
   cd frontend && npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Preencha DATABASE_URL, JWT_SECRET, etc.
   ```

4. Inicie o ambiente de desenvolvimento:
   ```bash
   # Backend
   npm run dev

   # Frontend
   npm run dev
   ```

## Fluxo de Trabalho

1. Crie uma branch a partir de `develop` seguindo a [branching strategy](./branching-strategy.md)
2. Desenvolva a feature ou correção
3. Escreva ou atualize testes
4. Abra um Pull Request seguindo o [processo de PR](./pull-request-process.md)
5. Aguarde revisão de pelo menos 1 membro do time

## Padrões

- Siga os [coding standards](./coding-standards.md)
- Use o [commit convention](./commit-convention.md)
- Consulte a [definition of done](./definition-of-done.md) antes de marcar como pronto
