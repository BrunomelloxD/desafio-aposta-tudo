<template>
  <div class="bg-dark-light px-4 py-3 flex items-center justify-between border-t border-surface-border sm:px-6">
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        @click="$emit('prev')"
        :disabled="currentPage === 1"
        class="relative inline-flex items-center px-4 py-2 border border-surface-border text-sm font-medium rounded-md text-text-muted bg-dark-lighter hover:bg-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        ‹
      </button>
      <button
        @click="$emit('next')"
        :disabled="currentPage >= lastPage"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-surface-border text-sm font-medium rounded-md text-text-muted bg-dark-lighter hover:bg-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        ›
      </button>
    </div>

    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <p class="text-sm text-text-muted">
        Mostrando
        <span class="font-medium text-primary">{{ from }}</span>
        a
        <span class="font-medium text-primary">{{ to }}</span>
        de
        <span class="font-medium text-primary">{{ total }}</span>
        resultados
      </p>
      <nav class="relative z-0 inline-flex rounded-lg -space-x-px" aria-label="Paginação">
        <button
          @click="$emit('prev')"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-surface-border bg-dark-lighter text-sm text-text-muted hover:bg-surface-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="$emit('goToPage', page)"
          :class="[
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-all duration-200',
            page === currentPage
              ? 'z-10 bg-primary border-primary text-white rounded-lg'
              : 'bg-dark-lighter border-surface-border text-text-muted hover:bg-surface-light'
          ]"
          :aria-label="`Página ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
        >
          {{ page }}
        </button>
        <button
          @click="$emit('next')"
          :disabled="currentPage >= lastPage"
          class="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-surface-border bg-dark-lighter text-sm text-text-muted hover:bg-surface-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Próxima"
        >
          ›
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  lastPage: number
  total: number
  limit: number
  visiblePages: number[]
}

const props = defineProps<Props>()

defineEmits<{
  'prev': []
  'next': []
  'goToPage': [page: number]
}>()

const from = computed(() => (props.currentPage - 1) * props.limit + 1)
const to = computed(() => Math.min(props.currentPage * props.limit, props.total))
</script>
