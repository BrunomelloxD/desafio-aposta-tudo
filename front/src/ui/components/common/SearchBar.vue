<template>
  <div class="flex gap-4 mb-6">
    <div class="flex-1 relative">
      <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-dim" />
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keyup.enter="$emit('search')"
        type="text"
        :placeholder="placeholder"
        class="block w-full pl-10 pr-4 py-2.5 bg-dark-light border border-surface-border rounded-lg text-text placeholder-text-dim focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200"
      />
    </div>
    <slot name="filters" />
    <div v-if="showLimitSelector" class="w-20">
      <select
        :value="limit"
        @change="$emit('update:limit', Number(($event.target as HTMLSelectElement).value))"
        class="block w-full pl-3 pr-8 py-2.5 bg-dark-light border border-surface-border rounded-lg text-text focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%239ca3af%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
      >
        <option v-for="option in limitOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <PrimaryButton
      :label="searchLabel"
      :icon="MagnifyingGlassIcon"
      @click="$emit('search')"
    />
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

interface Props {
  modelValue: string
  placeholder?: string
  searchLabel?: string
  showLimitSelector?: boolean
  limit?: number
  limitOptions?: number[]
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar por nome...',
  searchLabel: 'Buscar',
  showLimitSelector: true,
  limit: 10,
  limitOptions: () => [5, 10, 25, 50]
})

defineEmits<{
  'update:modelValue': [value: string]
  'update:limit': [value: number]
  'search': []
}>()
</script>
