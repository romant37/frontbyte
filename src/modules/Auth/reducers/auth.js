import AuthService from 'modules/Auth/api/AuthService'

export const SIGNIN_USER = 'SIGNIN_USER'
export const REQUEST_STARTED = 'REQUEST_STARTED'
export const REQUEST_FINISHED = 'REQUEST_FINISHED'

export const login = params => dispatch => {
  dispatch({ type: REQUEST_STARTED })
  dispatch({
    apiCall: () => AuthService.login(params),
    type: SIGNIN_USER,
  })
  .then(response => {
    const { result, status } = response || {}
    console.log('result: ', result) // eslint-disable-line
    console.log('status: ', status) // eslint-disable-line
    console.log('response: ', response)
    // if (status === 'SUCCESS') {
    //   dispatch(storeSession(result))
    // }
    dispatch({ type: REQUEST_FINISHED })
    return response
  })
}


export const initialState = {
  user: {},
  request: {},
}


export default (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_STARTED:
      return {
        ...state,
        request: {
          isLoading: true,
        },
      }

    case REQUEST_FINISHED:
      return {
        ...state,
        request: {
          isLoading: false,
        },
      }

    case SIGNIN_USER:
      return {
        ...state,
        user: {
          ...action.payload.data,
          ...action.result,
        },
      }

    default:
      return state
  }
}
