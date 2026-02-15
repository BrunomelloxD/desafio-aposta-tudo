/**
 * Testes para a entidade Nivel (Domain Layer)
 * Testes unitários puros sem dependências externas
 */

import { describe, it, expect } from 'vitest'
import { Nivel } from '~/src/ui/app/modules/nivel/domain/Nivel'
import type { Nivel as NivelType } from '~/src/ui/app/modules/nivel/domain/Nivel.types'

describe('Nivel Entity', () => {
  describe('validateNome', () => {
    it('deve retornar true para nome válido', () => {
      expect(Nivel.validateNome('Júnior')).toBe(true)
      expect(Nivel.validateNome('Pleno')).toBe(true)
      expect(Nivel.validateNome('Sênior')).toBe(true)
    })

    it('deve retornar false para nome vazio', () => {
      expect(Nivel.validateNome('')).toBe(false)
    })

    it('deve retornar false para nome com apenas espaços', () => {
      expect(Nivel.validateNome('   ')).toBe(false)
    })
  })

  describe('fromData', () => {
    it('deve criar instância de Nivel a partir de dados', () => {
      const data: NivelType = {
        id: '1',
        nivel: 'Pleno',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }

      const nivel = Nivel.fromData(data)

      expect(nivel).toBeInstanceOf(Nivel)
      expect(nivel.id).toBe('1')
      expect(nivel.nivel).toBe('Pleno')
      expect(nivel.createdAt).toBe('2024-01-01')
      expect(nivel.updatedAt).toBe('2024-01-01')
    })
  })

  describe('toJSON', () => {
    it('deve converter instância para objeto plano', () => {
      const nivel = new Nivel('1', 'Pleno', '2024-01-01', '2024-01-01')
      const json = nivel.toJSON()

      expect(json).toEqual({
        id: '1',
        nivel: 'Pleno',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      })
    })
  })
})
