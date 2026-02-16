export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [5, 10, 25, 50] as const,
  DEFAULT_PAGE: 1
} as const

export const DEBOUNCE = {
  SEARCH_DELAY: 500
} as const

export const SEXO_OPTIONS = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Feminino', label: 'Feminino' },
  { value: 'Outro', label: 'Outro' }
] as const

export type Sexo = typeof SEXO_OPTIONS[number]['value']

export const NOTIFICATION = {
  AUTO_DISMISS_DELAY: 5000,
  MAX_WIDTH: 'max-w-md'
} as const

export const HTTP_STATUS = {
  CONFLICT: 409,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500
} as const

export const LOGO_GRADIENT = {
  FROM: '#f97015',
  VIA_1: '#fb8c3c',
  VIA_2: '#f97015',
  TO: '#e06010',
  BACKGROUND: '#111317'
} as const

const NIVEL_COLOR_PALETTE = [
  'bg-green-500',
  'bg-teal-500',
  'bg-purple-500',
  'bg-blue-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-indigo-500',
  'bg-lime-500',
  'bg-fuchsia-500',
] as const

const NIVEL_CARD_PALETTE = [
  { bg: 'bg-green-500/20', text: 'text-green-400' },
  { bg: 'bg-teal-500/20', text: 'text-teal-400' },
  { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  { bg: 'bg-rose-500/20', text: 'text-rose-400' },
  { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
  { bg: 'bg-indigo-500/20', text: 'text-indigo-400' },
  { bg: 'bg-lime-500/20', text: 'text-lime-400' },
  { bg: 'bg-fuchsia-500/20', text: 'text-fuchsia-400' },
] as const

export function getNivelBadgeColor(nivel: string, allNiveis: string[]): string | undefined {
  const index = allNiveis.indexOf(nivel)
  if (index === -1) return 'bg-gray-500'
  return NIVEL_COLOR_PALETTE[index % NIVEL_COLOR_PALETTE.length] ?? 'bg-gray-500'
}

export function getNivelCardColor(nivel: string, allNiveis: string[]): string {
  const index = allNiveis.indexOf(nivel)
  if (index === -1) return 'bg-gray-500/20 text-gray-400'
  const palette = NIVEL_CARD_PALETTE[index % NIVEL_CARD_PALETTE.length]
  return palette ? `${palette.bg} ${palette.text}` : 'bg-gray-500/20 text-gray-400'
}

export const SEXO_COLORS: Record<string, string> = {
  'Feminino': 'bg-pink-500',
  'Masculino': 'bg-blue-500',
  'Outro': 'bg-gray-400',
} as const

export const ERROR_MESSAGES = {
  DELETE_NIVEL_CONFLICT: 'Não é possível excluir este nível porque existem profissionais associados a ele.',
  GENERIC_ERROR: 'Ocorreu um erro. Tente novamente.',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  LOAD_ERROR: 'Erro ao carregar dados.',
  SAVE_ERROR: 'Erro ao salvar.',
  DELETE_ERROR: 'Erro ao excluir.'
} as const
