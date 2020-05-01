import DictionariesService from 'modules/common/api/DictionariesService'
import { SESSION_IS_EXPIRED } from 'modules/Auth/reducers/auth'

export const DICTIONARIES_GET_NATIONALITIES = 'DICTIONARIES_GET_NATIONALITIES'
export const DICTIONARIES_GET_RANKS = 'DICTIONARIES_GET_RANKS'

export const getNationalities = () => ({
  type: DICTIONARIES_GET_NATIONALITIES,
  apiCall: () => DictionariesService.getNationalities(),
})

export const getRanks = () => ({
  type: DICTIONARIES_GET_RANKS,
  apiCall: () => DictionariesService.getRanks(),
})

export const initialState = {
  nationalities: {},
  ranks: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DICTIONARIES_GET_NATIONALITIES:
      return {
        ...state,
        nationalities: {
          ...action.payload,
          ...action.result,
        },
      }

    case DICTIONARIES_GET_RANKS:
      return {
        ...state,
        ranks: {
          ...action.payload,
          ...action.result,
        },
      }

    case SESSION_IS_EXPIRED:
      return { ...initialState }

    default:
      return state
  }
}
