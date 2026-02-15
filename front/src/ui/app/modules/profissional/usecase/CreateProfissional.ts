import type { Profissional, CreateProfissionalInput } from '../domain/Profissional.types'
import type { IProfissionalRepository } from '../infrastructure/ProfissionalRepository'
import { Profissional as ProfissionalEntity } from '../domain/Profissional'

export class CreateProfissionalUseCase {
  constructor(private repository: IProfissionalRepository) {}

  async execute(data: CreateProfissionalInput): Promise<Profissional> {
    if (!ProfissionalEntity.validateNome(data.nome)) {
      throw new Error('Nome do profissional é obrigatório')
    }

    if (!ProfissionalEntity.validateDataNascimento(data.data_nascimento)) {
      throw new Error('Data de nascimento inválida')
    }

    return this.repository.create(data)
  }
}
