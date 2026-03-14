import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '../../providers/preferences'

const configurableFormats = ['mp3', 'vorbis', 'opus', 'aac', 'm4a']
const qualities = [
  {
    value: '320k',
    name: '320K'
  },
  {
    value: '256k',
    name: '256K'
  },
  {
    value: '224k',
    name: '224K'
  },
  {
    value: '192k',
    name: '192K'
  },
  {
    value: '160k',
    name: '160K'
  },
  {
    value: '128k',
    name: '128K'
  },
  {
    value: '96k',
    name: '96K'
  },
  {
    value: '64k',
    name: '64K'
  }
]

function Quality(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { audio } = preferences

  const isBest = audio.preset === 'best'
  const isQualityConfigurable = configurableFormats.includes(
    audio.custom.postProcessing.audioFormat
  )

  return (
    <div className="space-y-1">
      <div className={`${(isBest || !isQualityConfigurable) && 'opacity-50'}`}>Quality</div>
      <ToggleGroup
        disabled={!isQualityConfigurable || isBest}
        value={[audio.custom!.postProcessing!.audioQuality!]}
        onValueChange={function (value) {
          updatePreference('audio.custom.postProcessing.audioQuality', value[0] as any)
        }}
      >
        <Tooltip>
          <TooltipTrigger render={<ToggleGroupItem value="0">Best</ToggleGroupItem>} />
          <TooltipContent>
            <p>Best available</p>
          </TooltipContent>
        </Tooltip>
        {qualities.map(function (quality) {
          return (
            <ToggleGroupItem key={quality.value} value={quality.value}>
              {quality.name}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}

export { Quality }
