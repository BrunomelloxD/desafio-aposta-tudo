import { describe, it, expect } from 'vitest'
import { formatDate, formatDateToISO, getTodayISO, isFutureDate } from "~/src/shared/utils/formatters";

describe('formatters', () => {
  describe('formatDate', () => {
    it('deve formatar data ISO para formato brasileiro sem problema de timezone', () => {
      expect(formatDate('2024-01-15T00:00:00.000Z')).toBe('15/01/2024')
      expect(formatDate('1998-10-11T00:00:00.000Z')).toBe('11/10/1998')
      expect(formatDate('2024-01-15')).toBe('15/01/2024')
    })

    it('deve retornar "-" para string vazia', () => {
      expect(formatDate('')).toBe('-')
    })

    it('deve retornar "-" para data inválida', () => {
      expect(formatDate('invalid-date')).toBe('-')
    })
  })

  describe('formatDateToISO', () => {
    it('deve formatar Date para ISO', () => {
      const date = new Date('2024-01-15')
      expect(formatDateToISO(date)).toMatch(/2024-01-1[45]/)
    })

    it('deve formatar string de data para ISO', () => {
      expect(formatDateToISO('2024-01-15')).toMatch(/2024-01-1[45]/)
    })
  })

  describe('getTodayISO', () => {
    it('deve retornar data de hoje no formato ISO', () => {
      const result = getTodayISO()
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  describe('isFutureDate', () => {
    it('deve retornar false para data passada', () => {
      expect(isFutureDate('2020-01-01')).toBe(false)
    })

    it('deve retornar true para data futura', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      expect(isFutureDate(futureDate.toISOString())).toBe(true)
    })
  })
})
