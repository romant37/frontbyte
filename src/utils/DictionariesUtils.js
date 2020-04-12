class DictionariesUtils {

  getLocalizedName(data, id) {
    if (!data || data.length === 0) return id
    const dictItem = data.find(item => item.Id === id)
    return dictItem ? dictItem.Name : id
  }

}

export default new DictionariesUtils()
