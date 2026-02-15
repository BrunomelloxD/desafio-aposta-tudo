import type { Nivel } from '../domain/Nivel.types'
import type { PaginatedResponse } from '~/src/shared/http/types'
import type { INivelRepository } from '../infrastructure/NivelRepository'

export class GetNiveisUseCase {
  constructor(private repository: INivelRepository) {}

  async execute(
    page: number,
    limit: number,
    search?: string
  ): Promise<PaginatedResponse<Nivel>> {
    return this.repository.findAll(page, limit, search)
  }
}
