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
      const { status } = data
      if (status === 'SUCCESS') {
        const { result } = data
        dispatch({ type, subtype: successType, payload: { result }, params })
        if (successMessage) {
          console.log('successMessage: ', successMessage) // eslint-disable-line
        }

      } else if (status === 'ERROR') {
        const { applicationError } = data

        // Hide console log in production mode MPSC-3058
        if (process.env.NODE_ENV !== 'production') {
          console.error(type, 'application error:', applicationError) // eslint-disable-line
        }

        dispatch({ type, subtype: failureType, payload: { error: applicationError }, params })
        if (enableShowErrorMessage) {
          console.log('enableShowErrorMessage: ', enableShowErrorMessage) // eslint-disable-line
        }

      } else if (status === 'VALIDATION_ERROR') {
        const { validationErrors } = data
        dispatch({ type, subtype: failureType, payload: { error: status, validationErrors }, params })

      } else {
        dispatch({ type, subtype: failureType, payload: { error: `UNKNOWN STATUS: ${status}` }, params })
      }

      return data // allow to handle .then() on action creators if exists
    })
    .catch(error => {
      dispatch({ type, subtype: failureType, payload: { error: error }, params })
      return error // allow to handle .catch() on action creators if exists
    })
}

export default apiCallMiddleware
