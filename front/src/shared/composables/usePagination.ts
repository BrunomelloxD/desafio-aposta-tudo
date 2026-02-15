import { PAGINATION } from '~/src/shared/utils/constants'

export const usePagination = (initialLimit: number = PAGINATION.DEFAULT_LIMIT) => {
  const currentPage = ref<number>(PAGINATION.DEFAULT_PAGE)
  const limit = ref<number>(initialLimit)

  const resetPage = () => {
    currentPage.value = PAGINATION.DEFAULT_PAGE
  }

  const nextPage = (lastPage: number) => {
    if (currentPage.value < lastPage) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const goToPage = (page: number) => {
    currentPage.value = page
  }

  const getVisiblePages = (lastPage: number): number[] => {
    const maxVisible = 7
    const pages: number[] = []
    
    // Se o total de páginas for menor ou igual ao máximo visível, mostra todas
    if (lastPage <= maxVisible) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i)
      }
      return pages
    }
    
    // Sempre mostra a primeira página
    pages.push(1)
    
    // Se estiver nas primeiras páginas (1-4)
    if (currentPage.value <= 4) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i)
      }
      pages.push(lastPage)
      return pages
    }
    
    // Se estiver nas últimas páginas
    if (currentPage.value >= lastPage - 3) {
      for (let i = lastPage - 4; i <= lastPage; i++) {
        pages.push(i)
      }
      return pages
    }
    
    // Se estiver no meio, mostra: 1, current-1, current, current+1, lastPage
    pages.push(currentPage.value - 1)
    pages.push(currentPage.value)
    pages.push(currentPage.value + 1)
    pages.push(lastPage)
    
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
