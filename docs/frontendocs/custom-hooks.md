# Custom Hooks — Barber Agenda

> O professor exige no mínimo 2 custom hooks (vale 1,0 ponto).
> Abaixo estão os hooks do projeto com implementação completa.

---

## 1. useAuth

**Responsabilidade:** gerencia autenticação do usuário — login, logout, estado da sessão.

```typescript
// src/features/auth/model/useAuth.ts
import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'cliente' | 'profissional' | 'owner'
}

async function fetchUsuarioAtual(token: string): Promise<User | null> {
  try {
    const res = await fetch('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Recupera sessão salva
    const token = localStorage.getItem('token')
    if (token) {
      // valida token com o backend (GET /users/me)
      fetchUsuarioAtual(token).then(setUser).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  async function login(email: string, password: string) {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) throw new Error('Credenciais inválidas')

    const { token, user } = await response.json()
    localStorage.setItem('token', token)
    setUser(user)
  }

  async function logout() {
    await fetch('/auth/logout', { method: 'POST' })
    localStorage.removeItem('token')
    setUser(null)
  }

  return { user, loading, login, logout, isAuthenticated: !!user }
}
```

**Onde é usado:**
- Página de login
- Header (exibir nome do usuário)
- Proteção de rotas privadas

---

## 2. useAgendamento

**Responsabilidade:** gerencia o fluxo completo de agendamento — buscar horários disponíveis, criar, cancelar e reagendar.

```typescript
// src/features/agendamento/model/useAgendamento.ts
import { useState } from 'react'

interface SlotDisponivel {
  time: string
  available: boolean
}

interface Agendamento {
  id: string
  date: string
  startTime: string
  endTime: string
  status: 'agendado' | 'concluido' | 'cancelado'
  professional: { name: string }
  service: { name: string; price: number }
}

export function useAgendamento() {
  const [slots, setSlots] = useState<SlotDisponivel[]>([])
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function buscarSlotsDisponiveis(barbershopId: string, professionalId: string, date: string, serviceId: string) {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `/barbershops/${barbershopId}/professionals/${professionalId}/available-slots?date=${date}&serviceId=${serviceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()
      setSlots(data)
    } catch {
      setError('Erro ao buscar horários disponíveis.')
    } finally {
      setLoading(false)
    }
  }

  async function criarAgendamento(dados: {
    professionalId: string
    serviceId: string
    date: string
    time: string
  }) {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      })
      if (!res.ok) throw new Error('Horário indisponível.')
      return await res.json()
    } catch (e: any) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }

  async function cancelarAgendamento(id: string) {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await fetch(`/appointments/${id}/cancel`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      })
      setAgendamentos(prev => prev.filter(a => a.id !== id))
    } finally {
      setLoading(false)
    }
  }

  async function listarMeusAgendamentos() {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setAgendamentos(data)
    } finally {
      setLoading(false)
    }
  }

  return {
    slots,
    agendamentos,
    loading,
    error,
    buscarSlotsDisponiveis,
    criarAgendamento,
    cancelarAgendamento,
    listarMeusAgendamentos,
  }
}
```

**Onde é usado:**
- Página de agendamento
- Página de meus agendamentos

---

## 3. useBarbeiro (terceiro hook — opcional mas recomendado)

**Responsabilidade:** busca e gerencia dados de profissionais e barbearias.

```typescript
// src/features/barbershop/model/useBarbeiro.ts
import { useState, useEffect } from 'react'

export function useBarbeiro(barbershopId?: string) {
  const [profissionais, setProfissionais] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!barbershopId) return
    setLoading(true)
    fetch(`/barbershops/${barbershopId}/professionals`)
      .then(res => res.json())
      .then(setProfissionais)
      .finally(() => setLoading(false))
  }, [barbershopId])

  return { profissionais, loading }
}
```

---

## Resumo para a apresentação

| Hook | Isola o quê |
|------|------------|
| `useAuth` | Autenticação — login, logout, sessão |
| `useAgendamento` | Fluxo de agendamento — slots, criar, cancelar |
| `useBarbeiro` | Busca de profissionais por barbearia |

> Na apresentação, o professor pediu para mostrar o custom hook mais interessante.
> O **useAgendamento** é o mais rico — mostra estado, loading, error e múltiplas operações.
