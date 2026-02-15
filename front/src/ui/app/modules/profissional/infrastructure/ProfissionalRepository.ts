import type { Profissional, CreateProfissionalInput, UpdateProfissionalInput } from '../domain/Profissional.types'
import type { PaginatedResponse } from '~/src/shared/http/types'
import { HttpService } from '~/src/shared/http/HttpService'

export interface IProfissionalRepository {
  findAll(page: number, limit: number, search?: string, gender?: string): Promise<PaginatedResponse<Profissional>>
  create(data: CreateProfissionalInput): Promise<Profissional>
  update(id: string, data: UpdateProfissionalInput): Promise<Profissional>
  delete(id: string): Promise<void>
}

export class ProfissionalRepository implements IProfissionalRepository {
  private httpService: HttpService

  constructor(apiBase: string) {
    this.httpService = new HttpService(apiBase)
  }

  async findAll(
    page: number,
    limit: number,
    search: string = '',
    gender: string = ''
  ): Promise<PaginatedResponse<Profissional>> {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString()
    }

    if (search) {
      params.search = search
    }

    if (gender) {
      params.gender = gender
    }

    return this.httpService.get<PaginatedResponse<Profissional>>('/api/profissionais', params)
  }

  async create(data: CreateProfissionalInput): Promise<Profissional> {
    return this.httpService.post<Profissional>('/api/profissionais', data)
  }

  async update(id: string, data: UpdateProfissionalInput): Promise<Profissional> {
    return this.httpService.put<Profissional>(`/api/profissionais/${id}`, data)
  }

  async delete(id: string): Promise<void> {
    return this.httpService.delete<void>(`/api/profissionais/${id}`)
  }
}
