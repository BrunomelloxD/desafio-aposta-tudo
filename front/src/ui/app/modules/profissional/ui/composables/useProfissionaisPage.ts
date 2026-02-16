import type { Profissional } from '~/src/ui/app/modules/profissional/domain/Profissional.types'
import type { Nivel } from '~/src/ui/app/modules/nivel/domain/Nivel.types'
import type { Sexo } from '~/src/shared/utils/constants'
import { PAGINATION } from '~/src/shared/utils/constants'
import { getErrorMessage } from '~/src/shared/error/errorHandler'
import { isFutureDate, getTodayISO } from '~/src/shared/utils/formatters'
import { useProfissionalModule } from '~/src/ui/app/modules/profissional/ui/composables/useProfissionalModule'
import { useNivelModule } from '~/src/ui/app/modules/nivel/ui/composables/useNivelModule'
import { useNotification } from '~/src/shared/composables/useNotification'
import { usePagination } from '~/src/shared/composables/usePagination'

export interface ProfissionalFormData {
  nome: string
  nivel_id: string
  sexo: Sexo | ''
  data_nascimento: string
  hobby: string
}

const EMPTY_FORM: ProfissionalFormData = {
  nome: '',
  nivel_id: '',
  sexo: '',
  data_nascimento: '',
  hobby: '',
}

export const useProfissionaisPage = () => {
  const { fetchProfissionais, createProfissional, updateProfissional, deleteProfissional } = useProfissionalModule()
  const { fetchNiveis } = useNivelModule()
  const { success, error: notifyError } = useNotification()
  const { currentPage, limit, resetPage, nextPage, prevPage, goToPage, getVisiblePages } = usePagination()

  // Search & filter state
  const searchQuery = ref('')
  const activeSearch = ref('')
  const selectedGender = ref('')
  const activeGender = ref('')

  // Modal state
  const showModal = ref(false)
  const editingProfissional = ref<Profissional | null>(null)
  const formData = ref<ProfissionalFormData>({ ...EMPTY_FORM })
  const isSubmitting = ref(false)

  // Delete state
  const showDeleteDialog = ref(false)
  const profissionalToDelete = ref<Profissional | null>(null)
  const isDeleting = ref(false)

  // Niveis for dropdown
  const niveis = ref<Nivel[]>([])

  const maxDate = computed(() => getTodayISO())

  const performSearch = (refreshFn: () => void) => {
    activeSearch.value = searchQuery.value
    activeGender.value = selectedGender.value
    resetPage()
    refreshFn()
  }

  const clearSearch = (refreshFn: () => void) => {
    searchQuery.value = ''
    activeSearch.value = ''
    selectedGender.value = ''
    activeGender.value = ''
    resetPage()
    refreshFn()
  }

  const loadNiveis = async () => {
    try {
      const response = await fetchNiveis(1, 100, '')
      niveis.value = response.data
    } catch {
      notifyError('Erro ao carregar níveis')
    }
  }

  const openCreateModal = () => {
    editingProfissional.value = null
    formData.value = { ...EMPTY_FORM }
    showModal.value = true
  }

  const openEditModal = (profissional: Profissional) => {
    editingProfissional.value = profissional
    formData.value = {
      nome: profissional.nome,
      nivel_id: profissional.nivel_id || '',
      sexo: profissional.sexo,
      data_nascimento: profissional.data_nascimento?.split('T')[0] ?? '',
      hobby: profissional.hobby,
    }
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
    editingProfissional.value = null
    formData.value = { ...EMPTY_FORM }
  }

  const handleSubmit = async (refreshFn: () => void) => {
    if (!formData.value.sexo) {
      notifyError('Por favor, selecione o sexo')
      return
    }
    if (isFutureDate(formData.value.data_nascimento)) {
      notifyError('A data de nascimento deve ser anterior a hoje')
      return
    }

    isSubmitting.value = true
    try {
      const payload = {
        nome: formData.value.nome,
        nivel_id: formData.value.nivel_id,
        sexo: formData.value.sexo as Sexo,
        data_nascimento: formData.value.data_nascimento,
        hobby: formData.value.hobby,
      }

      if (editingProfissional.value) {
        await updateProfissional(editingProfissional.value.id, payload)
        success('Profissional atualizado com sucesso!')
      } else {
        await createProfissional(payload)
        success('Profissional cadastrado com sucesso!')
      }
      await refreshFn()
      closeModal()
    } catch (err: unknown) {
      notifyError(getErrorMessage(err))
    } finally {
      isSubmitting.value = false
    }
  }

  const confirmDelete = (profissional: Profissional) => {
    profissionalToDelete.value = profissional
    showDeleteDialog.value = true
  }

  const cancelDelete = () => {
    profissionalToDelete.value = null
    showDeleteDialog.value = false
  }

  const handleDelete = async (refreshFn: () => void) => {
    if (!profissionalToDelete.value) return

    isDeleting.value = true
    try {
      await deleteProfissional(profissionalToDelete.value.id)
      success('Profissional excluído com sucesso!')
      await refreshFn()
      showDeleteDialog.value = false
      profissionalToDelete.value = null
    } catch (err: unknown) {
      notifyError(getErrorMessage(err))
    } finally {
      isDeleting.value = false
    }
  }

  return {
    // Data fetching
    fetchProfissionais,
    loadNiveis,
    niveis,

    // Pagination
    currentPage,
    limit,
    nextPage,
    prevPage,
    goToPage,
    getVisiblePages,

    // Search & filters
    searchQuery,
    activeSearch,
    selectedGender,
    activeGender,
    performSearch,
    clearSearch,

    // Modal / form
    showModal,
    editingProfissional,
    formData,
    isSubmitting,
    maxDate,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,

    // Delete
    showDeleteDialog,
    profissionalToDelete,
    isDeleting,
    confirmDelete,
    cancelDelete,
    handleDelete,
  }
}
