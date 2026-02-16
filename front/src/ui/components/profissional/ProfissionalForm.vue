<template>
  <Modal v-model="isOpen" size="lg">
    <form @submit.prevent="$emit('submit')">
      <div class="bg-dark-light px-6 pt-6 pb-4">
        <h3 class="text-lg font-semibold text-text mb-5">
          {{ isEditing ? 'Editar Profissional' : 'Novo Profissional' }}
        </h3>

        <div class="space-y-4">
          <FormField label="Nome" required>
            <input
              v-model="formData.nome"
              type="text"
              required
              placeholder="Digite o nome"
              class="form-input"
            />
          </FormField>

          <FormField label="Nível" required>
            <select v-model="formData.nivel_id" required class="form-input">
              <option value="">Selecione um nível</option>
              <option v-for="nivel in niveis" :key="nivel.id" :value="nivel.id">
                {{ nivel.nivel }}
              </option>
            </select>
          </FormField>

          <FormField label="Sexo" required>
            <select v-model="formData.sexo" required class="form-input">
              <option value="">Selecione</option>
              <option v-for="option in SEXO_OPTIONS" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </FormField>

          <FormField label="Data de Nascimento" required hint="A data deve ser anterior a hoje">
            <input
              v-model="formData.data_nascimento"
              type="date"
              required
              :max="maxDate"
              class="form-input [color-scheme:dark]"
            />
          </FormField>

          <FormField label="Hobby" required>
            <input
              v-model="formData.hobby"
              type="text"
              required
              placeholder="Digite o hobby"
              class="form-input"
            />
          </FormField>
        </div>
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
import type { Nivel } from '~/src/ui/app/modules/nivel/domain/Nivel.types'
import type { ProfissionalFormData } from '~/src/ui/app/modules/profissional/ui/composables/useProfissionaisPage'
import { SEXO_OPTIONS } from '~/src/shared/utils/constants'

interface Props {
  modelValue: boolean
  formData: ProfissionalFormData
  niveis: Nivel[]
  isEditing: boolean
  loading: boolean
  maxDate: string
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

<style scoped>
.form-input {
  @apply block w-full px-3 py-2.5 bg-dark border border-surface-border rounded-lg text-text placeholder-text-dim focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200;
}
</style>
