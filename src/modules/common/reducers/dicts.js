import produce from 'immer'
import DictionariesService from 'modules/common/api/DictionariesService'
import { SESSION_IS_EXPIRED } from 'types'
import { ActionsType, InitialStateType } from '../../Auth/types'

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

export default produce((draft, action) => {
  switch (action.type) {
    case DICTIONARIES_GET_NATIONALITIES:
      draft.nationalities = {
        ...action.payload,
        ...action.result,
      }
      break

    case DICTIONARIES_GET_RANKS:
      draft.ranks = {
        ...action.payload,
        ...action.result,
      }
      break

    case SESSION_IS_EXPIRED:
      return initialState
  }
}, initialState)
