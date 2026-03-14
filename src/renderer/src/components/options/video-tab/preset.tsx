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
      <div>Preset</div>
      <ToggleGroup
        value={[video.preset]}
        onValueChange={function (value) {
          updatePreference('video.preset', value[0] as any)
        }}
      >
        <Tooltip>
          <TooltipTrigger
            render={
              <ToggleGroupItem value="best" aria-label="Toggle best preset">
                <span className="inline-flex items-center gap-1">
                  <HugeiconsIcon icon={AiMagicIcon} />
                  Best
                </span>
              </ToggleGroupItem>
            }
          />
          <TooltipContent>
            <p>Peak available quality (in MP4)</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <ToggleGroupItem value="custom" aria-label="Toggle custom preset">
                Custom
              </ToggleGroupItem>
            }
          />
          <TooltipContent>
            <p>Full control over each setting</p>
          </TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </div>
  )
}

export { Preset }
