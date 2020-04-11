import { notification } from 'antd'

export const REQUEST_TYPE = '_STARTED'
export const SUCCESS_TYPE = '_SUCCESS'
export const FAILURE_TYPE = '_FAILURE'

const apiCallMiddleware = ({ dispatch, getState }) => next => action => {
  const { type, apiCall, shouldCallAPI, successMessage, params, enableShowErrorMessage } = action

  // Normal action: pass it on
  if (!apiCall) {
    return next(action)
  }

  // mechanism for caching || preventing duplicate requests
  if (shouldCallAPI && !shouldCallAPI(getState())) {
    return null
  }

  const requestType = `${type}${REQUEST_TYPE}`
  const successType = `${type}${SUCCESS_TYPE}`
  const failureType = `${type}${FAILURE_TYPE}`

  dispatch({ type, subtype: requestType, payload: {}, params }) // isLoading

  return apiCall()
    .then(({ data }) => {
      dispatch({ type, subtype: successType, payload: { data }, params })

      if (successMessage) {
        notification['error']({
          message: 'Success',
          description: successMessage,
        })
      }

      return data // allow to handle .then() on action creators if exists
    })
    .catch(error => {
      const { errorResult, status } = error || {}
      const { ErrorMessage } = errorResult || {}
      dispatch({ type, subtype: failureType, payload: { error: { ...errorResult, status } }, params })

      if (enableShowErrorMessage) {
        notification['error']({
          message: 'Error',
          description: ErrorMessage,
        })
      }

      return error // allow to handle .catch() on action creators if exists
    })
}

export default apiCallMiddleware
