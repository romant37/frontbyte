import { API_CALL_ALL } from 'api/apiCall'
import DictionariesService from 'modules/common/api/DictionariesService'
import { SESSION_IS_EXPIRED } from 'modules/Auth/reducers/auth'

export const DICTIONARIES_GET = 'DICTIONARIES_GET'

export const getDictionaries = () => ({
  type: DICTIONARIES_GET,
  apiCall: {
    option: API_CALL_ALL,
    request: {
      nationalities: () => DictionariesService.getNationalities(),
      ranks: () => DictionariesService.getRanks(),
    },
  },
})

export const initialState = {
  nationalities: [],
  ranks: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DICTIONARIES_GET: {
      const { data = {}, ...rest } = action.result || {}
      return {
        ...state,
        ...rest,
        ...data,
      }
    }

    case SESSION_IS_EXPIRED:
      return { ...initialState }

    default:
      return state
  }
}
