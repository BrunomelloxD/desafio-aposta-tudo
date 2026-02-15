import type { Nivel as NivelType } from './Nivel.types'

export class Nivel {
  constructor(
    public readonly id: string,
    public readonly nivel: string,
    public readonly createdAt?: string,
    public readonly updatedAt?: string
  ) {}

  static fromData(data: NivelType): Nivel {
    return new Nivel(
      data.id,
      data.nivel,
      data.createdAt,
      data.updatedAt
    )
  }

  static validateNome(nome: string): boolean {
    return nome.trim().length > 0
  }

  toJSON(): NivelType {
    return {
      id: this.id,
      nivel: this.nivel,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
