import { ipcMain } from 'electron'
import { getPreferences, setPreference } from '../controller/preferences'

function registerPreferencesIpc(): void {
  ipcMain.handle('get-preferences', function () {
    return getPreferences()
  })

  ipcMain.on('set-preference', function <
    K extends keyof PreferenceMap
  >(_event: Electron.IpcMainEvent, key: K, value: PreferenceMap[K]) {
    setPreference(key, value)
  })
}

export { registerPreferencesIpc }
