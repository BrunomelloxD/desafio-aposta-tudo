export interface Nivel {
  id: string
  nivel: string 
  createdAt?: string
  updatedAt?: string
}

export interface CreateNivelInput {
  nome: string
}

export interface UpdateNivelInput {
  nome: string
}
