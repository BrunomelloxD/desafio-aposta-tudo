/**
 * Testes para NivelRepository
 * Demonstra testes de integração com mock do HttpService
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NivelRepository } from '~/src/ui/app/modules/nivel/infrastructure/NivelRepository'
import { HttpService } from '~/src/shared/http/HttpService'
import type { Nivel } from '~/src/ui/app/modules/nivel/domain/Nivel.types'
import type { PaginatedResponse } from '~/src/shared/http/types'

// Mock do HttpService
vi.mock('~/src/shared/http/HttpService')

describe('NivelRepository', () => {
  let repository: NivelRepository
  let mockHttpService: HttpService

  beforeEach(() => {
    mockHttpService = new HttpService('http://test.com')
    repository = new NivelRepository('http://test.com')
    
    // Substituir o httpService interno com o mock
    ;(repository as any).httpService = mockHttpService
  })

  describe('findAll', () => {
    it('deve buscar níveis com paginação', async () => {
      const mockResponse: PaginatedResponse<Nivel> = {
        data: [
          { id: '1', nivel: 'Júnior' },
          { id: '2', nivel: 'Pleno' }
        ],
        meta: {
          total: 2,
          page: 1,
          last_page: 1
        }
      }

      vi.spyOn(mockHttpService, 'get').mockResolvedValue(mockResponse)

      const result = await repository.findAll(1, 10)

      expect(mockHttpService.get).toHaveBeenCalledWith('/api/niveis', {
        page: '1',
        limit: '10'
      })
      expect(result).toEqual(mockResponse)
    })

    it('deve incluir parâmetro de busca quando fornecido', async () => {
      const mockResponse: PaginatedResponse<Nivel> = {
        data: [],
        meta: { total: 0, page: 1, last_page: 1 }
      }

      vi.spyOn(mockHttpService, 'get').mockResolvedValue(mockResponse)

      await repository.findAll(1, 10, 'Júnior')

      expect(mockHttpService.get).toHaveBeenCalledWith('/api/niveis', {
        page: '1',
        limit: '10',
        search: 'Júnior'
      })
    })
  })

  describe('create', () => {
    it('deve criar um novo nível', async () => {
      const mockNivel: Nivel = { id: '1', nivel: 'Pleno' }

      vi.spyOn(mockHttpService, 'post').mockResolvedValue(mockNivel)

      const result = await repository.create('Pleno')

      expect(mockHttpService.post).toHaveBeenCalledWith('/api/niveis', { nome: 'Pleno' })
      expect(result).toEqual(mockNivel)
    })
  })

  describe('update', () => {
    it('deve atualizar um nível existente', async () => {
      const mockNivel: Nivel = { id: '1', nivel: 'Sênior' }

      vi.spyOn(mockHttpService, 'put').mockResolvedValue(mockNivel)

      const result = await repository.update('1', 'Sênior')

      expect(mockHttpService.put).toHaveBeenCalledWith('/api/niveis/1', { nome: 'Sênior' })
      expect(result).toEqual(mockNivel)
    })
  })

  describe('delete', () => {
    it('deve deletar um nível', async () => {
      vi.spyOn(mockHttpService, 'delete').mockResolvedValue(undefined)

      await repository.delete('1')

      expect(mockHttpService.delete).toHaveBeenCalledWith('/api/niveis/1')
    })
  })
})
