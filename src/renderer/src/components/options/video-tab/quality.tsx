import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '@renderer/components/providers/preferences'

const QUALITIES = [
  {
    value: 'bv+ba/best',
    name: 'Peak',
    content: 'Peak available'
  },
  {
    value: 'bv[height<=4320]+ba/best',
    name: '4320p',
    content: 'UHD (8K)'
  },
  {
    value: 'bv[height<=2160]+ba/best',
    name: '2160p',
    content: 'UHD (4K)'
  },
  {
    value: 'bv[height<=1440]+ba/best',
    name: '1440p',
    content: 'QHD'
  },
  {
    value: 'bv[height<=1080]+ba/best',
    name: '1080p',
    content: 'FHD'
  },
  {
    value: 'bv[height<=720]+ba/best',
    name: '720p',
    content: 'HD'
  },
  {
    value: 'bv[height<=480]+ba/best',
    name: '480p',
    content: 'SD'
  },
  {
    value: 'bv[height<=360]+ba/best',
    name: '360p',
    content: 'SD'
  },
  {
    value: 'bv[height<=240]+ba/best',
    name: '240p',
    content: 'Low'
  },
  {
    value: 'bv[height<=144]+ba/best',
    name: '144p',
    content: 'Very Low'
  }
]

function Quality(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { video } = preferences

  const isBest = video.preset === 'best'

  return (
    <div className="space-y-1">
      <div className={`${isBest && 'opacity-50'} font-medium`}>Quality</div>
      <ToggleGroup
        disabled={isBest}
        value={[video.custom.videoFormat.format]}
        onValueChange={function (value) {
          updatePreference('video.custom.videoFormat.format', value[0])
        }}
      >
        {QUALITIES.map(function (quality) {
          return (
            <Tooltip key={quality.value}>
              <TooltipTrigger
                render={<ToggleGroupItem value={quality.value}>{quality.name}</ToggleGroupItem>}
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
