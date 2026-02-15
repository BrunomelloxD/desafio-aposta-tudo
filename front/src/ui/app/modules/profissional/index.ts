// Domain
export { Profissional as ProfissionalEntity } from './domain/Profissional'
export type * from './domain/Profissional.types'

// Use Cases
export { GetProfissionaisUseCase } from './usecase/GetProfissionais'
export { CreateProfissionalUseCase } from './usecase/CreateProfissional'
export { UpdateProfissionalUseCase } from './usecase/UpdateProfissional'
export { DeleteProfissionalUseCase } from './usecase/DeleteProfissional'

// Infrastructure
export { ProfissionalRepository } from './infrastructure/ProfissionalRepository'
export type { IProfissionalRepository } from './infrastructure/ProfissionalRepository'

// UI
export { useProfissionalModule } from './ui/composables/useProfissionalModule'
