import type { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }

  type API = {
    onUpdateAvailable: (callback: () => void) => void
    onUpdateComplete: (callback: () => void) => void
    onUpdateError: (callback: () => void) => void
    quitAndInstallUpdate: () => void
    selectFolder: () => Promise<string | null>
    startDownload: (url: string, directoryPath: string) => void
    cancelDownload: (taskId: string) => void
    onDownloadInit: (callback: (payload: DownloadInitPayload) => void) => void
    onDownloadStart: (callback: (payload: DownloadStartPayload) => void) => void
    onDownloadComplete: (callback: (payload: DownloadCompletePayload) => void) => void
    onDownloadError: (callback: (payload: DownloadErrorPayload) => void) => void
    onDownloadCancel: (callback: (payload: DownloadCancelPayload) => void) => void
    getPreferences: () => Promise<Preferences>
    setPreference: (key: string, value: unknown) => void
    openExternalUrl: (url: string) => void
    showItemInFolder: (fullPath: string) => void
    ytdlpVersion: () => Promise<string>
    ytdlpUpdate: () => Promise<{ alreadyLatest: boolean; version: string }>
    selectFile: (options?: { name: string; extensions: string[] }) => Promise<string | null>
  }
}

type DownloadInitPayload = {
  id: string
}

type DownloadStartPayload = {
  id: string
  name: string
  url: string
}

type DownloadCompletePayload = {
  id: string
  name: string
  filePath: string
}

type DownloadErrorPayload = {
  id: string
  name: string
  message: string
}

type DownloadCancelPayload = {
  id: string
  name: string
  message?: string
}
