import { HugeiconsIcon } from '@hugeicons/react'
import { usePreferences } from './providers/preferences'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { FlimSlateIcon, MusicNote04Icon } from '@hugeicons/core-free-icons'

function Type(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()

  return (
    <ToggleGroup
      value={[preferences.type]}
      onValueChange={function (value) {
        updatePreference('type', value[0] as any)
      }}
    >
      <ToggleGroupItem value="audio" aria-label="Toggle type to audio">
        <HugeiconsIcon icon={MusicNote04Icon} className="mr-0.5" />
        Audio
      </ToggleGroupItem>
      <ToggleGroupItem value="video" aria-label="Toggle type to video">
        <HugeiconsIcon icon={FlimSlateIcon} className="size-4.5 mr-0.5" />
        Video
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export { Type }
