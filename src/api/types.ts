import { Action } from 'redux'

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

export type APICallType = () => void | {
  option: string
  requests: {
    [key: string]: () => void
  }
}

export type APIActionType = Action & {
  subtype?: string
  apiCall?: APICallType
  successMessage?: string
  enableShowErrorMessage?: boolean
  payload?: PayloadType
  result?: ResultType
}
