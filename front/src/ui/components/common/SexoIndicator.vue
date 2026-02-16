<template>
  <span class="inline-flex items-center gap-2 text-sm text-text-muted">
    <span class="w-2.5 h-2.5 rounded-full" :class="dotClass" />
    {{ sexo }}
  </span>
</template>

<script setup lang="ts">
import { SEXO_COLORS } from '~/src/shared/utils/constants'

interface Props {
  sexo: string
}

const props = defineProps<Props>()

const dotClass = computed(() => SEXO_COLORS[props.sexo] ?? 'bg-gray-400')
</script>
