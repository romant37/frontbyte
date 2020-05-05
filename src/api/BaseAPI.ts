import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AuthorizationUtils } from 'utils'

const API_CALL_TIMEOUT = 30000

const axiosConfig: AxiosRequestConfig = {
  baseURL: '/s10wer/Api',
  timeout: API_CALL_TIMEOUT,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
}

const API: AxiosInstance = axios.create(axiosConfig)

API.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = AuthorizationUtils.getSessionToken()
    if (token && !AuthorizationUtils.isAnonymousApiMethod(config.url)) {
      config.headers.SessionToken = token
    }
    return config
  },
  error => Promise.reject(error)
)

// normalization for axios http-errors
const castError = (error: any) => {
  const { response } = error
  const errorResult = response ? response.data : error
  const responseStatusCode = response ? response.status : error.code
  const responseStatusText = response ? response.statusText : error.message

  if (process.env.NODE_ENV !== 'production') {
    console.error('API:', errorResult) // eslint-disable-line
  }

  return {
    errorResult,
    responseStatusCode,
    responseStatusText,
  }
}

class BaseAPI {
  call({ data, method, url, params, headers, timeout, baseURL }: any) {
    const callParams = {
      method,
      url,
      params,
      timeout,
      baseURL: baseURL || API.defaults.baseURL,
      headers: {
        ...API.defaults.headers,
        ...headers,
      },
      data,
    }
    return API(callParams).catch(error => Promise.reject(castError(error)))
  }
}

export default BaseAPI
