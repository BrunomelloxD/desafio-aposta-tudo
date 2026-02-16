<template>
  <div class="bg-dark-light border border-surface-border rounded-xl p-5 flex items-center justify-between">
    <div>
      <p class="text-sm text-text-muted">{{ label }}</p>
      <p class="text-3xl font-bold text-text mt-1">{{ value }}</p>
      <p v-if="subtitle" class="text-xs text-text-dim mt-1">{{ subtitle }}</p>
    </div>
    <div
      class="w-10 h-10 rounded-lg flex items-center justify-center"
      :class="iconColor || 'bg-primary/20 text-primary'"
    >
      <component :is="icon" class="h-5 w-5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  label: string
  value: number | string
  subtitle?: string
  icon: Component
  iconColor?: string
}

defineProps<Props>()
</script>
