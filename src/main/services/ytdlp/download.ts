import { spawn } from 'child_process'
import fs from 'fs'
import { join } from 'path'
import { store } from '../../store'
import { audioArgs } from './audio-args'
import { videoArgs } from './video-args'
import { YT_DLP } from '../binary-paths'
import { activeDownloadProcesses, cancelledDownloads } from '../procs'
import { isValidUrl } from '../../../shared/utils'

function download(url: string, directoryPath: string, callbacks: DownloadCallbacksType): void {
  const id = crypto.randomUUID()
  // Validation
  if (!isValidUrl(url)) {
    callbacks.onError(id, 'Invalid URL', url)
    return
  }

  let outTemplate: string
  try {
    if (fs.existsSync(directoryPath) && fs.statSync(directoryPath).isDirectory()) {
      outTemplate = join(directoryPath, '%(title)s.%(ext)s')
    } else {
      outTemplate = directoryPath.replace(/\.[^.]+$/, '') + '.%(ext)s'
    }
  } catch (error) {
    console.error(error)
    callbacks.onError(id, 'Invalid Directory', url)
    return
  }
  console.info(`Output Template: ${outTemplate}`)

  const cookiesFilePath = store.get('cookiesFilePath')
  if (cookiesFilePath) {
    if (!fs.existsSync(cookiesFilePath)) {
      callbacks.onError(id, 'Cookies file not found', url)
      return
    }
  }

  // Initialization
  callbacks.onInit(id)

  const type = store.get('type')
  const audioPreferences = store.get('audio')
  const videoPreferences = store.get('video')
  const args =
    type === 'audio'
      ? audioArgs(url, audioPreferences, { outTemplate, cookiesFilePath })
      : videoArgs(url, videoPreferences, { outTemplate, cookiesFilePath })
  console.info(`Args: ${args.join(' ')}`)

  const proc = spawn(YT_DLP, args, { windowsHide: true })

  activeDownloadProcesses.set(id, proc)

  const cleanup = function (): void {
    activeDownloadProcesses.delete(id)
    cancelledDownloads.delete(id)
  }

  let filePath = ''
  let name = ''

  // Start
  let nameReceived = false
  proc.stdout.on('data', function (chunk: Buffer) {
    const line = chunk.toString().split('\n', 1)[0].trim()
    if (!line) return

    console.debug(`ytdlp stdout: ${line}`)

    if (!nameReceived) {
      nameReceived = true
      name = line
      callbacks.onStart(id, name)
    } else {
      filePath = line
    }
  })

  // Download Error
  proc.stderr.on('data', function (chunk: Buffer) {
    console.error(`ytdlp stderr: ${chunk.toString()}`)
  })

  // Completed (with or without error) or Cancelled
  proc.on('close', function (code) {
    if (cancelledDownloads.has(id)) {
      console.info(`Download Cancelled: ${name}`)
      cleanup()
      callbacks.onCancel(id, name)
      return
    }

    if (code === 0) {
      console.info(`Download completed: ${name}`)
      cleanup()
      callbacks.onComplete(id, name, filePath)
    } else {
      console.error(`yt-dlp exited with code: ${code}`)
      cleanup()
      callbacks.onError(id, name, 'Something went wrong')
    }

    if (cookiesFilePath) {
      if (fs.existsSync(cookiesFilePath)) {
        fs.rmSync(cookiesFilePath, { force: true })
      }
    }
  })

  // Process Error
  proc.on('error', function (error) {
    console.error(`yt-dlp process error: ${error.message}`)
    cleanup()
    callbacks.onError(id, name, error.message)
  })
}

function cancel(id: string): void {
  const proc = activeDownloadProcesses.get(id)
  if (!proc) {
    return
  }

  cancelledDownloads.add(id)

  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', proc.pid!.toString(), '/T', '/F'])
    } else {
      proc.kill()
    }
  } catch (error) {
    console.error(`Error killing ytdlp process: ${error}`)
  }
}

export { download, cancel }
