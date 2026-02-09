import { describe, it, expect } from 'vitest'
import { getErrorMessage, isConflictError, isNotFoundError } from '~/utils/errorHandler'
import { ERROR_MESSAGES, HTTP_STATUS } from '~/utils/constants'

describe('errorHandler', () => {
  describe('getErrorMessage', () => {
    it('deve retornar mensagem de conflito para erro 409', () => {
      const error = { statusCode: 409 }
      expect(getErrorMessage(error)).toBe(ERROR_MESSAGES.DELETE_NIVEL_CONFLICT)
    })

    it('deve extrair mensagem do campo message', () => {
      const error = { message: 'Erro customizado' }
      expect(getErrorMessage(error)).toBe('Erro customizado')
    })

    it('deve extrair mensagem do response.data.message', () => {
      const error = {
        response: {
          status: 400,
          data: { message: 'Erro na resposta' }
        }
      }
      expect(getErrorMessage(error)).toBe('Erro na resposta')
    })

    it('deve retornar mensagem genérica para erro desconhecido', () => {
      expect(getErrorMessage(null)).toBe(ERROR_MESSAGES.GENERIC_ERROR)
      expect(getErrorMessage({})).toBe(ERROR_MESSAGES.GENERIC_ERROR)
    })
  })

  describe('isConflictError', () => {
    it('deve identificar erro 409 pelo statusCode', () => {
      expect(isConflictError({ statusCode: HTTP_STATUS.CONFLICT })).toBe(true)
    })

    it('deve identificar erro 409 pelo response.status', () => {
      expect(isConflictError({ response: { status: HTTP_STATUS.CONFLICT } })).toBe(true)
    })

    it('deve retornar false para outros erros', () => {
      expect(isConflictError({ statusCode: 404 })).toBe(false)
    })
  })

  describe('isNotFoundError', () => {
    it('deve identificar erro 404', () => {
      expect(isNotFoundError({ statusCode: HTTP_STATUS.NOT_FOUND })).toBe(true)
    })

    it('deve retornar false para outros erros', () => {
      expect(isNotFoundError({ statusCode: 409 })).toBe(false)
    })
  })
})
