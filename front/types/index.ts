export interface Nivel {
  id: string
  nivel: string 
  createdAt?: string
  updatedAt?: string
}

export interface Profissional {
  id: string
  nome: string
  nivel_id?: string
  nivel?: string 
  sexo: 'Masculino' | 'Feminino' | 'Outro'
  data_nascimento: string
  hobby: string
  idade?: number
  createdAt?: string
  updatedAt?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    last_page: number
  }
}

export interface ApiError {
  message: string
  statusCode?: number
}
