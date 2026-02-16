<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <PageHeader title="Profissionais" subtitle="Gerencie os profissionais cadastrados no sistema">
      <template #actions>
        <PrimaryButton label="Novo Profissional" :icon="PlusIcon" @click="openCreateModal" />
      </template>
    </PageHeader>

    <StatsGrid :cards="statsCards" />

    <SearchBar
      v-model="searchQuery"
      :limit="limit"
      :limit-options="PAGINATION.LIMIT_OPTIONS as unknown as number[]"
      @update:limit="limit = $event"
      @search="performSearch(refresh)"
    >
      <template #filters>
        <div class="w-44">
          <select
            v-model="selectedGender"
            class="block w-full pl-3 pr-8 py-2.5 bg-dark-light border border-surface-border rounded-lg text-text focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%239ca3af%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
            @change="performSearch(refresh)"
          >
            <option value="">Todos os sexos</option>
            <option v-for="option in SEXO_OPTIONS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </template>
    </SearchBar>

    <div v-if="pending" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      <p class="mt-4 text-text-muted">Carregando...</p>
    </div>

    <div v-else-if="error" class="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
      <p class="text-red-400">Erro ao carregar profissionais: {{ error.message }}</p>
    </div>

    <EmptyState
      v-else-if="data && data.data.length === 0 && !activeSearch && !activeGender"
      emoji="👥"
      title="Nenhum profissional cadastrado"
      message="Não há dados cadastrados no momento, por favor, inicie um cadastro"
    >
      <template #action>
        <PrimaryButton label="Criar Primeiro Profissional" :icon="PlusIcon" @click="openCreateModal" />
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="data && data.data.length === 0 && (activeSearch || activeGender)"
      emoji="🔍"
      title="Nenhum resultado encontrado"
      message="Tente ajustar sua pesquisa ou limpe os filtros"
    >
      <template #action>
        <PrimaryButton label="Limpar Pesquisa" @click="clearSearch(refresh)" />
      </template>
    </EmptyState>

    <template v-else-if="data">
      <ProfissionalTable
        :profissionais="data.data"
        :all-niveis="nivelNames"
        @edit="openEditModal"
        @delete="confirmDelete"
      >
        <template #pagination>
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
        </template>
      </ProfissionalTable>
    </template>

    <ProfissionalForm
      v-model="showModal"
      :form-data="formData"
      :niveis="niveis"
      :is-editing="!!editingProfissional"
      :loading="isSubmitting"
      :max-date="maxDate"
      @submit="handleSubmit(refresh)"
      @cancel="closeModal"
    />

    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Excluir Profissional"
      :message="`Tem certeza que deseja excluir ${profissionalToDelete?.nome}? Esta ação não pode ser desfeita.`"
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
import { PlusIcon, UsersIcon } from '@heroicons/vue/24/outline'
import { PAGINATION, SEXO_OPTIONS, getNivelCardColor } from '~/src/shared/utils/constants'
import { useProfissionaisPage } from '~/src/ui/app/modules/profissional/ui/composables/useProfissionaisPage'
import type { StatCardData } from '~/src/ui/components/common/StatsGrid.vue'

const {
  fetchProfissionais,
  loadNiveis,
  niveis,
  currentPage,
  limit,
  nextPage,
  prevPage,
  goToPage,
  getVisiblePages,
  searchQuery,
  activeSearch,
  selectedGender,
  activeGender,
  performSearch,
  clearSearch,
  showModal,
  editingProfissional,
  formData,
  isSubmitting,
  maxDate,
  openCreateModal,
  openEditModal,
  closeModal,
  handleSubmit,
  showDeleteDialog,
  profissionalToDelete,
  isDeleting,
  confirmDelete,
  cancelDelete,
  handleDelete,
} = useProfissionaisPage()

const { data, pending, error, refresh } = await useAsyncData(
  'profissionais',
  () => fetchProfissionais(currentPage.value, limit.value, activeSearch.value, activeGender.value),
  { watch: [currentPage, limit] }
)

await loadNiveis()

const visiblePages = computed(() => {
  if (!data.value) return []
  return getVisiblePages(data.value.meta.last_page)
})

const nivelNames = computed(() => niveis.value.map(n => n.nivel))

const statsCards = computed<StatCardData[]>(() => {
  const total = data.value?.meta.total ?? 0
  const professionals = data.value?.data ?? []

  const totalCard: StatCardData = {
    label: 'Total de Profissionais',
    value: total,
    icon: UsersIcon,
    iconColor: 'bg-primary/20 text-primary',
  }

  // Count by nivel from the visible professionals
  const nivelCountMap = new Map<string, number>()
  for (const p of professionals) {
    if (p.nivel) {
      nivelCountMap.set(p.nivel, (nivelCountMap.get(p.nivel) ?? 0) + 1)
    }
  }

  // Build a card for each registered nivel
  const allNames = nivelNames.value
  const nivelCards: StatCardData[] = allNames.map((nivel) => {
    const count = nivelCountMap.get(nivel) ?? 0
    const subtitle = total > 0 ? `${Math.round((count / total) * 100)}% do total` : '0%'
    return {
      label: `Nível ${nivel}`,
      value: count,
      subtitle,
      icon: UsersIcon,
      iconColor: getNivelCardColor(nivel, allNames),
    }
  })

  return [totalCard, ...nivelCards]
})
</script>
