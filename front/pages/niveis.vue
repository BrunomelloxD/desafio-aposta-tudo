<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Níveis</h1>
        <p class="mt-2 text-sm text-gray-700">Gerencie os níveis profissionais</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="openCreateModal"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Novo Nível
        </button>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="mb-6 flex gap-4">
      <div class="flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por nome..."
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          @keyup.enter="performSearch"
        />
      </div>
      <div class="w-18">
        <select
          v-model="limit"
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>
      <div>
        <button
          @click="performSearch"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Buscar
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-600">Carregando...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-800">Erro ao carregar níveis: {{ error.message }}</p>
    </div>

    <!-- Table -->
    <div v-else-if="data" class="bg-white shadow overflow-hidden sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="nivel in data.data" :key="nivel.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ nivel.nivel }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="openEditModal(nivel)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                Editar
              </button>
              <button
                @click="confirmDelete(nivel)"
                class="text-red-600 hover:text-red-900"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage >= data.meta.last_page"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Mostrando
              <span class="font-medium">{{ (data.meta.page - 1) * limit + 1 }}</span>
              até
              <span class="font-medium">{{ Math.min(data.meta.page * limit, data.meta.total) }}</span>
              de
              <span class="font-medium">{{ data.meta.total }}</span>
              resultados
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Anterior</span>
                ←
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage >= data.meta.last_page"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Próxima</span>
                →
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Modal -->
    <UiModal v-model="showModal" size="md">
      <form @submit.prevent="handleSubmit">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
            {{ editingNivel ? 'Editar Nível' : 'Novo Nível' }}
          </h3>
          <div>
            <label for="nome" class="block text-sm font-medium text-gray-700 mb-2">
              Nome do Nível *
            </label>
            <input
              v-model="formData.nome"
              type="text"
              id="nome"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o nome do nível"
            />
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
          >
            {{ isSubmitting ? 'Salvando...' : 'Salvar' }}
          </button>
          <button
            type="button"
            @click="closeModal"
            :disabled="isSubmitting"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </UiModal>

    <!-- Confirm Delete Dialog -->
    <UiConfirmDialog
      v-model="showDeleteDialog"
      title="Excluir Nível"
      :message="`Tem certeza que deseja excluir o nível '${nivelToDelete?.nivel}'? Esta ação não pode ser desfeita.`"
      confirm-text="Excluir"
      cancel-text="Cancelar"
      variant="danger"
      :loading="isDeleting"
      loading-text="Excluindo..."
      @confirm="handleDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { Nivel } from '~/types'
import { formatDate } from '~/utils/formatters'

const { fetchNiveis, createNivel, updateNivel, deleteNivel } = useNiveis()
const { success, error: notifyError } = useNotification()

const currentPage = ref(1)
const limit = ref(10)
const searchQuery = ref('')
const activeSearch = ref('')

const { data, pending, error, refresh } = await useAsyncData(
  'niveis',
  () => fetchNiveis(currentPage.value, limit.value, activeSearch.value),
  {
    watch: [currentPage, limit]
  }
)

const performSearch = () => {
  activeSearch.value = searchQuery.value
  currentPage.value = 1
  refresh()
}

const showModal = ref(false)
const editingNivel = ref<Nivel | null>(null)
const formData = ref({ nome: '' })
const isSubmitting = ref(false)

const showDeleteDialog = ref(false)
const nivelToDelete = ref<Nivel | null>(null)
const isDeleting = ref(false)

const visiblePages = computed(() => {
  if (!data.value) return []
  const total = data.value.meta.last_page
  const current = currentPage.value
  const pages: number[] = []
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push(total)
    }
  }
  
  return pages
})

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

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    if (editingNivel.value) {
      await updateNivel(editingNivel.value.id, formData.value.nome)
      success('Nível atualizado com sucesso!')
    } else {
      await createNivel(formData.value.nome)
      success('Nível cadastrado com sucesso!')
    }
    await refresh()
    closeModal()
  } catch (err: any) {
    notifyError(err.message || 'Erro ao salvar nível')
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

const handleDelete = async () => {
  if (!nivelToDelete.value) return
  
  isDeleting.value = true
  try {
    await deleteNivel(nivelToDelete.value.id)
    success('Nível excluído com sucesso!')
    await refresh()
    showDeleteDialog.value = false
    nivelToDelete.value = null
  } catch (err: any) {
    notifyError(err.message || 'Erro ao excluir nível')
    showDeleteDialog.value = false
    nivelToDelete.value = null
  } finally {
    isDeleting.value = false
  }
}

const nextPage = () => {
  if (data.value && currentPage.value < data.value.meta.last_page) {
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
</script>
