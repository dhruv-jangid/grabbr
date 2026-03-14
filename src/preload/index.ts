import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  onUpdateAvailable(cb: () => void) {
    return ipcRenderer.on('update-available', function () {
      return cb()
    })
  },
  onUpdateComplete(cb: () => void) {
    return ipcRenderer.on('update-complete', function () {
      return cb()
    })
  },
  onUpdateError(cb: () => void) {
    return ipcRenderer.on('update-error', function () {
      return cb()
    })
  },
  quitAndInstallUpdate() {
    return ipcRenderer.send('quit-and-install-update')
  },
  selectFolder() {
    return ipcRenderer.invoke('select-folder')
  },
  startDownload(url: string, directoryPath: string) {
    return ipcRenderer.send('start-download', url, directoryPath)
  },
  cancelDownload(id: string) {
    return ipcRenderer.send('cancel-download', id)
  },
  onDownloadInit(cb: (payload: { id: string }) => void) {
    return ipcRenderer.on('download-init', function (_e, payload) {
      return cb(payload)
    })
  },
  onDownloadStart(cb: (payload: { id: string; name: string; url: string }) => void) {
    return ipcRenderer.on('download-start', function (_e, payload) {
      return cb(payload)
    })
  },
  onDownloadComplete(cb: (payload: { id: string; name: string; filePath: string }) => void) {
    return ipcRenderer.on('download-complete', function (_e, payload) {
      return cb(payload)
    })
  },
  onDownloadError(cb: (payload: { id: string; name: string; message: string }) => void) {
    return ipcRenderer.on('download-error', function (_e, payload) {
      return cb(payload)
    })
  },
  onDownloadCancel(cb: (payload: { id: string; name: string; message?: string }) => void) {
    return ipcRenderer.on('download-cancel', function (_e, payload) {
      return cb(payload)
    })
  },
  getPreferences() {
    return ipcRenderer.invoke('get-preferences')
  },
  setPreference(key: string, value: unknown) {
    return ipcRenderer.send('set-preference', key, value)
  },
  openExternalUrl(url: string) {
    return ipcRenderer.send('open-external-url', url)
  },
  showItemInFolder(fullPath: string) {
    return ipcRenderer.send('show-item-in-folder', fullPath)
  },
  ytdlpVersion() {
    return ipcRenderer.invoke('ytdlp-version')
  },
  ytdlpUpdate() {
    return ipcRenderer.invoke('ytdlp-update')
  },
  selectFile(options?: { name: string; extensions: string[] }) {
    return ipcRenderer.invoke('select-file', options)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
