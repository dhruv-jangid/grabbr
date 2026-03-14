import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '@renderer/components/providers/preferences'

const CONTAINERS = [
  {
    value: 'mp4',
    name: 'MP4',
    content: (
      <>
        <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
          MPEG-4 Part 14
        </p>
        <p>Compatibility: Universal</p>
        <p>Flexibility: Good</p>
      </>
    )
  },
  {
    value: 'mkv',
    name: 'MKV',
    content: (
      <>
        <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
          Matroska Video
        </p>
        <p>Compatibility: Moderate</p>
        <p>Flexibility: Excellent</p>
      </>
    )
  }
  // {
  //   value: 'webm',
  //   name: 'WEBM',
  //   content: (
  //     <>
  //       <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
  //         Web Media (Restricted Matroska for browsers)
  //       </p>
  //       <p>Compatibility: Moderate</p>
  //       <p>Flexibility: Limited</p>
  //     </>
  //   )
  // }
]

function Container(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { video } = preferences

  const isBest = video.preset === 'best'

  return (
    <div className="space-y-1">
      <div className={`${isBest && 'opacity-50'} font-medium`}>Container</div>
      <ToggleGroup
        disabled={isBest}
        value={[video.custom.videoFormat.mergeOutputFormat]}
        onValueChange={function (value) {
          updatePreference('video.custom.videoFormat.mergeOutputFormat', value[0] as any)
        }}
      >
        {CONTAINERS.map(function (container) {
          return (
            <Tooltip key={container.value}>
              <TooltipTrigger
                render={<ToggleGroupItem value={container.value}>{container.name}</ToggleGroupItem>}
              />
              <TooltipContent>{container.content}</TooltipContent>
            </Tooltip>
          )
        })}
      </ToggleGroup>
    </div>
  )
}

export { Container }
