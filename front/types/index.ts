/**
 * Tipos TypeScript compartilhados da aplicação
 */

import type { Sexo } from '~/utils/constants'

/**
 * Representa um nível profissional
 */
export interface Nivel {
  id: string
  nivel: string 
  createdAt?: string
  updatedAt?: string
}

/**
 * Representa um profissional cadastrado
 */
export interface Profissional {
  id: string
  nome: string
  nivel_id?: string
  nivel?: string 
  sexo: Sexo
  data_nascimento: string
  hobby: string
  idade?: number
  createdAt?: string
  updatedAt?: string
}

/**
 * Resposta padrão de endpoints paginados
 * @template T - Tipo dos dados retornados
 */
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    last_page: number
  }
}

/**
 * Estrutura de erro da API
 */
export interface ApiError {
  message: string
  statusCode?: number
}
