/**
 * Constantes globais da aplicação
 * Centraliza valores reutilizáveis para manter consistência
 */

/**
 * Configurações de paginação
 */
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [5, 10, 25, 50] as const,
  DEFAULT_PAGE: 1
} as const

/**
 * Configurações de debounce para eventos
 */
export const DEBOUNCE = {
  SEARCH_DELAY: 500
} as const

/**
 * Opções de sexo disponíveis
 */
export const SEXO_OPTIONS = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Feminino', label: 'Feminino' },
  { value: 'Outro', label: 'Outro' }
] as const

/**
 * Tipo derivado das opções de sexo
 * Garante consistência com os valores definidos em SEXO_OPTIONS
 */
export type Sexo = typeof SEXO_OPTIONS[number]['value']

/**
 * Configurações de notificações
 */
export const NOTIFICATION = {
  AUTO_DISMISS_DELAY: 5000,
  MAX_WIDTH: 'max-w-md'
} as const

/**
 * Códigos de status HTTP
 */
export const HTTP_STATUS = {
  CONFLICT: 409,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500
} as const

/**
 * Cores do gradiente da logo
 */
export const LOGO_GRADIENT = {
  FROM: '#7024C4',
  VIA_1: '#C21975',
  VIA_2: '#C74C4D',
  TO: '#E09B3D',
  BACKGROUND: '#0606AD'
} as const

/**
 * Mensagens de erro padrão
 */
export const ERROR_MESSAGES = {
  DELETE_NIVEL_CONFLICT: 'Não é possível excluir este nível porque existem profissionais associados a ele.',
  GENERIC_ERROR: 'Ocorreu um erro. Tente novamente.',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  LOAD_ERROR: 'Erro ao carregar dados.',
  SAVE_ERROR: 'Erro ao salvar.',
  DELETE_ERROR: 'Erro ao excluir.'
} as const
