import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '../../providers/preferences'

const formats = [
  {
    value: 'flac',
    name: 'FLAC',
    content: (
      <>
        <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
          Free Lossless Audio Codec
        </p>
        <p>Size: Medium</p>
        <p>Quality: Lossless</p>
        <p>Compatibility: Excellent</p>
      </>
    )
  },
  {
    value: 'alac',
    name: 'ALAC',
    content: (
      <>
        <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
          Apple Lossless Audio Codec
        </p>
        <p>Size: Medium</p>
        <p>Quality: Lossless</p>
        <p>Compatibility: Excellent</p>
      </>
    )
  },
  {
    value: 'wav',
    name: 'WAV',
    content: (
      <>
        <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
          Waveform Audio File Format
        </p>
        <p>Size: Very Large</p>
        <p>Quality: Lossless (Uncompressed)</p>
        <p>Compatibility: Universal</p>
      </>
    )
  },
  {
    value: 'opus',
    name: 'OPUS',
    content: (
      <>
        <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
          OPUS
        </p>
        <p>Size: Very Small</p>
        <p>Quality: Very High</p>
        <p>Compatibility: Good</p>
      </>
    )
  },
  {
    value: 'm4a',
    name: 'M4A',
    content: (
      <>
        <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
          MPEG-4 Audio
        </p>
        <p>Size: Small</p>
        <p>Quality: Very High</p>
        <p>Compatibility: Excellent</p>
      </>
    )
  },
  {
    value: 'mp3',
    name: 'MP3',
    content: (
      <>
        <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
          MPEG Audio Layer III
        </p>
        <p>Size: Small</p>
        <p>Quality: Good</p>
        <p>Compatibility: Universal</p>
      </>
    )
  },
  {
    value: 'vorbis',
    name: 'VORBIS',
    content: (
      <>
        <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
          Ogg Vorbis
        </p>
        <p>Size: Small</p>
        <p>Quality: High</p>
        <p>Compatibility: Good</p>
      </>
    )
  }
]

function Format(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { audio } = preferences

  const isBest = audio.preset === 'best'

  return (
    <div className="space-y-1">
      <div className={`${isBest && 'opacity-50'} font-medium`}>Format</div>
      <ToggleGroup
        disabled={isBest}
        value={[audio.custom.postProcessing.audioFormat]}
        onValueChange={function (value) {
          updatePreference('audio.custom.postProcessing.audioFormat', value[0] as any)
        }}
      >
        {formats.map(function (format) {
          return (
            <Tooltip key={format.value}>
              <TooltipTrigger
                render={<ToggleGroupItem value={format.value}>{format.name}</ToggleGroupItem>}
              />
              <TooltipContent>{format.content}</TooltipContent>
            </Tooltip>
          )
        })}
      </ToggleGroup>
    </div>
  )
}

export { Format }
