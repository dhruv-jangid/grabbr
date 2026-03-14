import { toast } from 'sonner'
import { Download } from '@hugeicons/core-free-icons'
import { useState } from 'react'
import { Options } from '@renderer/components/options'
import { Button } from '@renderer/components/ui/button'
import { InputUrl } from '@renderer/components/input-url'
import { usePreferences } from '@renderer/components/providers/preferences'
import { HugeiconsIcon } from '@hugeicons/react'
import { Type } from './components/type'
import { useIpc } from './components/use-ipc'
import { isValidUrl } from '../../shared/utils'

function App(): React.JSX.Element {
  const [url, setUrl] = useState('')
  const { preferences, prefLoading } = usePreferences()

  useIpc()

  async function startDownload(): Promise<void> {
    const normalizedUrl = url.trim()
    if (!isValidUrl(normalizedUrl)) {
      toast.warning('Invalid URL', { richColors: true })
      return
    }

    try {
      let directoryPath: string | null = null
      const { downloadMode, downloadDirectory } = preferences
      switch (downloadMode) {
        case 'ask': {
          const selectedPath = await window.api.selectFolder()
          if (!selectedPath) {
            return
          } else {
            directoryPath = `${selectedPath}/%(title)s.%(ext)s`
          }
          break
        }

        case 'select': {
          if (!downloadDirectory) {
            toast.error('Download location not set', { richColors: true })
            return
          } else {
            directoryPath = `${downloadDirectory}/%(title)s.%(ext)s`
          }
        }
      }

      if (!directoryPath) {
        toast.error('Please select a download folder first', { richColors: true })
        return
      }

      window.api.startDownload(normalizedUrl, directoryPath)
      setUrl('')
    } catch {
      toast.error('Something went wrong in a download', { richColors: true })
    }
  }

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div className="space-y-2 w-xs sm:w-xl md:w-2xl">
        <InputUrl url={url} setUrl={setUrl} />
        {prefLoading ? (
          <div className="text-sm text-center text-muted-foreground mt-2">
            Loading preferences...
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <Type />
              <Options />
            </div>
            <Button disabled={!isValidUrl(url.trim())} onClick={startDownload}>
              <HugeiconsIcon icon={Download} /> Download
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
