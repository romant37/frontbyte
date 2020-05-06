type DictItem = {
  Id: string | number
  Name: string
}

class DictionariesUtils {
  getLocalizedName(data: DictItem[], id: string | number) {
    if (!data || data.length === 0) return id
    const dictItem = data.find((item: DictItem) => item.Id === id)
    return dictItem ? dictItem.Name : id
  }
}

export default new DictionariesUtils()
