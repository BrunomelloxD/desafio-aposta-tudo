import type { Profissional, PaginatedResponse } from '~/types'
import { getErrorMessage } from '~/utils/errorHandler'
import { PAGINATION } from '~/utils/constants'

import type { Sexo } from '~/utils/constants'

interface ProfissionalFormData {
  nome: string
  nivel_id: string
  sexo: Sexo
  data_nascimento: string
  hobby: string
}

/**
 * Composable para gerenciar operações de profissionais
 */
export const useProfissionais = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  /**
   * Busca profissionais com paginação e filtro de pesquisa
   * @param page - Número da página
   * @param limit - Quantidade de itens por página
   * @param search - Termo de busca (opcional)
   * @returns Lista paginada de profissionais
   */
  const fetchProfissionais = async (
    page: number = PAGINATION.DEFAULT_PAGE,
    limit: number = PAGINATION.DEFAULT_LIMIT,
    search: string = ''
  ): Promise<PaginatedResponse<Profissional>> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search })
      })

      return await $fetch<PaginatedResponse<Profissional>>(`${apiBase}/api/profissionais?${params}`)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  /**
   * Cria um novo profissional
   * @param data - Dados do profissional
   * @returns Profissional criado
   */
  const createProfissional = async (data: ProfissionalInput): Promise<Profissional> => {
    try {
      return await $fetch<Profissional>(`${apiBase}/api/profissionais`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
      })
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  /**
   * Atualiza um profissional existente
   * @param id - ID do profissional
   * @param data - Novos dados do profissional
   * @returns Profissional atualizado
   */
  const updateProfissional = async (id: string, data: ProfissionalInput): Promise<Profissional> => {
    try {
      return await $fetch<Profissional>(`${apiBase}/api/profissionais/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data
      })
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  /**
   * Exclui um profissional
   * @param id - ID do profissional a ser excluído
   */
  const deleteProfissional = async (id: string): Promise<void> => {
    try {
      await $fetch(`${apiBase}/api/profissionais/${id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  return {
    fetchProfissionais,
    createProfissional,
    updateProfissional,
    deleteProfissional
  }
}
