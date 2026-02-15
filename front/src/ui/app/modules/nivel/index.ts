// Domain
export { Nivel as NivelEntity } from './domain/Nivel'
export type * from './domain/Nivel.types'

// Use Cases
export { GetNiveisUseCase } from './usecase/GetNiveis'
export { CreateNivelUseCase } from './usecase/CreateNivel'
export { UpdateNivelUseCase } from './usecase/UpdateNivel'
export { DeleteNivelUseCase } from './usecase/DeleteNivel'

// Infrastructure
export { NivelRepository } from './infrastructure/NivelRepository'
export type { INivelRepository } from './infrastructure/NivelRepository'

// UI
export { useNivelModule } from './ui/composables/useNivelModule'
