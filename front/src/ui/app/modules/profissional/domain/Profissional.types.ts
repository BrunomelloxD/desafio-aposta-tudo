import type { Sexo } from '~/src/shared/utils/constants'

export interface Profissional {
  id: string
  nome: string
  nivel_id?: string
  nivel?: string 
  sexo: Sexo
  data_nascimento: string
  hobby: string
  idade?: number
  createdAt?: string
  updatedAt?: string
}

export interface CreateProfissionalInput {
  nome: string
  nivel_id: string
  sexo: Sexo
  data_nascimento: string
  hobby: string
}

export interface UpdateProfissionalInput {
  nome: string
  nivel_id: string
  sexo: Sexo
  data_nascimento: string
  hobby: string
}
