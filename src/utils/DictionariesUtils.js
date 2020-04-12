class DictionariesUtils {

  getNationalityName(data, id) {
    if (!data || data.length === 0) return id
    const nationality = data.find(item => item.Id === id)
    return nationality ? nationality.Name : id
  }

}

export default new DictionariesUtils()
