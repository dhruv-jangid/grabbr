import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { ReloadIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useEffect, useState } from 'react'
import { Spinner } from '../ui/spinner'

const YTDLP_VERSION_KEY = 'ytdlp-version'

function UpdatesTab(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const [ytdlpVersion, setYtdlpVersion] = useState<string>(function () {
    return localStorage.getItem(YTDLP_VERSION_KEY) ?? '...'
  })

  useEffect(function () {
    async function getYtdlpVersion(): Promise<void> {
      try {
        const version = await window.api.ytdlpVersion()
        setYtdlpVersion(version)
        localStorage.setItem(YTDLP_VERSION_KEY, version)
      } catch (error) {
        console.error(error)
      }
    }

    if (!localStorage.getItem(YTDLP_VERSION_KEY)) {
      void getYtdlpVersion()
    }
  }, [])

  async function updateYtdlp(): Promise<void> {
    setIsLoading(true)
    try {
      const { version, alreadyLatest } = await window.api.ytdlpUpdate()
      setYtdlpVersion(version)
      localStorage.setItem(YTDLP_VERSION_KEY, version)

      if (alreadyLatest) {
        toast.info('yt-dlp is already up to date', { id: 'ytdlp-update' })
      } else {
        toast.success(`yt-dlp updated to ${version}`, { id: 'ytdlp-update' })
      }
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : 'Something went wrong', {
        id: 'ytdlp-update',
        richColors: true
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-full">
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <div className="ml-0.5 text-base">yt-dlp</div>
          <ul className="list-disc ml-6">
            <li>Sources: YouTube, Instagram</li>
            <li>Version: {ytdlpVersion}</li>
          </ul>
          <Button className="mt-2" size="sm" onClick={updateYtdlp} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner data-icon="inline-start" />
                Updating...
              </>
            ) : (
              <>
                <HugeiconsIcon icon={ReloadIcon} />
                Update
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { UpdatesTab }
