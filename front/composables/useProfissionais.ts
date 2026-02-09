import type { Profissional, PaginatedResponse } from '~/types'

interface ProfissionalInput {
  nome: string
  nivel_id: string
  sexo: 'Masculino' | 'Feminino' | 'Outro'
  data_nascimento: string
  hobby: string
}

export const useProfissionais = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const fetchProfissionais = async (page: number = 1, limit: number = 10, search: string = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search })
    })

    return await $fetch<PaginatedResponse<Profissional>>(`${apiBase}/api/profissionais?${params}`)
  }

  const createProfissional = async (data: ProfissionalInput) => {
    return await $fetch<Profissional>(`${apiBase}/api/profissionais`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    })
  }

  const updateProfissional = async (id: string, data: ProfissionalInput) => {
    return await $fetch<Profissional>(`${apiBase}/api/profissionais/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data
    })
  }

  const deleteProfissional = async (id: string) => {
    return await $fetch(`${apiBase}/api/profissionais/${id}`, {
      method: 'DELETE'
    })
  }

  return {
    fetchProfissionais,
    createProfissional,
    updateProfissional,
    deleteProfissional
  }
}
