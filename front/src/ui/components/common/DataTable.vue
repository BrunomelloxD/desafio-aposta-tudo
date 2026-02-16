<template>
  <div class="bg-dark-light shadow-lg overflow-hidden rounded-xl border border-surface-border">
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      <p class="mt-4 text-text-muted">Carregando...</p>
    </div>

    <div v-else-if="error" class="bg-red-900/20 border border-red-500/30 rounded-lg p-4 m-4">
      <p class="text-red-400">{{ error }}</p>
    </div>

    <template v-else>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-surface-border">
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                scope="col"
                :class="[
                  'px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider',
                  column.align === 'right' ? 'text-right' : 'text-left'
                ]"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-border">
            <slot name="body" />
            <tr v-if="!hasData">
              <td :colspan="columns.length" class="px-6 py-8 text-center text-sm text-text-muted">
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
