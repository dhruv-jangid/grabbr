import { cancel, download } from '../services/ytdlp/download'

function startDownload(url: string, directoryPath: string, callbacks: DownloadCallbacksType): void {
  download(url, directoryPath, callbacks)
}

function cancelDownload(id: string): void {
  cancel(id)
}

export { startDownload, cancelDownload }
