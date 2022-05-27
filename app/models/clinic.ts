import { LowSync, JSONFileSync } from 'lowdb'

/**
 * Clinic
 */
export interface Clinic {
  id: string
  name: string | undefined
  city: string | undefined
}

/**
 * Data
 */
export interface Data {
  clinics: Clinic[]
}
/**
 * Maybe of type T
 */
export type Maybe<T> = T | undefined

const adapter = new JSONFileSync<Data>('store/clinic.json')
const store = new LowSync(adapter)

store.read()

if (store.data === null) {
  store.data = {
    clinics: []
  }
}

export const formToClinic = (formData: FormData): Clinic => {
  const id = () => {
    const randomId = () => Math.floor(Math.random() * Date.now() * 1000).toString(36)
    const _id = formData.get("id")?.toString()
    if(_id) {
      return _id
    }
    return randomId()
  }
  return {
    id: id(),
    name: formData.get("name")?.toString(),
    city: formData.get("city")?.toString()
  }
};

export const all = () => {
  return store.data?.clinics || []
}

export const find = (id: string): Maybe<Clinic> => {
  return store.data?.clinics.find(c => {
    return c.id === id
  })
}

export const save = (clinic: Clinic) => {
  store.data?.clinics.push(clinic)
  store.write()
  return clinic
}

export const update = (clinic: Clinic) => {
  const clinics = store.data?.clinics.map(_clinic => {
    if (clinic.id === _clinic.id) {
      return clinic
    }
    return _clinic
  }) || []
  store.data = { clinics }
  store.write()
  return clinic
}