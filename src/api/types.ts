export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATH'

export type ErrorResponse = {
  code: string
  error: string
  details: any
}

export type ApiResponse<T> = {
  status?: number
  success: boolean
  content?: T
  error?: ErrorResponse
}
