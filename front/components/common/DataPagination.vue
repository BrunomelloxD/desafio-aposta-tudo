<template>
  <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
    <!-- Mobile -->
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        @click="$emit('prev')"
        :disabled="currentPage === 1"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>
      <button
        @click="$emit('next')"
        :disabled="currentPage >= lastPage"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Próxima
      </button>
    </div>

    <!-- Desktop -->
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Mostrando
          <span class="font-medium">{{ from }}</span>
          até
          <span class="font-medium">{{ to }}</span>
          de
          <span class="font-medium">{{ total }}</span>
          resultados
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            @click="$emit('prev')"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Página anterior"
          >
            <span class="sr-only">Anterior</span>
            ←
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="$emit('goToPage', page)"
            :class="[
              'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors',
              page === currentPage
                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            ]"
            :aria-label="`Página ${page}`"
            :aria-current="page === currentPage ? 'page' : undefined"
          >
            {{ page }}
          </button>
          <button
            @click="$emit('next')"
            :disabled="currentPage >= lastPage"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Próxima página"
          >
            <span class="sr-only">Próxima</span>
            →
          </button>
        </nav>
      </div>
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
