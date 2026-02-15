import type { INivelRepository } from '../infrastructure/NivelRepository'

export class DeleteNivelUseCase {
  constructor(private repository: INivelRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
