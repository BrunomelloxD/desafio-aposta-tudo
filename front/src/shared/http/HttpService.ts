export class HttpService {
  private apiBase: string

  constructor(apiBase: string) {
    this.apiBase = apiBase
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = params 
      ? `${this.apiBase}${endpoint}?${new URLSearchParams(params)}`
      : `${this.apiBase}${endpoint}`
    
    return $fetch<T>(url)
  }

  async post<T>(endpoint: string, body: Record<string, any>): Promise<T> {
    return $fetch<T>(`${this.apiBase}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
  }

  async put<T>(endpoint: string, body: Record<string, any>): Promise<T> {
    return $fetch<T>(`${this.apiBase}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body
    })
  }

  async delete<T = void>(endpoint: string): Promise<T> {
    return $fetch<T>(`${this.apiBase}${endpoint}`, {
      method: 'DELETE'
    })
  }
}
