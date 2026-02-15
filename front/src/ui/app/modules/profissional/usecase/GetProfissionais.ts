import type { Profissional } from '../domain/Profissional.types'
import type { PaginatedResponse } from '~/src/shared/http/types'
import type { IProfissionalRepository } from '../infrastructure/ProfissionalRepository'

export class GetProfissionaisUseCase {
  constructor(private repository: IProfissionalRepository) {}

  async execute(
    page: number,
    limit: number,
    search?: string,
    gender?: string
  ): Promise<PaginatedResponse<Profissional>> {
    return this.repository.findAll(page, limit, search, gender)
  }
}
