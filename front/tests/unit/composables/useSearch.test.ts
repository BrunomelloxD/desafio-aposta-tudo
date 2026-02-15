import { describe, it, expect, beforeEach } from 'vitest'
import { useSearch } from '~/src/shared/composables/useSearch'

describe('useSearch', () => {
  let search: ReturnType<typeof useSearch>

  beforeEach(() => {
    search = useSearch()
  })

  it('deve inicializar com valores vazios', () => {
    expect(search.searchQuery.value).toBe('')
    expect(search.activeSearch.value).toBe('')
  })

  it('deve atualizar activeSearch ao performar busca', () => {
    search.searchQuery.value = 'teste'
    search.performSearch()
    expect(search.activeSearch.value).toBe('teste')
  })

  it('deve limpar ambos os valores', () => {
    search.searchQuery.value = 'teste'
    search.activeSearch.value = 'teste'
    search.clearSearch()
    expect(search.searchQuery.value).toBe('')
    expect(search.activeSearch.value).toBe('')
  })
})
