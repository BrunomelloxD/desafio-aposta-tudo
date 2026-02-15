import type { Profissional, CreateProfissionalInput, UpdateProfissionalInput } from '../../domain/Profissional.types'
import type { PaginatedResponse } from '~/src/shared/http/types'
import { ProfissionalRepository } from '../../infrastructure/ProfissionalRepository'
import { GetProfissionaisUseCase } from '../../usecase/GetProfissionais'
import { CreateProfissionalUseCase } from '../../usecase/CreateProfissional'
import { UpdateProfissionalUseCase } from '../../usecase/UpdateProfissional'
import { DeleteProfissionalUseCase } from '../../usecase/DeleteProfissional'
import { PAGINATION } from '~/src/shared/utils/constants'

export const useProfissionalModule = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const repository = new ProfissionalRepository(apiBase)

  const getProfissionaisUseCase = new GetProfissionaisUseCase(repository)
  const createProfissionalUseCase = new CreateProfissionalUseCase(repository)
  const updateProfissionalUseCase = new UpdateProfissionalUseCase(repository)
  const deleteProfissionalUseCase = new DeleteProfissionalUseCase(repository)

  const fetchProfissionais = async (
    page: number = PAGINATION.DEFAULT_PAGE,
    limit: number = PAGINATION.DEFAULT_LIMIT,
    search: string = '',
    gender: string = ''
  ): Promise<PaginatedResponse<Profissional>> => {
    return getProfissionaisUseCase.execute(page, limit, search, gender)
  }

  const createProfissional = async (data: CreateProfissionalInput): Promise<Profissional> => {
    return createProfissionalUseCase.execute(data)
  }

  const updateProfissional = async (id: string, data: UpdateProfissionalInput): Promise<Profissional> => {
    return updateProfissionalUseCase.execute(id, data)
  }

  const deleteProfissional = async (id: string): Promise<void> => {
    return deleteProfissionalUseCase.execute(id)
  }

  return {
    fetchProfissionais,
    createProfissional,
    updateProfissional,
    deleteProfissional
  }
}
