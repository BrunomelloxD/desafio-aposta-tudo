/**
 * Funções utilitárias para formatação de dados
 */

/**
 * Formata uma data ISO para o formato brasileiro (dd/mm/yyyy)
 * Extrai apenas a parte da data (YYYY-MM-DD) sem considerar timezone
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '-'
  
  try {
    const datePart = dateString.split('T')[0]
    const [year, month, day] = datePart.split('-')
    
    if (!year || !month || !day) return '-'
    
    return `${day}/${month}/${year}`
  } catch {
    return '-'
  }
}

/**
 * Formata uma data para o formato ISO (yyyy-mm-dd)
 */
export const formatDateToISO = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

/**
 * Retorna a data de hoje no formato ISO
 */
export const getTodayISO = (): string => {
  return formatDateToISO(new Date())
}

/**
 * Verifica se uma data é futura
 */
export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}
