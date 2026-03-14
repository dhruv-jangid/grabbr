import { store } from '../store'

function getPreferences(): Preferences {
  return store.store
}

function setPreference<K extends keyof PreferenceMap>(key: K, value: PreferenceMap[K]): void {
  store.set(key, value)
}

export { getPreferences, setPreference }
