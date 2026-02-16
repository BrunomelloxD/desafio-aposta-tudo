<template>
  <NuxtLink
    :to="to"
    class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
    :class="isActive
      ? 'bg-primary text-white'
      : 'text-text-muted hover:text-text hover:bg-dark-lighter'"
  >
    <component :is="icon" class="h-4 w-4" />
    <span>{{ label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  to: string
  label: string
  icon: Component
  isActive: boolean
}

defineProps<Props>()
</script>
