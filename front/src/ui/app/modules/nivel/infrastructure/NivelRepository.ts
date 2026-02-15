import type { Nivel } from '../domain/Nivel.types'
import type { PaginatedResponse } from '~/src/shared/http/types'
import { HttpService } from '~/src/shared/http/HttpService'

export interface INivelRepository {
  findAll(page: number, limit: number, search?: string): Promise<PaginatedResponse<Nivel>>
  create(nome: string): Promise<Nivel>
  update(id: string, nome: string): Promise<Nivel>
  delete(id: string): Promise<void>
}

export class NivelRepository implements INivelRepository {
  private httpService: HttpService

  constructor(apiBase: string) {
    this.httpService = new HttpService(apiBase)
  }

  async findAll(
    page: number,
    limit: number,
    search: string = ''
  ): Promise<PaginatedResponse<Nivel>> {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString()
    }

    if (search) {
      params.search = search
    }

    return this.httpService.get<PaginatedResponse<Nivel>>('/api/niveis', params)
  }

  async create(nome: string): Promise<Nivel> {
    return this.httpService.post<Nivel>('/api/niveis', { nome })
  }

  async update(id: string, nome: string): Promise<Nivel> {
    return this.httpService.put<Nivel>(`/api/niveis/${id}`, { nome })
  }

  async delete(id: string): Promise<void> {
    return this.httpService.delete<void>(`/api/niveis/${id}`)
  }
}
