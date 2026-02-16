<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    @click="$emit('click')"
  >
    <component v-if="icon" :is="icon" class="h-4 w-4" />
    <span>{{ loading ? loadingText : label }}</span>
  </button>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  label: string
  icon?: Component
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  loading: false,
  loadingText: 'Aguarde...',
})

defineEmits<{ click: [] }>()
</script>
