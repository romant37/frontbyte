import { call, put, all } from 'redux-saga/effects'

// Subtypes
export const REQUEST_TYPE = '_STARTED'
export const SUCCESS_TYPE = '_SUCCESS'
export const FAILURE_TYPE = '_FAILURE'

// API call types
export const API_CALL_ALL = 'API_CALL_ALL'

export default function* apiCall(action) {
  const {
    type,
    subtype,
    apiCall,
    successMessage,
    enableShowErrorMessage,
  } = action

  if (subtype || !apiCall) return null

  const requestType = `${type}${REQUEST_TYPE}`
  const successType = `${type}${SUCCESS_TYPE}`
  const failureType = `${type}${FAILURE_TYPE}`

  yield put({ type, subtype: requestType, payload: {} })

  try {
    if (typeof apiCall === 'object') {
      const { option, request } = apiCall
      // Promise.all API calls
      if (option === API_CALL_ALL) {
        const apiKeys = Object.keys(request)
        const apiValues = Object.values(request)
        const result = yield all(apiValues.map(value => call(value)))
        let payload = {}

        result.forEach(({ data }, index) => {
          payload[apiKeys[index]] = data
        })

        yield put({ type, subtype: successType, payload: { data: payload } })

        return payload
      }
    }

    // Single API call
    const { data } = yield call(apiCall)
    yield put({ type, subtype: successType, payload: { data } })

    if (successMessage) {
      // TODO: Add some UI Notification
      if (process.env.NODE_ENV === 'development') {
        console.error('Success: ', successMessage)
      }
    }

    return data
  } catch (error) {
    const { errorResult, status } = error || {}
    const { ErrorMessage } = errorResult || {}
    yield put({
      type,
      subtype: failureType,
      payload: { error: { ...errorResult, status } },
    })

    if (enableShowErrorMessage) {
      // TODO: Add some UI Notification
      if (process.env.NODE_ENV === 'development') {
        console.error('Error: ', ErrorMessage)
      }
    }

    return error
  }
}
