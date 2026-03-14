import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '../../providers/preferences'
import { QLTY_CHNG_AUDIO_FMTS } from '../../../../../shared/constants'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const QUALITIES = [
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
  const isQualityConfigurable = QLTY_CHNG_AUDIO_FMTS.includes(
    audio.custom.postProcessing.audioFormat
  )

  return (
    <div className="space-y-1">
      <div
        className={`${(isBest || !isQualityConfigurable) && 'opacity-50'} inline-flex items-center gap-1.5`}
      >
        <span className="font-medium">Quality</span>
        <Tooltip disabled={isBest}>
          <TooltipTrigger className={`${!isBest && 'cursor-help'}`}>
            <HugeiconsIcon icon={InformationCircleIcon} size={14} />
          </TooltipTrigger>
          <TooltipContent>
            Supported formats:{' '}
            <span className="font-medium">
              {QLTY_CHNG_AUDIO_FMTS.toString().replaceAll(',', ', ').toUpperCase()}
            </span>
          </TooltipContent>
        </Tooltip>
      </div>
      <ToggleGroup
        disabled={!isQualityConfigurable || isBest}
        value={[audio.custom.postProcessing.audioQuality]}
        onValueChange={function (value) {
          updatePreference('audio.custom.postProcessing.audioQuality', value[0] as any)
        }}
      >
        <Tooltip>
          <TooltipTrigger render={<ToggleGroupItem value="0">Peak</ToggleGroupItem>} />
          <TooltipContent>Peak available</TooltipContent>
        </Tooltip>
        {QUALITIES.map(function (quality) {
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
