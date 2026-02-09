/**
 * Hook para gerenciar paginação
 */
export const usePagination = (initialLimit: number = 10) => {
  const currentPage = ref(1)
  const limit = ref(initialLimit)

  const resetPage = () => {
    currentPage.value = 1
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
