<template>
  <div class="flex gap-4">
    <div class="flex-1">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keyup.enter="$emit('search')"
        type="text"
        :placeholder="placeholder"
        class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div v-if="showLimitSelector" class="w-18">
      <select
        :value="limit"
        @change="$emit('update:limit', Number(($event.target as HTMLSelectElement).value))"
        class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option v-for="option in limitOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div>
      <button
        @click="$emit('search')"
        type="button"
        class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        {{ searchLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  searchLabel?: string
  showLimitSelector?: boolean
  limit?: number
  limitOptions?: number[]
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar...',
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
