import type { Profissional, UpdateProfissionalInput } from '../domain/Profissional.types'
import type { IProfissionalRepository } from '../infrastructure/ProfissionalRepository'
import { Profissional as ProfissionalEntity } from '../domain/Profissional'

export class UpdateProfissionalUseCase {
  constructor(private repository: IProfissionalRepository) {}

  async execute(id: string, data: UpdateProfissionalInput): Promise<Profissional> {
    if (!ProfissionalEntity.validateNome(data.nome)) {
      throw new Error('Nome do profissional é obrigatório')
    }

    if (!ProfissionalEntity.validateDataNascimento(data.data_nascimento)) {
      throw new Error('Data de nascimento inválida')
    }

    return this.repository.update(id, data)
  }
}
