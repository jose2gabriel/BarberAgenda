import { useCallback, useState } from 'react'
import { api, ApiError } from '../../../shared/lib/api'
import type { Barbershop } from '../../../entities/barbershop/types'
import type { Professional } from '../../../entities/professional/types'
import type { Service } from '../../../entities/service/types'

/**
 * Busca e gerencia dados de barbearias, profissionais e serviços
 * (custom-hooks.md) — usado nas páginas /barbershops e /barbershops/:id.
 */
export function useBarbeiro() {
  const [barbearias, setBarbearias] = useState<Barbershop[]>([])
  const [barbearia, setBarbearia] = useState<Barbershop | null>(null)
  const [profissionais, setProfissionais] = useState<Professional[]>([])
  const [servicos, setServicos] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const listarBarbearias = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.get<Barbershop[]>('/barbershops')
      setBarbearias(data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao buscar barbearias.')
    } finally {
      setLoading(false)
    }
  }, [])

  const buscarBarbearia = useCallback(async (barbershopId: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.get<Barbershop>(`/barbershops/${barbershopId}`)
      setBarbearia(data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao buscar barbearia.')
    } finally {
      setLoading(false)
    }
  }, [])

  const listarProfissionais = useCallback(async (barbershopId: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.get<Professional[]>(`/barbershops/${barbershopId}/professionals`)
      setProfissionais(data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao buscar profissionais.')
    } finally {
      setLoading(false)
    }
  }, [])

  const listarServicos = useCallback(async (barbershopId: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.get<Service[]>(`/barbershops/${barbershopId}/services`)
      setServicos(data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao buscar serviços.')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    barbearias,
    barbearia,
    profissionais,
    servicos,
    loading,
    error,
    listarBarbearias,
    buscarBarbearia,
    listarProfissionais,
    listarServicos,
  }
}
