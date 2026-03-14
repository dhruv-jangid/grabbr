import { registerDialogIpc } from './dialog'
import { registerDownloadIpc } from './download'
import { registerPreferencesIpc } from './preferences'
import { registerUpdaterIpc } from './updater'
import { registerYtdlpIpc } from './ytdlp'

function registerIpc(win: Electron.BrowserWindow): void {
  registerUpdaterIpc()
  registerPreferencesIpc()
  registerDialogIpc(win)
  registerDownloadIpc(win)
  registerYtdlpIpc()
}

export { registerIpc }
