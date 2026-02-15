import type { Nivel } from '../../domain/Nivel.types'
import type { PaginatedResponse } from '~/src/shared/http/types'
import { NivelRepository } from '../../infrastructure/NivelRepository'
import { GetNiveisUseCase } from '../../usecase/GetNiveis'
import { CreateNivelUseCase } from '../../usecase/CreateNivel'
import { UpdateNivelUseCase } from '../../usecase/UpdateNivel'
import { DeleteNivelUseCase } from '../../usecase/DeleteNivel'
import { PAGINATION } from '~/src/shared/utils/constants'

export const useNivelModule = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const repository = new NivelRepository(apiBase)

  const getNiveisUseCase = new GetNiveisUseCase(repository)
  const createNivelUseCase = new CreateNivelUseCase(repository)
  const updateNivelUseCase = new UpdateNivelUseCase(repository)
  const deleteNivelUseCase = new DeleteNivelUseCase(repository)

  const fetchNiveis = async (
    page: number = PAGINATION.DEFAULT_PAGE,
    limit: number = PAGINATION.DEFAULT_LIMIT,
    search: string = ''
  ): Promise<PaginatedResponse<Nivel>> => {
    return getNiveisUseCase.execute(page, limit, search)
  }

  const createNivel = async (nivel: string): Promise<Nivel> => {
    return createNivelUseCase.execute(nivel)
  }

  const updateNivel = async (id: string, nivel: string): Promise<Nivel> => {
    return updateNivelUseCase.execute(id, nivel)
  }

  const deleteNivel = async (id: string): Promise<void> => {
    return deleteNivelUseCase.execute(id)
  }

  return {
    fetchNiveis,
    createNivel,
    updateNivel,
    deleteNivel
  }
}
