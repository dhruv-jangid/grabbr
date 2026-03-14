import { get } from 'https'
import { join } from 'path'
import { tmpdir, platform } from 'os'
import AdmZip from 'adm-zip'
import { createWriteStream } from 'fs'
import { mkdir, rm, chmod } from 'fs/promises'

const BIN_DIR = 'resources/bin'

type Platform = 'win32' | 'darwin' | 'linux'

const download = async function (url: string, dest: string): Promise<void> {
  await mkdir(BIN_DIR, { recursive: true })

  return new Promise(function (resolve, reject) {
    console.log(`Downloading ${url}`)
    const file = createWriteStream(dest)

    const doRequest = function (link: string): void {
      get(link, function (res) {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          doRequest(res.headers.location)
          return
        }

        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download: ${link} (status ${res.statusCode})`))
          return
        }

        res.pipe(file)
        file.on('finish', function () {
          file.close()
          resolve()
        })
      }).on('error', reject)
    }

    doRequest(url)
  })
}

const downloadYtDlp = async function (os: Platform): Promise<void> {
  const urls: Record<Platform, string> = {
    win32: 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe',
    darwin: 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos',
    linux: 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux'
  }

  const filenames: Record<Platform, string> = {
    win32: 'yt-dlp.exe',
    darwin: 'yt-dlp',
    linux: 'yt-dlp'
  }

  const dest = join(BIN_DIR, filenames[os])
  await download(urls[os], dest)

  if (os !== 'win32') {
    await chmod(dest, 0o755)
  }
}

const downloadFFmpeg = async function (os: Platform): Promise<void> {
  const urls: Record<Platform, string> = {
    win32:
      'https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip',
    linux:
      'https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz',
    darwin: 'https://evermeet.cx/ffmpeg/getrelease/zip' // no macOS from yt-dlp builds
  }

  if (os === 'win32') {
    const tmpZip = join(tmpdir(), 'ffmpeg.zip')
    await download(urls.win32, tmpZip)

    console.log('Extracting ffmpeg & ffprobe')
    const zip = new AdmZip(tmpZip)
    const entries = zip.getEntries()

    for (const name of ['ffmpeg.exe', 'ffprobe.exe']) {
      const entry = entries.find(function (e) {
        return e.entryName.endsWith(`/bin/${name}`)
      })
      if (entry) {
        zip.extractEntryTo(entry.entryName, BIN_DIR, false, true)
        console.log(`Extracted ${name}`)
      }
    }

    await rm(tmpZip)
  } else if (os === 'linux') {
    const tmpFile = join(tmpdir(), 'ffmpeg.tar.xz')
    await download(urls.linux, tmpFile)

    console.log('Extracting ffmpeg & ffprobe')
    const { execSync } = await import('child_process')
    const extractDir = join(tmpdir(), 'ffmpeg-extract')
    await mkdir(extractDir, { recursive: true })

    execSync(`tar -xf "${tmpFile}" -C "${extractDir}"`)

    const { readdirSync, copyFileSync } = await import('fs')

    const findBinary = function (dir: string, name: string): string | null {
      const files = readdirSync(dir, { withFileTypes: true })
      for (const file of files) {
        const fullPath = join(dir, file.name)
        if (file.isFile() && file.name === name) return fullPath
        if (file.isDirectory()) {
          const found = findBinary(fullPath, name)
          if (found) return found
        }
      }
      return null
    }

    for (const name of ['ffmpeg', 'ffprobe']) {
      const srcPath = findBinary(extractDir, name)
      if (srcPath) {
        const destPath = join(BIN_DIR, name)
        copyFileSync(srcPath, destPath)
        await chmod(destPath, 0o755)
        console.log(`Extracted ${name}`)
      }
    }

    await rm(tmpFile)
    await rm(extractDir, { recursive: true })
  } else {
    // darwin - yt-dlp has no macOS builds, evermeet is the standard fallback
    const tmpZip = join(tmpdir(), 'ffmpeg.zip')
    await download(urls.darwin, tmpZip)

    const zip = new AdmZip(tmpZip)
    zip.extractEntryTo('ffmpeg', BIN_DIR, false, true)
    await chmod(join(BIN_DIR, 'ffmpeg'), 0o755)
    console.log('Extracted ffmpeg')
    await rm(tmpZip)

    const tmpProbeZip = join(tmpdir(), 'ffprobe.zip')
    await download('https://evermeet.cx/ffmpeg/getrelease/ffprobe/zip', tmpProbeZip)
    const probeZip = new AdmZip(tmpProbeZip)
    probeZip.extractEntryTo('ffprobe', BIN_DIR, false, true)
    await chmod(join(BIN_DIR, 'ffprobe'), 0o755)
    console.log('Extracted ffprobe')
    await rm(tmpProbeZip)
  }
}

const main = async function (): Promise<void> {
  const os = platform() as Platform

  if (!['win32', 'darwin', 'linux'].includes(os)) {
    throw new Error(`Unsupported platform: ${os}`)
  }

  console.log(`Detected platform: ${os}`)

  await rm(BIN_DIR, { recursive: true, force: true })
  await mkdir(BIN_DIR, { recursive: true })

  await downloadYtDlp(os)
  await downloadFFmpeg(os)
  console.log('All binaries downloaded into', BIN_DIR)
}

main().catch(function (err) {
  console.error('❌ Error:', err)
  process.exit(1)
})
