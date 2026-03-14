import { exec } from 'node:child_process'
import { YT_DLP } from '../binary-paths'

async function update(): Promise<{ alreadyLatest: boolean; version: string }> {
  console.info('Starting yt-dlp update...')

  return new Promise(function (resolve, reject) {
    exec(
      `"${YT_DLP}" --update`,
      { encoding: 'utf-8', windowsHide: true },
      async function (error, stdout, stderr) {
        if (error) {
          console.error(error)
          return reject(error)
        }
        if (stderr) {
          console.error(`ytdlp stderr: ${stderr}`)
          return reject(new Error(stderr))
        }

        const alreadyLatest = /is up to date/i.test(stdout)
        const version = await getVersion()

        resolve({ alreadyLatest, version })
      }
    )
  })
}

async function getVersion(): Promise<string> {
  return new Promise(function (resolve, reject) {
    exec(
      `"${YT_DLP}" --version`,
      { encoding: 'utf-8', windowsHide: true },
      function (error, stdout, stderr) {
        if (error) {
          console.error(error)
          return reject(error)
        }
        if (stderr) {
          console.error(`ytdlp stderr: ${stderr}`)
          return reject(new Error(stderr))
        }

        resolve(stdout)
      }
    )
  })
}

export { update, getVersion }
