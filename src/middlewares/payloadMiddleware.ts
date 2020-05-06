import { MiddlewareAPI, Dispatch } from 'redux'
import { endsWith } from 'lodash'
import { AuthorizationUtils } from 'utils'
import { REQUEST_TYPE, SUCCESS_TYPE, FAILURE_TYPE } from 'api/apiCall'
import { APIActionType } from 'api/types'
import { sessionIsExpired } from 'modules/Auth/reducers/auth'

const DEFAULT_PAYLOAD = {
  isLoading: false,
  error: null,
}

const payloadMiddleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => (
  action: APIActionType
) => {
  const { error, data = {} } = action.payload || {}

  if (error) {
    const { ErrorCode, status } = error
    if (
      ErrorCode === 'InvalidSessionToken' ||
      ErrorCode === 'MissingSessionIdentifier' ||
      status === 401
    ) {
      AuthorizationUtils.redirectToLoginForm()
      dispatch(sessionIsExpired('Session expired'))
    }
  }

  if (!action.subtype) {
    return next(action)
  }

  if (endsWith(action.subtype, REQUEST_TYPE)) {
    action.result = {
      ...DEFAULT_PAYLOAD,
      isLoading: true,
    }
  }

  if (endsWith(action.subtype, FAILURE_TYPE)) {
    action.result = {
      ...DEFAULT_PAYLOAD,
      error,
    }
  }

  if (endsWith(action.subtype, SUCCESS_TYPE)) {
    action.result = {
      data,
      ...DEFAULT_PAYLOAD,
    }
  }

  return next(action)
}

export default payloadMiddleware
