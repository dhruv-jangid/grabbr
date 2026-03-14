import { dialog, ipcMain, shell } from 'electron'
import fs from 'fs'

function registerDialogIpc(win: Electron.BrowserWindow): void {
  ipcMain.handle('select-folder', async function () {
    console.info('Opening dialog to select folder')
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
      title: 'Select Folder'
    })

    if (!canceled && filePaths.length > 0) {
      console.info(`Selected folder: ${filePaths[0]}`)
      return filePaths[0]
    } else {
      console.info('Folder selection cancelled')
      return null
    }
  })

  ipcMain.handle(
    'select-file',
    async function (_event, options?: { name: string; extensions: string[] }) {
      console.info('Opening dialog to select file')
      const { canceled, filePaths } = await dialog.showOpenDialog(win, {
        properties: ['openFile'],
        title: 'Select File',
        filters: [
          {
            name: options?.name ? options.name : 'All Files',
            extensions: options?.extensions ? options.extensions : ['*']
          }
        ]
      })

      if (!canceled && filePaths.length > 0) {
        console.info(`Selected file: ${filePaths[0]}`)
        return filePaths[0]
      } else {
        console.info('File selection cancelled')
        return null
      }
    }
  )

  ipcMain.on('show-item-in-folder', function (_event, filePath: string) {
    if (fs.existsSync(filePath)) {
      console.info(`Showing item in folder: ${filePath}`)
      shell.showItemInFolder(filePath)
    } else {
      console.error(`Invalid filepath to show in folder`)
      dialog.showErrorBox('File Not Found', 'The downloaded file was not found.')
    }
  })

  ipcMain.on('open-external-url', function (_event, url: string) {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      console.info(`Opening external url: ${url}`)
      shell.openExternal(url)
    } else {
      console.error('Invalid external url to open')
    }
  })
}

export { registerDialogIpc }
