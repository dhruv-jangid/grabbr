import { ipcMain } from 'electron'
import AutoUpdater from 'electron-updater'

const { autoUpdater } = AutoUpdater

function registerUpdaterIpc(): void {
  ipcMain.on('quit-and-install-update', function () {
    autoUpdater.quitAndInstall()
  })
}

export { registerUpdaterIpc }
