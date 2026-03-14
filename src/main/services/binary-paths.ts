import path from 'path'
import { app } from 'electron'

function getBundledBinary(name: string): string {
  if (!app.isPackaged) {
    return path.join(__dirname, '../../resources/bin', name)
  } else {
    return path.join(process.resourcesPath, 'app.asar.unpacked/resources/bin', name)
  }
}

const isWindows = process.platform === 'win32'
const YT_DLP = getBundledBinary(isWindows ? 'yt-dlp.exe' : 'yt-dlp')
const FFMPEG = getBundledBinary(isWindows ? 'ffmpeg.exe' : 'ffmpeg')
console.info(`yt-dlp path: ${YT_DLP}`)
console.info(`ffmpeg path: ${FFMPEG}`)

export { YT_DLP, FFMPEG }
