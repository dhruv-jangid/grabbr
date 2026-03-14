import AutoUpdater from 'electron-updater'

const { autoUpdater } = AutoUpdater

function setupUpdater(win: Electron.BrowserWindow): void {
  autoUpdater.on('update-available', function () {
    win.webContents.send('update-available')
  })

  autoUpdater.on('update-downloaded', function () {
    win.webContents.send('update-complete')
  })

  autoUpdater.on('error', function () {
    win.webContents.send('update-error')
  })

  autoUpdater.checkForUpdatesAndNotify()
}

export { setupUpdater }
