/**
 * Formata data ISO para formato brasileiro (dd/mm/yyyy)
 * @returns Data formatada ou '-' se inválida
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '-'
  
  try {
    const datePart = dateString.split('T')[0]
    if (!datePart) return '-'
    
    const [year, month, day] = datePart.split('-')
    
    if (!year || !month || !day) return '-'
    
    return `${day}/${month}/${year}`
  } catch {
    return '-'
  }
}

export const formatDateToISO = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0] ?? ''
}

export const getTodayISO = (): string => {
  return formatDateToISO(new Date())
}

export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}
