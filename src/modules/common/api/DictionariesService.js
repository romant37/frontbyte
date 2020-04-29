import { BaseAPI } from 'api'

class DictionariesService extends BaseAPI {
  getNationalities() {
    return this.call({
      method: 'GET',
      url: '/Data/ListNationalities',
    })
  }

  getRanks() {
    return this.call({
      method: 'GET',
      url: '/Data/ListRanks',
    })
  }
}

export default new DictionariesService()
