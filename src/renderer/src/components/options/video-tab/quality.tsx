import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '@renderer/components/providers/preferences'

const qualities = [
  {
    value: 'bv+ba/best',
    ariaLabel: 'Toggle Best',
    name: 'Best',
    content: <p>Best available</p>
  },
  {
    value: 'bv[height<=4320]+ba/best',
    ariaLabel: 'Toggle 8k',
    name: '4320p',
    content: <p>UHD (8K)</p>
  },
  {
    value: 'bv[height<=2160]+ba/best',
    ariaLabel: 'Toggle 4k',
    name: '2160p',
    content: <p>UHD (4K)</p>
  },
  {
    value: 'bv[height<=1440]+ba/best',
    ariaLabel: 'Toggle 2k',
    name: '1440p',
    content: <p>QHD</p>
  },
  {
    value: 'bv[height<=1080]+ba/best',
    ariaLabel: 'Toggle 1080p',
    name: '1080p',
    content: <p>FHD</p>
  },
  {
    value: 'bv[height<=720]+ba/best',
    ariaLabel: 'Toggle 720p',
    name: '720p',
    content: <p>HD</p>
  },
  {
    value: 'bv[height<=480]+ba/best',
    ariaLabel: 'Toggle 480p',
    name: '480p',
    content: <p>SD</p>
  },
  {
    value: 'bv[height<=360]+ba/best',
    ariaLabel: 'Toggle 360p',
    name: '360p',
    content: <p>SD</p>
  },
  {
    value: 'bv[height<=240]+ba/best',
    ariaLabel: 'Toggle 240p',
    name: '240p',
    content: <p>Low</p>
  },
  {
    value: 'bv[height<=144]+ba/best',
    ariaLabel: 'Toggle 144p',
    name: '144p',
    content: <p>Very Low</p>
  }
]

function Quality(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { video } = preferences

  const isBest = video.preset === 'best'

  return (
    <div className="space-y-1">
      <div className={`${isBest && 'opacity-50'}`}>Quality</div>
      <ToggleGroup
        disabled={isBest}
        value={[video.custom.videoFormat.format]}
        onValueChange={function (value) {
          updatePreference('video.custom.videoFormat.format', value[0])
        }}
      >
        {qualities.map(function (quality) {
          return (
            <Tooltip key={quality.value}>
              <TooltipTrigger
                render={
                  <ToggleGroupItem value={quality.value} aria-label={quality.ariaLabel}>
                    {quality.name}
                  </ToggleGroupItem>
                }
              />
              <TooltipContent>{quality.content}</TooltipContent>
            </Tooltip>
          )
        })}
      </ToggleGroup>
    </div>
  )
}
export { Quality }
