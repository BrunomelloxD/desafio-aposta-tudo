import type { Nivel } from '../domain/Nivel.types'
import type { INivelRepository } from '../infrastructure/NivelRepository'
import { Nivel as NivelEntity } from '../domain/Nivel'

export class UpdateNivelUseCase {
  constructor(private repository: INivelRepository) {}

  async execute(id: string, nome: string): Promise<Nivel> {
    if (!NivelEntity.validateNome(nome)) {
      throw new Error('Nome do nível é obrigatório')
    }

    return this.repository.update(id, nome)
  }
}
