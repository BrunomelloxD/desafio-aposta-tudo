<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white">Profissionais</h1>
        <p class="mt-2 text-sm text-gray-400">Gerencie os profissionais cadastrados</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="openCreateModal"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200"
        >
          Novo Profissional
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
          class="block w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-md shadow-sm text-white placeholder-gray-500 focus:ring-primary focus:border-primary transition-all duration-200"
          @keyup.enter="performSearch"
        />
      </div>
      <div class="w-18">
        <select
          v-model="limit"
          class="block w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-md shadow-sm text-white focus:ring-primary focus:border-primary transition-all duration-200"
        >
          <option v-for="option in PAGINATION.LIMIT_OPTIONS" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div>
        <button
          @click="performSearch"
          class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 font-medium"
        >
          Buscar
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-400">Carregando...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-900/30 border border-red-500/50 rounded-md p-4">
      <p class="text-red-300">Erro ao carregar profissionais: {{ error.message }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="data && data.data.length === 0 && !activeSearch" class="text-center py-12">
      <div class="bg-dark-light rounded-lg border border-dark-lighter p-8">
        <div class="text-6xl mb-4">👥</div>
        <h3 class="text-xl font-semibold text-white mb-2">Nenhum profissional cadastrado</h3>
        <p class="text-gray-400 mb-6">Não há dados cadastrados no momento, por favor, inicie um cadastro</p>
        <button
          @click="openCreateModal"
          class="inline-flex items-center px-6 py-3 bg-accent text-white rounded-md hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 font-medium"
        >
          Criar Primeiro Profissional
        </button>
      </div>
    </div>

    <!-- No Results State -->
    <div v-else-if="data && data.data.length === 0 && activeSearch" class="text-center py-12">
      <div class="bg-dark-light rounded-lg border border-dark-lighter p-8">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-white mb-2">Nenhum resultado encontrado</h3>
        <p class="text-gray-400 mb-6">Tente ajustar sua pesquisa ou limpe os filtros</p>
        <button
          @click="clearSearch"
          class="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 font-medium"
        >
          Limpar Pesquisa
        </button>
      </div>
    </div>

    <!-- Table -->
    <div v-else-if="data" class="bg-dark-light shadow-lg overflow-hidden rounded-lg border border-dark-lighter">
      <table class="min-w-full divide-y divide-dark-lighter">
        <thead class="bg-dark-lighter">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Nome
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Nível
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Sexo
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Data Nascimento
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Idade
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Hobby
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-dark-light divide-y divide-dark-lighter">
          <tr v-for="profissional in data.data" :key="profissional.id" class="hover:bg-dark-lighter transition-colors duration-150">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
              {{ profissional.nome }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {{ profissional.nivel || '-' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {{ profissional.sexo }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {{ formatDate(profissional.data_nascimento) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {{ profissional.idade }} anos
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {{ profissional.hobby }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="openEditModal(profissional)"
                class="text-primary hover:text-primary-light mr-4 transition-colors duration-150"
              >
                Editar
              </button>
              <button
                @click="confirmDelete(profissional)"
                class="text-accent hover:text-accent-light transition-colors duration-150"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="bg-dark-light px-4 py-3 flex items-center justify-between border-t border-dark-lighter sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-dark-lighter text-sm font-medium rounded-md text-gray-300 bg-dark-lighter hover:bg-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Anterior
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage >= data.meta.last_page"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-dark-lighter text-sm font-medium rounded-md text-gray-300 bg-dark-lighter hover:bg-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Próxima
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-400">
              Mostrando
              <span class="font-medium text-white">{{ (data.meta.page - 1) * limit + 1 }}</span>
              até
              <span class="font-medium text-white">{{ Math.min(data.meta.page * limit, data.meta.total) }}</span>
              de
              <span class="font-medium text-white">{{ data.meta.total }}</span>
              resultados
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-dark-lighter bg-dark-lighter text-sm font-medium text-gray-300 hover:bg-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span class="sr-only">Anterior</span>
                ←
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-all duration-200',
                  page === currentPage
                    ? 'z-10 bg-primary border-primary text-white'
                    : 'bg-dark-lighter border-dark-lighter text-gray-300 hover:bg-dark'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage >= data.meta.last_page"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-dark-lighter bg-dark-lighter text-sm font-medium text-gray-300 hover:bg-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
    <Modal v-model="showModal" size="lg">
      <form @submit.prevent="handleSubmit">
        <div class="bg-dark-light px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-white mb-4">
            {{ editingProfissional ? 'Editar Profissional' : 'Novo Profissional' }}
          </h3>
          
          <div class="space-y-4">
            <div>
              <label for="nome" class="block text-sm font-medium text-gray-300 mb-2">
                Nome *
              </label>
              <input
                v-model="formData.nome"
                type="text"
                id="nome"
                required
                class="block w-full px-3 py-2 bg-dark border border-dark-lighter rounded-md shadow-sm text-white placeholder-gray-500 focus:ring-primary focus:border-primary transition-all duration-200"
                placeholder="Digite o nome"
              />
            </div>

            <div>
              <label for="nivel_id" class="block text-sm font-medium text-gray-300 mb-2">
                Nível *
              </label>
              <select
                v-model="formData.nivel_id"
                id="nivel_id"
                required
                class="block w-full px-3 py-2 bg-dark border border-dark-lighter rounded-md shadow-sm text-white focus:ring-primary focus:border-primary transition-all duration-200"
              >
                <option value="">Selecione um nível</option>
                <option v-for="nivel in niveis" :key="nivel.id" :value="nivel.id">
                  {{ nivel.nivel }}
                </option>
              </select>
            </div>

            <div>
              <label for="sexo" class="block text-sm font-medium text-gray-300 mb-2">
                Sexo *
              </label>
              <select
                v-model="formData.sexo"
                id="sexo"
                required
                class="block w-full px-3 py-2 bg-dark border border-dark-lighter rounded-md shadow-sm text-white focus:ring-primary focus:border-primary transition-all duration-200"
              >
                <option value="">Selecione</option>
                <option v-for="option in SEXO_OPTIONS" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div>
              <label for="data_nascimento" class="block text-sm font-medium text-gray-300 mb-2">
                Data de Nascimento *
              </label>
              <input
                v-model="formData.data_nascimento"
                type="date"
                id="data_nascimento"
                required
                :max="maxDate"
                class="block w-full px-3 py-2 bg-dark border border-dark-lighter rounded-md shadow-sm text-white focus:ring-primary focus:border-primary transition-all duration-200 [color-scheme:dark]"
              />
              <p class="mt-1 text-xs text-gray-500">A data deve ser anterior a hoje</p>
            </div>

            <div>
              <label for="hobby" class="block text-sm font-medium text-gray-300 mb-2">
                Hobby *
              </label>
              <input
                v-model="formData.hobby"
                type="text"
                id="hobby"
                required
                class="block w-full px-3 py-2 bg-dark border border-dark-lighter rounded-md shadow-sm text-white placeholder-gray-500 focus:ring-primary focus:border-primary transition-all duration-200"
                placeholder="Digite o hobby"
              />
            </div>
          </div>
        </div>
        <div class="bg-dark-lighter px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-all duration-200"
          >
            {{ isSubmitting ? 'Salvando...' : 'Salvar' }}
          </button>
          <button
            type="button"
            @click="closeModal"
            :disabled="isSubmitting"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-dark-lighter shadow-sm px-4 py-2 bg-dark text-base font-medium text-gray-300 hover:bg-dark-lighter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-all duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>

    <!-- Confirm Delete Dialog -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Excluir Profissional"
      :message="`Tem certeza que deseja excluir ${profissionalToDelete?.nome}? Esta ação não pode ser desfeita.`"
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
import type { Profissional } from '~/src/ui/app/modules/profissional/domain/Profissional.types'
import type { Nivel } from '~/src/ui/app/modules/nivel/domain/Nivel.types'
import type { Sexo } from '~/src/shared/utils/constants'
import { formatDate, isFutureDate, getTodayISO } from '~/src/shared/utils/formatters'
import { PAGINATION, SEXO_OPTIONS } from '~/src/shared/utils/constants'
import { getErrorMessage } from '~/src/shared/error/errorHandler'
import { useProfissionalModule } from '~/src/ui/app/modules/profissional/ui/composables/useProfissionalModule'
import { useNivelModule } from '~/src/ui/app/modules/nivel/ui/composables/useNivelModule'
import { useNotification } from '~/src/shared/composables/useNotification'

const { fetchProfissionais, createProfissional, updateProfissional, deleteProfissional } = useProfissionalModule()
const { fetchNiveis } = useNivelModule()
const { success, error: notifyError } = useNotification()

const currentPage = ref<number>(PAGINATION.DEFAULT_PAGE)
const limit = ref<number>(PAGINATION.DEFAULT_LIMIT)
const searchQuery = ref('')
const activeSearch = ref('')

const { data, pending, error, refresh } = await useAsyncData(
  'profissionais',
  () => fetchProfissionais(currentPage.value, limit.value, activeSearch.value),
  {
    watch: [currentPage, limit]
  }
)

const performSearch = () => {
  activeSearch.value = searchQuery.value
  currentPage.value = 1
  refresh()
}

const clearSearch = () => {
  searchQuery.value = ''
  activeSearch.value = ''
  currentPage.value = 1
  refresh()
}

const niveis = ref<Nivel[]>([])
const loadNiveis = async () => {
  try {
    const response = await fetchNiveis(1, 100, '')
    niveis.value = response.data
  } catch (err) {
    notifyError('Erro ao carregar níveis')
    console.error('Erro ao carregar níveis:', err)
  }
}
await loadNiveis()

const showModal = ref(false)
const editingProfissional = ref<Profissional | null>(null)
const formData = ref({
  nome: '',
  nivel_id: '',
  sexo: '' as Sexo | '',
  data_nascimento: '',
  hobby: ''
})
const isSubmitting = ref(false)

const showDeleteDialog = ref(false)
const profissionalToDelete = ref<Profissional | null>(null)
const isDeleting = ref(false)

const maxDate = computed(() => getTodayISO())

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
  editingProfissional.value = null
  formData.value = {
    nome: '',
    nivel_id: '',
    sexo: '',
    data_nascimento: '',
    hobby: ''
  }
  showModal.value = true
}

const openEditModal = (profissional: Profissional) => {
  editingProfissional.value = profissional
  formData.value = {
    nome: profissional.nome,
    nivel_id: profissional.nivel_id || '',
    sexo: profissional.sexo,
    data_nascimento: profissional.data_nascimento?.split('T')[0] ?? '',
    hobby: profissional.hobby
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingProfissional.value = null
  formData.value = {
    nome: '',
    nivel_id: '',
    sexo: '',
    data_nascimento: '',
    hobby: ''
  }
}

const handleSubmit = async () => {
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
    const data = {
      nome: formData.value.nome,
      nivel_id: formData.value.nivel_id,
      sexo: formData.value.sexo as Sexo,
      data_nascimento: formData.value.data_nascimento,
      hobby: formData.value.hobby
    }

    if (editingProfissional.value) {
      await updateProfissional(editingProfissional.value.id, data)
      success('Profissional atualizado com sucesso!')
    } else {
      await createProfissional(data)
      success('Profissional cadastrado com sucesso!')
    }
    await refresh()
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

const handleDelete = async () => {
  if (!profissionalToDelete.value) return
  
  isDeleting.value = true
  try {
    await deleteProfissional(profissionalToDelete.value.id)
    success('Profissional excluído com sucesso!')
    await refresh()
    showDeleteDialog.value = false
    profissionalToDelete.value = null
  } catch (err: unknown) {
    notifyError(getErrorMessage(err))
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
