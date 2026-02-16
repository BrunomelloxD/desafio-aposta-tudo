<template>
  <div class="bg-dark-light shadow-lg overflow-hidden rounded-xl border border-surface-border">
    <table class="min-w-full divide-y divide-surface-border">
      <thead>
        <tr>
          <th
            v-for="col in TABLE_COLUMNS"
            :key="col.key"
            class="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-surface-border">
        <tr
          v-for="p in profissionais"
          :key="p.id"
          class="hover:bg-dark-lighter/50 transition-colors duration-150"
        >
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
            {{ p.nome }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <NivelBadge :nivel="p.nivel || '-'" :all-niveis="props.allNiveis" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <SexoIndicator :sexo="p.sexo" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
            {{ formatDate(p.data_nascimento) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
            {{ p.idade }} anos
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
            {{ p.hobby }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
            <div class="flex items-center justify-end gap-2">
              <button
                @click="$emit('edit', p)"
                class="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-150"
                aria-label="Editar"
              >
                <PencilIcon class="h-4 w-4" />
              </button>
              <button
                @click="$emit('delete', p)"
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

    <slot name="pagination" />
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import type { Profissional } from '~/src/ui/app/modules/profissional/domain/Profissional.types'
import { formatDate } from '~/src/shared/utils/formatters'

const TABLE_COLUMNS = [
  { key: 'nome', label: 'Nome' },
  { key: 'nivel', label: 'Nivel' },
  { key: 'sexo', label: 'Sexo' },
  { key: 'nascimento', label: 'Nascimento' },
  { key: 'idade', label: 'Idade' },
  { key: 'hobby', label: 'Hobby' },
  { key: 'acoes', label: 'Ações' },
]

interface Props {
  profissionais: Profissional[]
  allNiveis?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  allNiveis: () => [],
})

defineEmits<{
  edit: [profissional: Profissional]
  delete: [profissional: Profissional]
}>()
</script>
