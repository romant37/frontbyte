import { Method, ApiResponse, ErrorResponse } from './types'
import { AuthorizationUtils } from 'utils'

const ACCEPT_HEADER_NAME = 'Accept'
const ACCEPT_HEADER_VALUE = 'application/json'
const CONTENT_TYPE_HEADER_NAME = 'Content-Type'
const CONTENT_TYPE_HEADER_VALUE = 'application/json; charset=utf-8'
const SESSION_TOKEN_HEADER = 'Ocean-SessionToken'
const API_PREFIX = '/api/ocean/v1/'

const callApi = async <T>(
  path: string,
  method: Method,
  params: any = null
): Promise<ApiResponse<T>> => {
  const address = `${API_PREFIX}${path}`
  try {
    const response = await fetch(address, {
      method,
      headers: {
        [ACCEPT_HEADER_NAME]: ACCEPT_HEADER_VALUE,
        [CONTENT_TYPE_HEADER_NAME]: CONTENT_TYPE_HEADER_VALUE,
        [SESSION_TOKEN_HEADER]: AuthorizationUtils.getSessionToken() || '',
      },
      body: params ? JSON.stringify(params) : null,
    })
    const parsedResponse = await response.json()
    const { ok, status } = response
    return {
      success: ok,
      status: status,
      content: ok ? (parsedResponse as T) : undefined,
      error: !ok ? (parsedResponse as ErrorResponse) : undefined,
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'ApiInternalError',
        details: error,
        error:
          'Unexpected error during executing or parsing api request response.',
      },
    }
  }
}

export default callApi
