import produce from 'immer'
import AuthService from 'modules/Auth/api/AuthService'
import { DefaultPayloadType } from 'middlewares'
import {
  ActionsType,
  LoginParamsType,
  LoginPayloadType,
  InitialStateType,
} from '../types'
import { SESSION_IS_EXPIRED } from 'types'

export const SIGN_IN_USER = 'SIGN_IN_USER'
export const LOG_OUT_USER = 'LOG_OUT_USER'
export const KEEP_ALIVE = 'KEEP_ALIVE'

export const login = (params: LoginParamsType): ActionsType => ({
  type: SIGN_IN_USER,
  apiCall: () => AuthService.login(params),
})

export const logout = (): ActionsType => ({
  type: LOG_OUT_USER,
  apiCall: () => AuthService.logout(),
})

export const keepAlive = (): ActionsType => ({
  type: KEEP_ALIVE,
  apiCall: () => AuthService.keepAlive(),
})

export const sessionIsExpired = (): ActionsType => ({
  type: SESSION_IS_EXPIRED,
})

export const initialState = {
  loggedIn: {} as (LoginPayloadType & DefaultPayloadType) | {},
}

export default produce((draft: InitialStateType, action: ActionsType) => {
  switch (action.type) {
    case SIGN_IN_USER:
      draft.loggedIn = {
        ...action.payload?.data,
        ...action.result,
      }
      break

    case SESSION_IS_EXPIRED:
    case LOG_OUT_USER:
      return initialState
  }
}, initialState)
