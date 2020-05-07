import getConfigValue from 'config/clientCofigurtaionProvider'
import callApi from './api'

export const useGet = <T>(path: string) => {
  return callApi<T>(createApiEndpoint(path), 'GET')
}

export const usePost = <T>(path: string, params: any) => {
  return callApi<T>(createApiEndpoint(path), 'POST', params)
}

export const usePut = <T>(path: string, params: any) => {
  return callApi<T>(createApiEndpoint(path), 'PUT', params)
}

export const useDelete = <T>(path: string, params: any) => {
  return callApi<T>(createApiEndpoint(path), 'DELETE', params)
}

const createApiEndpoint = (address: string) => {
  const apiBaseAddress = getConfigValue('apiBaseAddress')
  return `${apiBaseAddress}${address}`
}
