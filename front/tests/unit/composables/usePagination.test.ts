import { describe, it, expect, beforeEach } from 'vitest'
import { usePagination } from '~/composables/usePagination'

describe('usePagination', () => {
  let pagination: ReturnType<typeof usePagination>

  beforeEach(() => {
    pagination = usePagination(10)
  })

  it('deve inicializar com valores padrão', () => {
    expect(pagination.currentPage.value).toBe(1)
    expect(pagination.limit.value).toBe(10)
  })

  it('deve resetar para página 1', () => {
    pagination.currentPage.value = 5
    pagination.resetPage()
    expect(pagination.currentPage.value).toBe(1)
  })

  it('deve avançar para próxima página', () => {
    pagination.nextPage(10)
    expect(pagination.currentPage.value).toBe(2)
  })

  it('não deve avançar além da última página', () => {
    pagination.currentPage.value = 10
    pagination.nextPage(10)
    expect(pagination.currentPage.value).toBe(10)
  })

  it('deve voltar para página anterior', () => {
    pagination.currentPage.value = 3
    pagination.prevPage()
    expect(pagination.currentPage.value).toBe(2)
  })

  it('não deve voltar antes da página 1', () => {
    pagination.prevPage()
    expect(pagination.currentPage.value).toBe(1)
  })

  it('deve ir para página específica', () => {
    pagination.goToPage(5)
    expect(pagination.currentPage.value).toBe(5)
  })

  describe('getVisiblePages', () => {
    it('deve mostrar todas as páginas quando total <= 7', () => {
      const pages = pagination.getVisiblePages(5)
      expect(pages).toEqual([1, 2, 3, 4, 5])
    })

    it('deve mostrar páginas corretas no início', () => {
      pagination.currentPage.value = 1
      const pages = pagination.getVisiblePages(10)
      expect(pages).toEqual([1, 2, 3, 4, 5, 10])
    })

    it('deve mostrar páginas corretas no meio', () => {
      pagination.currentPage.value = 5
      const pages = pagination.getVisiblePages(10)
      expect(pages).toEqual([1, 4, 5, 6, 10])
    })

    it('deve mostrar páginas corretas no final', () => {
      pagination.currentPage.value = 9
      const pages = pagination.getVisiblePages(10)
      expect(pages).toEqual([1, 6, 7, 8, 9, 10])
    })
  })
})
