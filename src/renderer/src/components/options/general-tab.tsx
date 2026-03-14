import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { Card, CardContent } from '../ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import {
  HelpCircleIcon,
  Folder01Icon,
  ComputerIcon,
  Sun03Icon,
  Moon02Icon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { usePreferences } from '../providers/preferences'

function GeneralTab(): React.JSX.Element {
  const { theme, setTheme } = useTheme()
  const { preferences, updatePreference } = usePreferences()
  const { downloadMode, downloadDirectory } = preferences

  async function selectDownloadDirectory(): Promise<void> {
    try {
      const selectedPath = await window.api.selectFolder()
      if (selectedPath) {
        updatePreference('downloadDirectory', selectedPath)
        toast.success('Download Location Selected')
      } else if (!downloadDirectory) {
        updatePreference('downloadMode', 'ask')
      }
    } catch {
      toast.error('Failed to select download location')
      updatePreference('downloadMode', 'ask')
    }
  }

  return (
    <Card className="h-full">
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <div className="font-medium">Theme</div>
          <ToggleGroup
            value={[theme!]}
            onValueChange={function (value) {
              setTheme(value[0])
            }}
          >
            <ToggleGroupItem value="system">
              <HugeiconsIcon icon={ComputerIcon} className="mr-0.5 size-3.5" /> System
            </ToggleGroupItem>
            <ToggleGroupItem value="light">
              <HugeiconsIcon icon={Sun03Icon} /> Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark">
              <HugeiconsIcon icon={Moon02Icon} className="size-3.5" /> Dark
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-1">
          <div className="font-medium">Download Directory</div>
          <div className="flex items-center gap-2">
            <ToggleGroup
              value={[downloadMode]}
              onValueChange={function (value) {
                updatePreference('downloadMode', value[0] as any)
              }}
            >
              <ToggleGroupItem value="ask">
                <HugeiconsIcon icon={HelpCircleIcon} /> Ask Each Time
              </ToggleGroupItem>
              {downloadDirectory ? (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <ToggleGroupItem value="select">
                        <HugeiconsIcon icon={Folder01Icon} className="mr-0.5" />
                        {downloadDirectory.length > 15
                          ? `${downloadDirectory.slice(0, 15)}...`
                          : downloadDirectory}
                      </ToggleGroupItem>
                    }
                  />
                  <TooltipContent>
                    <p>{downloadDirectory}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <ToggleGroupItem value="select" onClick={selectDownloadDirectory}>
                  <HugeiconsIcon icon={Folder01Icon} />
                  Select
                </ToggleGroupItem>
              )}
            </ToggleGroup>
            {downloadDirectory && <Button onClick={selectDownloadDirectory}>Change</Button>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { GeneralTab }
