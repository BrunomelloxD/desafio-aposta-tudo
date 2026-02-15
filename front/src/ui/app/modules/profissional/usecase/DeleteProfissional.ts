import type { IProfissionalRepository } from '../infrastructure/ProfissionalRepository'

export class DeleteProfissionalUseCase {
  constructor(private repository: IProfissionalRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
