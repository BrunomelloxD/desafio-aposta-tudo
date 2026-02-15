export const useSearch = () => {
  const searchQuery = ref('')
  const activeSearch = ref('')

  const performSearch = () => {
    activeSearch.value = searchQuery.value
  }

  const clearSearch = () => {
    searchQuery.value = ''
    activeSearch.value = ''
  }

  return {
    searchQuery,
    activeSearch,
    performSearch,
    clearSearch
  }
}
