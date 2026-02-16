<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold text-white"
    :class="badgeClass"
  >
    {{ nivel }}
  </span>
</template>

<script setup lang="ts">
import { getNivelBadgeColor } from '~/src/shared/utils/constants'

interface Props {
  nivel: string
  allNiveis?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  allNiveis: () => [],
})

const badgeClass = computed(() => getNivelBadgeColor(props.nivel, props.allNiveis))
</script>
