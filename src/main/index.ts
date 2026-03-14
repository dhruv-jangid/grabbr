import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../build/icon.png?asset'
import { setupUpdater } from './updater'
import { registerIpc } from './ipc'
import { activeDownloadProcesses } from './services/procs'

function createWindow(): Electron.BrowserWindow {
  console.info('Creating main window')
  const mainWindow = new BrowserWindow({
    width: 950,
    height: 670,
    show: false,
    minWidth: 950,
    minHeight: 670,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      devTools: is.dev
    }
  })

  mainWindow.on('ready-to-show', function () {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler(function (details) {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(function () {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.grabbr')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', function (_, window) {
    optimizer.watchWindowShortcuts(window)
  })

  const mainWindow = createWindow()

  setupUpdater(mainWindow)
  registerIpc(mainWindow)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', function () {
  for (const [, proc] of activeDownloadProcesses) {
    try {
      proc.kill('SIGTERM')
    } catch (error) {
      console.error(error)
    }
  }
})
