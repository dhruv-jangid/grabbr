import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { HugeiconsIcon } from '@hugeicons/react'
import { AiMagicIcon } from '@hugeicons/core-free-icons'
import { usePreferences } from '../../providers/preferences'

function Preset(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { video } = preferences

  return (
    <div className="space-y-1">
      <div className="font-medium">Preset</div>
      <ToggleGroup
        value={[video.preset]}
        onValueChange={function (value) {
          updatePreference('video.preset', value[0] as any)
        }}
      >
        <Tooltip>
          <TooltipTrigger
            render={
              <ToggleGroupItem value="best">
                <span className="inline-flex items-center gap-1">
                  <HugeiconsIcon icon={AiMagicIcon} />
                  Best
                </span>
              </ToggleGroupItem>
            }
          />
          <TooltipContent>Source quality (in MP4)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<ToggleGroupItem value="custom">Custom</ToggleGroupItem>} />
          <TooltipContent>Full control over each setting</TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </div>
  )
}

export { Preset }
