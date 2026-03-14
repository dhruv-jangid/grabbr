import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Folder01Icon, LinkSquare02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { usePreferences } from '../providers/preferences'

function ExperimentalTab(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { cookiesFilePath } = preferences

  async function chooseCookiesFilePath(): Promise<void> {
    try {
      const selectedFilePath = await window.api.selectFile({
        name: 'Text File',
        extensions: ['txt']
      })
      if (selectedFilePath) {
        updatePreference('cookiesFilePath', selectedFilePath)
        toast.warning('Cookies File Selected', { richColors: true })
      }
    } catch {
      toast.error('Failed to select cookies directory')
    }
  }

  async function removeCookiesFilePath(): Promise<void> {
    updatePreference('cookiesFilePath', '')
  }

  function openLink(url: string): void {
    try {
      window.api.openExternalUrl(url)
    } catch {
      toast.error('Failed to open link')
    }
  }

  return (
    <Card className="h-full">
      <CardContent className="grid gap-6">
        <div className="text-sm space-y-6">
          <div className="space-y-3 text-muted-foreground w-lg">
            <p className="text-base text-destructive">
              Note: If you&apos;re not an advanced user, please avoid using this feature. It&apos;s
              just a few hours of waiting, your patience won&apos;t kill you but messing with
              cookies might kill your YouTube account.
            </p>
            <p>
              If downloads fail due to rate limits, you can use your own cookies file as an
              alternative. However, please avoid sending excessive requests, as this may result in
              your account being suspended or banned. To use your own cookies, extract them from
              www.youtube.com using a browser extension, then select the folder containing your
              cookies.txt file.
            </p>
            <p>
              Please note that YouTube rotates cookies periodically, so a single cookie file
              won&apos;t work indefinitely. Do not share your cookies file with anyone, as it
              contains sensitive account information. For your safety and security, the cookies.txt
              file will be automatically deleted after each download.
            </p>
          </div>
          <div className="flex gap-6">
            <span
              className="flex items-center gap-1.5 hover:underline underline-offset-6 decoration-muted-foreground cursor-pointer"
              onClick={function () {
                openLink(
                  'https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc'
                )
              }}
            >
              <HugeiconsIcon icon={LinkSquare02Icon} size={18} /> Extension for Chrome
            </span>
            <span
              className="flex items-center gap-1.5 hover:underline underline-offset-6 decoration-muted-foreground cursor-pointer"
              onClick={function () {
                openLink('https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/')
              }}
            >
              <HugeiconsIcon icon={LinkSquare02Icon} size={18} /> Extension for Firefox
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="ml-0.5">Cookies Directory</span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="w-fit"
              onClick={!cookiesFilePath ? chooseCookiesFilePath : removeCookiesFilePath}
            >
              <HugeiconsIcon icon={Folder01Icon} className="mr-0.5" />
              {!cookiesFilePath ? 'Select' : 'Remove'}
            </Button>
            <span className="text-xs">{cookiesFilePath}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { ExperimentalTab }
