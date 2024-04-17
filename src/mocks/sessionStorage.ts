export class SessionStorageMap<Key, Value> extends Map<Key, Value> {
  constructor() {
    super()
    const sessionData = JSON.parse(sessionStorage.getItem('data') || '[]') as [
      Key,
      Value
    ][]
    if (sessionData) {
      sessionData.forEach(([key, value]) => {
        this.set(key, value)
      })
    }
  }

  set(key: Key, value: Value) {
    super.set(key, value)
    sessionStorage.setItem('data', JSON.stringify(Array.from(this.entries())))
    return this
  }

  delete(key: Key) {
    const isDeleted = super.delete(key)
    if (isDeleted) {
      sessionStorage.setItem('data', JSON.stringify(Array.from(this.entries())))
    }
    return isDeleted
  }
}
