<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-600">Carregando...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 m-4">
      <p class="text-red-800">{{ error }}</p>
    </div>

    <template v-else>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                scope="col"
                :class="[
                  'px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider',
                  column.align === 'right' ? 'text-right' : 'text-left'
                ]"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <slot name="body" />
            <tr v-if="!hasData">
              <td :colspan="columns.length" class="px-6 py-8 text-center text-sm text-gray-500">
                Nenhum registro encontrado
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <slot name="pagination" />
    </template>
  </div>
</template>

<script setup lang="ts">
export interface TableColumn {
  key: string
  label: string
  align?: 'left' | 'right' | 'center'
}

interface Props {
  columns: TableColumn[]
  loading?: boolean
  error?: string | null
  hasData?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  hasData: true
})
</script>
