type DefaultPayloadErrorType = {
  ErrorMessage?: string
  ErrorCode?: string
  ErrorContent?: string
  responseStatusCode: number
}

export type DefaultPayloadType = {
  isLoading: boolean
  error?: DefaultPayloadErrorType | string | null
}

export type actionType<
  Type,
  PayloadType = undefined,
  ParamsType = undefined
> = {
  type: Type
  subtype?: string
  apiCall?: () => void
  successMessage?: string
  params?: ParamsType
  enableShowErrorMessage?: boolean
  payload?: { data?: PayloadType; error?: DefaultPayloadErrorType }
  result?: DefaultPayloadType
}
