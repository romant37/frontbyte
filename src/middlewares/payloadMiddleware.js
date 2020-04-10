import { endsWith, isArray } from 'lodash'
import { AuthorizationUtils } from 'utils'
import { sessionIsExpired, SIGN_IN_USER, LOG_OUT_USER } from 'modules/Auth/reducers/auth'
import { REQUEST_TYPE, SUCCESS_TYPE, FAILURE_TYPE } from './apiCallMiddleware'

const defaultPayload = {
  isLoading: false,
  error: null,
}

const payloadMiddleware = ({ dispatch }) => next => action => {
  const { result, error, params } = action.payload || {}

  if (action.type !== SIGN_IN_USER && action.type !== LOG_OUT_USER) {
    AuthorizationUtils.checkSessionToken()
    const token = AuthorizationUtils.getSessionToken()
    if (!token) {
      dispatch(sessionIsExpired('Session expired'))
    }
  }

  if (!action.subtype) {
    return next(action)
  }

  if (endsWith(action.subtype, REQUEST_TYPE)) {
    action.result = {
      ...defaultPayload,
      isLoading: true,
    }
  }
  if (endsWith(action.subtype, FAILURE_TYPE)) {
    action.result = {
      ...defaultPayload,
      error,
      params,
    }
  }
  if (endsWith(action.subtype, SUCCESS_TYPE)) {
    if (isArray(action.payload.result)) {
      action.result = {
        ...defaultPayload,
        data: action.payload.result,
      }
    } else {
      action.result = {
        ...result,
        ...defaultPayload,
      }
    }
  }

  return next(action)
}

export default payloadMiddleware
