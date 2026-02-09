import { HTTP_STATUS, ERROR_MESSAGES } from './constants'

export interface ApiError {
  message: string
  error?: string
  statusCode?: number
  response?: {
    status: number
    data?: {
      message?: string
    }
  }
}

/**
 * Extrai mensagem de erro amigável de diferentes formatos de erro
 */
export const getErrorMessage = (error: unknown): string => {
  if (!error) return ERROR_MESSAGES.GENERIC_ERROR

  const err = error as ApiError

  // Erro de conflito ao deletar nível
  if (err.statusCode === HTTP_STATUS.CONFLICT || err.response?.status === HTTP_STATUS.CONFLICT) {
    return ERROR_MESSAGES.DELETE_NIVEL_CONFLICT
  }

  // Tentar extrair mensagem do erro
  if (err.message) return err.message
  if (err.response?.data?.message) return err.response.data.message

  return ERROR_MESSAGES.GENERIC_ERROR
}

/**
 * Verifica se é erro de conflito (409)
 */
export const isConflictError = (error: unknown): boolean => {
  const err = error as ApiError
  return err.statusCode === HTTP_STATUS.CONFLICT || err.response?.status === HTTP_STATUS.CONFLICT
}

/**
 * Verifica se é erro de não encontrado (404)
 */
export const isNotFoundError = (error: unknown): boolean => {
  const err = error as ApiError
  return err.statusCode === HTTP_STATUS.NOT_FOUND || err.response?.status === HTTP_STATUS.NOT_FOUND
}
