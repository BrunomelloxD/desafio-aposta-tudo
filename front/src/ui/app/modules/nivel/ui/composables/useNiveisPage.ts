import type { Nivel } from '~/src/ui/app/modules/nivel/domain/Nivel.types'
import { PAGINATION } from '~/src/shared/utils/constants'
import { getErrorMessage } from '~/src/shared/error/errorHandler'
import { useNivelModule } from '~/src/ui/app/modules/nivel/ui/composables/useNivelModule'
import { useNotification } from '~/src/shared/composables/useNotification'
import { usePagination } from '~/src/shared/composables/usePagination'

export const useNiveisPage = () => {
  const { fetchNiveis, createNivel, updateNivel, deleteNivel } = useNivelModule()
  const { success, error: notifyError } = useNotification()
  const { currentPage, limit, resetPage, nextPage, prevPage, goToPage, getVisiblePages } = usePagination()

  // Search state
  const searchQuery = ref('')
  const activeSearch = ref('')

  // Modal state
  const showModal = ref(false)
  const editingNivel = ref<Nivel | null>(null)
  const formData = ref({ nome: '' })
  const isSubmitting = ref(false)

  // Delete state
  const showDeleteDialog = ref(false)
  const nivelToDelete = ref<Nivel | null>(null)
  const isDeleting = ref(false)

  const performSearch = (refreshFn: () => void) => {
    activeSearch.value = searchQuery.value
    resetPage()
    refreshFn()
  }

  const clearSearch = (refreshFn: () => void) => {
    searchQuery.value = ''
    activeSearch.value = ''
    resetPage()
    refreshFn()
  }

  const openCreateModal = () => {
    editingNivel.value = null
    formData.value = { nome: '' }
    showModal.value = true
  }

  const openEditModal = (nivel: Nivel) => {
    editingNivel.value = nivel
    formData.value = { nome: nivel.nivel }
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
    editingNivel.value = null
    formData.value = { nome: '' }
  }

  const handleSubmit = async (refreshFn: () => void) => {
    isSubmitting.value = true
    try {
      if (editingNivel.value) {
        await updateNivel(editingNivel.value.id, formData.value.nome)
        success('Nível atualizado com sucesso!')
      } else {
        await createNivel(formData.value.nome)
        success('Nível cadastrado com sucesso!')
      }
      await refreshFn()
      closeModal()
    } catch (err: unknown) {
      notifyError(getErrorMessage(err))
    } finally {
      isSubmitting.value = false
    }
  }

  const confirmDelete = (nivel: Nivel) => {
    nivelToDelete.value = nivel
    showDeleteDialog.value = true
  }

  const cancelDelete = () => {
    nivelToDelete.value = null
    showDeleteDialog.value = false
  }

  const handleDelete = async (refreshFn: () => void) => {
    if (!nivelToDelete.value) return

    isDeleting.value = true
    try {
      await deleteNivel(nivelToDelete.value.id)
      success('Nível excluído com sucesso!')
      await refreshFn()
      showDeleteDialog.value = false
      nivelToDelete.value = null
    } catch (err: unknown) {
      notifyError(getErrorMessage(err))
      showDeleteDialog.value = false
      nivelToDelete.value = null
    } finally {
      isDeleting.value = false
    }
  }

  return {
    fetchNiveis,
    currentPage,
    limit,
    nextPage,
    prevPage,
    goToPage,
    getVisiblePages,
    searchQuery,
    activeSearch,
    performSearch,
    clearSearch,
    showModal,
    editingNivel,
    formData,
    isSubmitting,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    showDeleteDialog,
    nivelToDelete,
    isDeleting,
    confirmDelete,
    cancelDelete,
    handleDelete,
  }
}
