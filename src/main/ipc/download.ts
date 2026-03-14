import { ipcMain } from 'electron'
import { cancelDownload, startDownload } from '../controller/download'

function registerDownloadIpc(win: Electron.BrowserWindow): void {
  ipcMain.on('start-download', function (_event, url: string, directoryPath: string) {
    startDownload(url, directoryPath, {
      onInit: function (id) {
        win.webContents.send('download-init', { id })
      },
      onStart: function (id, name) {
        win.webContents.send('download-start', { id, name, url })
      },
      onComplete: function (id, name, filePath) {
        win.webContents.send('download-complete', { id, name, filePath })
      },
      onError: function (id, name, message) {
        win.webContents.send('download-error', { id, name, message })
      },
      onCancel: function (id, name) {
        win.webContents.send('download-cancel', { id, name })
      }
    })
  })

  ipcMain.on('cancel-download', function (_event, id: string) {
    cancelDownload(id)
  })
}

export { registerDownloadIpc }
