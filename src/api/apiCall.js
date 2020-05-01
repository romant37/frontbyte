import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'

export const REQUEST_TYPE = '_STARTED'
export const SUCCESS_TYPE = '_SUCCESS'
export const FAILURE_TYPE = '_FAILURE'

export default function* apiCall(action) {
  const {
    type,
    subtype,
    apiCall,
    successMessage,
    params,
    enableShowErrorMessage,
  } = action

  if (subtype || !apiCall) return null

  const requestType = `${type}${REQUEST_TYPE}`
  const successType = `${type}${SUCCESS_TYPE}`
  const failureType = `${type}${FAILURE_TYPE}`

  yield put({ type, subtype: requestType, payload: {}, params })

  try {
    const { data } = yield call(apiCall)
    yield put({ type, subtype: successType, payload: { data } })

    if (successMessage) {
      notification['success']({
        message: 'Success',
        description: successMessage,
      })
    }

    return data
  } catch (error) {
    const { errorResult, status } = error || {}
    const { ErrorMessage } = errorResult || {}
    yield put({
      type,
      subtype: failureType,
      payload: { error: { ...errorResult, status } },
      params,
    })

    if (enableShowErrorMessage) {
      notification['error']({
        message: 'Error',
        description: ErrorMessage,
      })
    }

    return error
  }
}
