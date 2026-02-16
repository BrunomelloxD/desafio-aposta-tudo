<template>
  <div>
    <label class="block text-sm font-medium text-text-muted mb-1.5">
      {{ label }} <span v-if="required" class="text-primary">*</span>
    </label>
    <slot />
    <p v-if="hint" class="mt-1 text-xs text-text-dim">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  required?: boolean
  hint?: string
}

withDefaults(defineProps<Props>(), {
  required: false,
})
</script>
