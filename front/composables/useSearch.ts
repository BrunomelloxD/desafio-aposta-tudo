/**
 * Composable para gerenciar busca com estado local
 * Mantém controle de busca ativa e query de busca
 */
export const useSearch = () => {
  const searchQuery = ref('')
  const activeSearch = ref('')

  /**
   * Executa a busca com a query atual
   */
  const performSearch = () => {
    activeSearch.value = searchQuery.value
  }

  /**
   * Limpa a busca atual e reseta os valores
   */
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
