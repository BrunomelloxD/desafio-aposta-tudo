<template>
  <Modal v-model="isOpen" size="md">
    <form @submit.prevent="$emit('submit')">
      <div class="bg-dark-light px-6 pt-6 pb-4">
        <h3 class="text-lg font-semibold text-text mb-5">
          {{ isEditing ? 'Editar Nível' : 'Novo Nível' }}
        </h3>

        <FormField label="Nome do Nível" required>
          <input
            v-model="formData.nome"
            type="text"
            required
            placeholder="Digite o nome do nível"
            class="block w-full px-3 py-2.5 bg-dark border border-surface-border rounded-lg text-text placeholder-text-dim focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200"
          />
        </FormField>
      </div>

      <div class="bg-dark-lighter px-6 py-4 flex flex-row-reverse gap-3">
        <PrimaryButton
          :label="loading ? 'Salvando...' : 'Salvar'"
          type="submit"
          :disabled="loading"
        />
        <button
          type="button"
          @click="$emit('cancel')"
          :disabled="loading"
          class="px-4 py-2 rounded-lg border border-surface-border text-sm font-medium text-text-muted hover:bg-dark-lighter disabled:opacity-50 transition-all duration-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  formData: { nome: string }
  isEditing: boolean
  loading: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'submit': []
  'cancel': []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
