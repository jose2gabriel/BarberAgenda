# Formulários e Validação — Barber Agenda

> O professor exige React Hook Form + Zod (vale 1,0 ponto).

## Instalação

```bash
npm install react-hook-form zod @hookform/resolvers
```

## Padrão de uso

Todos os formulários do projeto seguem esse padrão:
1. Schema Zod define as regras de validação
2. React Hook Form gerencia o estado do formulário
3. `zodResolver` conecta os dois

---

## Formulário de Login

```tsx
// src/components/forms/LoginForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../../hooks/useAuth'

const loginSchema = z.object({
  email:    z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginForm() {
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginForm) {
    try {
      await login(data.email, data.password)
    } catch {
      setError('root', { message: 'E-mail ou senha incorretos.' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="E-mail" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" placeholder="Senha" />
      {errors.password && <span>{errors.password.message}</span>}

      {errors.root && <span>{errors.root.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

---

## Formulário de Cadastro

```tsx
// src/components/forms/CadastroForm.tsx
const cadastroSchema = z.object({
  name:            z.string().min(2, 'Nome muito curto'),
  email:           z.string().email('E-mail inválido'),
  phone:           z.string().min(10, 'Telefone inválido'),
  password:        z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})
```

---

## Formulário de Agendamento

```tsx
// src/components/forms/AgendamentoForm.tsx
const agendamentoSchema = z.object({
  professionalId: z.string().uuid('Selecione um profissional'),
  serviceId:      z.string().uuid('Selecione um serviço'),
  date:           z.string().date('Data inválida'),
  time:           z.string().min(1, 'Selecione um horário'),
})
```

---

## Por que React Hook Form + Zod?

| Sem as libs | Com as libs |
|------------|-------------|
| Estado manual com useState | Estado gerenciado automaticamente |
| Validação manual em cada campo | Schema centralizado e reutilizável |
| Re-renders desnecessários | Re-render apenas no campo alterado |
| Tipos manuais | Tipos gerados pelo Zod automaticamente |
