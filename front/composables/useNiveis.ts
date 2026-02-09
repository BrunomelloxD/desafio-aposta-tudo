import type { Nivel, PaginatedResponse } from '~/types'
import { getErrorMessage } from '~/utils/errorHandler'

/**
 * Composable para gerenciar operações de níveis
 */
export const useNiveis = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const fetchNiveis = async (
    page: number = 1,
    limit: number = 10,
    search: string = ''
  ): Promise<PaginatedResponse<Nivel>> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search })
      })

      return await $fetch<PaginatedResponse<Nivel>>(`${apiBase}/api/niveis?${params}`)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  const createNivel = async (nivel: string): Promise<Nivel> => {
    try {
      return await $fetch<Nivel>(`${apiBase}/api/niveis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { nome: nivel }
      })
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  const updateNivel = async (id: string, nivel: string): Promise<Nivel> => {
    try {
      return await $fetch<Nivel>(`${apiBase}/api/niveis/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: { nome: nivel }
      })
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  const deleteNivel = async (id: string): Promise<void> => {
    try {
      await $fetch(`${apiBase}/api/niveis/${id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  return {
    fetchNiveis,
    createNivel,
    updateNivel,
    deleteNivel
  }
}
