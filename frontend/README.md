# Barber Agenda — Frontend

Frontend do Barber Agenda: React + Vite + TypeScript, estilizado com Tailwind CSS.

> ⚠️ O frontend não se conecta diretamente ao Supabase. Toda comunicação passa
> pela API REST do backend (`../backend`), conforme ADR-005.

## Stack

- React + Vite
- TypeScript
- Tailwind CSS (v4, config via `@theme` em `src/index.css`)
- React Router
- React Hook Form + Zod

## Estrutura de Pastas (Feature-Sliced Design)

Ver `../docs/frontendocs/overview.md` para a descrição completa da arquitetura.

```
src/
├── app/        ← configuração global (App.tsx)
├── pages/      ← composição de widgets por página
├── widgets/    ← blocos visuais compostos por features
├── features/   ← funcionalidades com lógica de negócio
├── entities/   ← tipos de domínio
└── shared/     ← código reutilizável sem lógica de negócio (Design System, client HTTP)
```

## Como rodar

```bash
npm install
npm run dev
```

Crie um `.env` (baseado em `.env.example`) apontando `VITE_API_URL` para o backend.

## Documentação relacionada

- [Design System](../docs/frontendocs/design-system.md)
- [Custom Hooks](../docs/frontendocs/custom-hooks.md)
- [Formulários e Validação](../docs/frontendocs/forms-validation.md)
