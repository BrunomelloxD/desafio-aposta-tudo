<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="modal" @after-leave="onAfterLeave">
        <div
          v-if="modelValue && isMounted"
          class="fixed z-[9999] inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          @click.self="closeOnBackdrop && close()"
        >
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition name="modal-backdrop">
              <div
                v-if="modelValue"
                class="fixed inset-0 bg-black bg-opacity-75 transition-opacity z-[9998]"
                aria-hidden="true"
                @click="closeOnBackdrop && close()"
              />
            </Transition>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <Transition name="modal-content">
              <div
                v-if="modelValue"
                class="relative inline-block align-bottom bg-dark-light rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-surface-border z-[9999]"
                :class="sizeClasses"
              >
                <slot />
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closeOnBackdrop: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-2xl',
    xl: 'sm:max-w-4xl'
  }
  return sizes[props.size]
})

const close = () => {
  emit('update:modelValue', false)
}

const onAfterLeave = () => {
  // Garante que o overflow seja restaurado após a transição
  document.body.style.overflow = ''
}

watch(() => props.modelValue, (isOpen) => {
  if (isOpen && isMounted.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}
</style>
