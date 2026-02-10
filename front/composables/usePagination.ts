import { PAGINATION } from '~/utils/constants'

/**
 * Composable para gerenciar paginação
 * @param initialLimit - Limite inicial de itens por página (padrão: 10)
 */
export const usePagination = (initialLimit: number = PAGINATION.DEFAULT_LIMIT) => {
  const currentPage = ref(PAGINATION.DEFAULT_PAGE)
  const limit = ref(initialLimit)

  /**
   * Reseta a página atual para a primeira
   */
  const resetPage = () => {
    currentPage.value = PAGINATION.DEFAULT_PAGE
  }

  /**
   * Avança para a próxima página se disponível
   * @param lastPage - Número da última página
   */
  const nextPage = (lastPage: number) => {
    if (currentPage.value < lastPage) {
      currentPage.value++
    }
  }

  /**
   * Volta para a página anterior se disponível
   */
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  /**
   * Navega para uma página específica
   * @param page - Número da página desejada
   */
  const goToPage = (page: number) => {
    currentPage.value = page
  }

  /**
   * Calcula as páginas visíveis para o componente de paginação
   * @param lastPage - Número da última página
   * @returns Array de números de página a serem exibidos
   */
  const getVisiblePages = (lastPage: number): number[] => {
    const current = currentPage.value
    const pages: number[] = []

    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i)
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push(lastPage)
      } else if (current >= lastPage - 3) {
        pages.push(1)
        for (let i = lastPage - 4; i <= lastPage; i++) pages.push(i)
      } else {
        pages.push(1)
        for (let i = current - 1; i <= current + 1; i++) pages.push(i)
        pages.push(lastPage)
      }
    }

    return pages
  }

  return {
    currentPage,
    limit,
    resetPage,
    nextPage,
    prevPage,
    goToPage,
    getVisiblePages
  }
}
