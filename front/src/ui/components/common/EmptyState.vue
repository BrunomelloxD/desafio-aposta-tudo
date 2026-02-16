<template>
  <div class="text-center py-12">
    <div class="bg-dark-light rounded-xl border border-surface-border p-8">
      <div class="text-6xl mb-4">{{ emoji }}</div>
      <h3 class="text-xl font-semibold text-text mb-2">{{ title }}</h3>
      <p class="text-text-muted mb-6">{{ message }}</p>
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  emoji: string
  title: string
  message: string
}

defineProps<Props>()
</script>
