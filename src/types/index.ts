import { AxiosPromise } from 'axios'

export type ErrorType = {
  status: number
  ErrorCode: string
}

export type DefaultPayloadType = {
  isLoading: boolean
  error: ErrorType | null | undefined
}

export type PayloadType = {
  error?: ErrorType
  data?: object
}

export type ResultType = DefaultPayloadType & {
  data?: object
}

export type APICallType = () =>
  | AxiosPromise
  | {
      option: string
      requests: {
        [key: string]: () => AxiosPromise
      }
    }

export interface ActionType<Type = any> {
  type: Type
  subtype?: string
  apiCall?: APICallType
  successMessage?: string
  enableShowErrorMessage?: boolean
  payload?: PayloadType | any
  result?: ResultType
}
