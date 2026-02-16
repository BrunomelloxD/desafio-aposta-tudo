<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8" :class="gridCols">
    <StatsCard
      v-for="card in cards"
      :key="card.label"
      :label="card.label"
      :value="card.value"
      :subtitle="card.subtitle"
      :icon="card.icon"
      :icon-color="card.iconColor"
    />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

export interface StatCardData {
  label: string
  value: number | string
  subtitle?: string
  icon: Component
  iconColor?: string
}

interface Props {
  cards: StatCardData[]
}

const props = defineProps<Props>()

const gridCols = computed(() => {
  const count = props.cards.length
  if (count <= 2) return 'lg:grid-cols-2'
  if (count <= 3) return 'lg:grid-cols-3'
  if (count <= 4) return 'lg:grid-cols-4'
  return 'lg:grid-cols-4 xl:grid-cols-5'
})
</script>
