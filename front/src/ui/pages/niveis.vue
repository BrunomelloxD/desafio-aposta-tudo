<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <PageHeader title="Níveis" subtitle="Gerencie os níveis profissionais do sistema">
      <template #actions>
        <PrimaryButton label="Novo Nível" :icon="PlusIcon" @click="openCreateModal" />
      </template>
    </PageHeader>

    <SearchBar
      v-model="searchQuery"
      :limit="limit"
      :limit-options="PAGINATION.LIMIT_OPTIONS as unknown as number[]"
      @update:limit="limit = $event"
      @search="performSearch(refresh)"
    />

    <div v-if="pending" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      <p class="mt-4 text-text-muted">Carregando...</p>
    </div>

    <div v-else-if="error" class="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
      <p class="text-red-400">Erro ao carregar níveis: {{ error.message }}</p>
    </div>

    <EmptyState
      v-else-if="data && data.data.length === 0 && !activeSearch"
      emoji="📊"
      title="Nenhum nível cadastrado"
      message="Não há dados cadastrados no momento, por favor, inicie um cadastro"
    >
      <template #action>
        <PrimaryButton label="Criar Primeiro Nível" :icon="PlusIcon" @click="openCreateModal" />
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="data && data.data.length === 0 && activeSearch"
      emoji="🔍"
      title="Nenhum resultado encontrado"
      message="Tente ajustar sua pesquisa ou limpe os filtros"
    >
      <template #action>
        <PrimaryButton label="Limpar Pesquisa" @click="clearSearch(refresh)" />
      </template>
    </EmptyState>

    <div v-else-if="data" class="bg-dark-light shadow-lg overflow-hidden rounded-xl border border-surface-border">
      <table class="min-w-full divide-y divide-surface-border">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
              Nome
            </th>
            <th class="px-6 py-3 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-border">
          <tr
            v-for="nivel in data.data"
            :key="nivel.id"
            class="hover:bg-dark-lighter/50 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
              {{ nivel.nivel }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="openEditModal(nivel)"
                  class="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-150"
                  aria-label="Editar"
                >
                  <PencilIcon class="h-4 w-4" />
                </button>
                <button
                  @click="confirmDelete(nivel)"
                  class="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all duration-150"
                  aria-label="Excluir"
                >
                  <TrashIcon class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <DataPagination
        :current-page="currentPage"
        :last-page="data.meta.last_page"
        :total="data.meta.total"
        :limit="limit"
        :visible-pages="visiblePages"
        @prev="prevPage(data.meta.last_page)"
        @next="nextPage(data.meta.last_page)"
        @go-to-page="goToPage"
      />
    </div>

    <NivelForm
      v-model="showModal"
      :form-data="formData"
      :is-editing="!!editingNivel"
      :loading="isSubmitting"
      @submit="handleSubmit(refresh)"
      @cancel="closeModal"
    />

    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Excluir Nível"
      :message="`Tem certeza que deseja excluir o nível '${nivelToDelete?.nivel}'? Esta ação não pode ser desfeita.`"
      confirm-text="Excluir"
      cancel-text="Cancelar"
      variant="danger"
      :loading="isDeleting"
      loading-text="Excluindo..."
      @confirm="handleDelete(refresh)"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { PAGINATION } from '~/src/shared/utils/constants'
import { useNiveisPage } from '~/src/ui/app/modules/nivel/ui/composables/useNiveisPage'

const {
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
} = useNiveisPage()

const { data, pending, error, refresh } = await useAsyncData(
  'niveis',
  () => fetchNiveis(currentPage.value, limit.value, activeSearch.value),
  { watch: [currentPage, limit] }
)

const visiblePages = computed(() => {
  if (!data.value) return []
  return getVisiblePages(data.value.meta.last_page)
})
</script>
