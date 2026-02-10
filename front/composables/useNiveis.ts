import type { Nivel, PaginatedResponse } from '~/types'
import { getErrorMessage } from '~/utils/errorHandler'
import { PAGINATION } from '~/utils/constants'

/**
 * Composable para gerenciar operações de níveis
 */
export const useNiveis = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  /**
   * Busca níveis com paginação e filtro de pesquisa
   * @param page - Número da página
   * @param limit - Quantidade de itens por página
   * @param search - Termo de busca (opcional)
   * @returns Lista paginada de níveis
   */
  const fetchNiveis = async (
    page: number = PAGINATION.DEFAULT_PAGE,
    limit: number = PAGINATION.DEFAULT_LIMIT,
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

  /**
   * Cria um novo nível
   * @param nivel - Nome do nível
   * @returns Nível criado
   */
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

  /**
   * Atualiza um nível existente
   * @param id - ID do nível
   * @param nivel - Novo nome do nível
   * @returns Nível atualizado
   */
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

  /**
   * Exclui um nível
   * @param id - ID do nível a ser excluído
   */
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
