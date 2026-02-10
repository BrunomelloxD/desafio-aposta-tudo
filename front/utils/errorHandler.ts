import { HTTP_STATUS, ERROR_MESSAGES } from './constants'

/**
 * Interface para erros da API (FetchError do Nuxt)
 */
export interface ApiError {
  message?: string
  error?: string
  statusCode?: number
  data?: {
    message?: string
    error?: string
    statusCode?: number
  }
  response?: {
    status: number
    data?: {
      message?: string
    }
  }
}

/**
 * Extrai mensagem de erro amigável de diferentes formatos de erro
 * Prioriza mensagens da API sobre mensagens genéricas
 * @param error - Erro capturado (pode ser de vários tipos)
 * @returns Mensagem de erro formatada para o usuário
 */
export const getErrorMessage = (error: unknown): string => {
  if (!error) return ERROR_MESSAGES.GENERIC_ERROR

  const err = error as ApiError

  // Prioridade 1: Mensagem da API no formato FetchError (err.data.message)
  if (err.data?.message) return err.data.message

  // Prioridade 2: Mensagem da API no formato response.data.message
  if (err.response?.data?.message) return err.response.data.message

  // Prioridade 3: Mensagem direta do erro
  if (err.message) return err.message

  // Prioridade 4: Erro de conflito (409) - mensagem genérica apenas se não houver mensagem específica
  if (err.statusCode === HTTP_STATUS.CONFLICT || err.response?.status === HTTP_STATUS.CONFLICT) {
    return ERROR_MESSAGES.DELETE_NIVEL_CONFLICT
  }

  // Prioridade 5: Mensagem genérica como fallback
  return ERROR_MESSAGES.GENERIC_ERROR
}