/**
 * Testes para CreateNivelUseCase
 * Demonstra como testar Use Cases com mock do Repository
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CreateNivelUseCase } from '~/src/ui/app/modules/nivel/usecase/CreateNivel'
import type { INivelRepository } from '~/src/ui/app/modules/nivel/infrastructure/NivelRepository'
import type { Nivel } from '~/src/ui/app/modules/nivel/domain/Nivel.types'

describe('CreateNivelUseCase', () => {
  let mockRepository: INivelRepository
  let useCase: CreateNivelUseCase

  beforeEach(() => {
    // Criar mock do repository
    mockRepository = {
      create: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }
    
    useCase = new CreateNivelUseCase(mockRepository)
  })

  it('deve criar um nível com nome válido', async () => {
    const mockNivel: Nivel = {
      id: '1',
      nivel: 'Pleno'
    }

    vi.mocked(mockRepository.create).mockResolvedValue(mockNivel)

    const result = await useCase.execute('Pleno')

    expect(mockRepository.create).toHaveBeenCalledWith('Pleno')
    expect(result).toEqual(mockNivel)
  })

  it('deve lançar erro para nome vazio', async () => {
    await expect(useCase.execute('')).rejects.toThrow('Nome do nível é obrigatório')
    
    expect(mockRepository.create).not.toHaveBeenCalled()
  })

  it('deve lançar erro para nome com apenas espaços', async () => {
    await expect(useCase.execute('   ')).rejects.toThrow('Nome do nível é obrigatório')
    
    expect(mockRepository.create).not.toHaveBeenCalled()
  })

  it('deve propagar erro do repository', async () => {
    vi.mocked(mockRepository.create).mockRejectedValue(new Error('Erro na API'))

    await expect(useCase.execute('Pleno')).rejects.toThrow('Erro na API')
  })
})
