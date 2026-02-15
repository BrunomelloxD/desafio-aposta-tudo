import type { Profissional as ProfissionalType } from './Profissional.types'
import type { Sexo } from '~/src/shared/utils/constants'

export class Profissional {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly sexo: Sexo,
    public readonly data_nascimento: string,
    public readonly hobby: string,
    public readonly nivel_id?: string,
    public readonly nivel?: string,
    public readonly idade?: number,
    public readonly createdAt?: string,
    public readonly updatedAt?: string
  ) {}

  static fromData(data: ProfissionalType): Profissional {
    return new Profissional(
      data.id,
      data.nome,
      data.sexo,
      data.data_nascimento,
      data.hobby,
      data.nivel_id,
      data.nivel,
      data.idade,
      data.createdAt,
      data.updatedAt
    )
  }

  static validateNome(nome: string): boolean {
    return nome.trim().length > 0
  }

  static validateDataNascimento(data: string): boolean {
    const date = new Date(data)
    const now = new Date()
    return date < now && !isNaN(date.getTime())
  }

  toJSON(): ProfissionalType {
    return {
      id: this.id,
      nome: this.nome,
      sexo: this.sexo,
      data_nascimento: this.data_nascimento,
      hobby: this.hobby,
      nivel_id: this.nivel_id,
      nivel: this.nivel,
      idade: this.idade,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
