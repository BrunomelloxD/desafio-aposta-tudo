<template>
  <UiModal v-model="isOpen" size="sm" :close-on-backdrop="false">
    <div class="bg-dark-light px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div
          class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
          :class="variantClasses.bg"
        >
          <component :is="icon" class="h-6 w-6" :class="variantClasses.text" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">
            {{ title }}
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-400">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-dark-lighter px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <button
        type="button"
        @click="confirm"
        :disabled="loading"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-all duration-200"
        :class="[variantClasses.button, loading && 'cursor-not-allowed']"
      >
        {{ loading ? loadingText : confirmText }}
      </button>
      <button
        type="button"
        @click="cancel"
        :disabled="loading"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-dark-lighter shadow-sm px-4 py-2 bg-dark text-base font-medium text-gray-300 hover:bg-dark-lighter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-all duration-200"
      >
        {{ cancelText }}
      </button>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

interface Props {
  modelValue: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  loadingText?: string
  variant?: 'danger' | 'warning' | 'info' | 'success'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  loadingText: 'Processando...',
  variant: 'warning',
  loading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'confirm': []
  'cancel': []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const icon = computed(() => {
  const icons = {
    danger: ExclamationTriangleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
    success: CheckCircleIcon
  }
  return icons[props.variant]
})

const variantClasses = computed(() => {
  const variants = {
    danger: {
      bg: 'bg-red-900/30',
      text: 'text-red-400',
      button: 'bg-accent hover:bg-accent-dark focus:ring-accent'
    },
    warning: {
      bg: 'bg-yellow-900/30',
      text: 'text-yellow-400',
      button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
    },
    info: {
      bg: 'bg-blue-900/30',
      text: 'text-primary-light',
      button: 'bg-primary hover:bg-primary-dark focus:ring-primary'
    },
    success: {
      bg: 'bg-green-900/30',
      text: 'text-green-400',
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
    }
  }
  return variants[props.variant]
})

const confirm = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
  isOpen.value = false
}
</script>
