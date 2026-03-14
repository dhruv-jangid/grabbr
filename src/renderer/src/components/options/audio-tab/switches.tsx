import { HugeiconsIcon } from '@hugeicons/react'
import { usePreferences } from '../../providers/preferences'
import { Switch } from '../../ui/switch'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'

// const thumbnailConfigurableAudioFormats = ['mp3', 'opus', 'flac', 'm4a']

function Switches(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { audio } = preferences

  const isBest = audio.preset === 'best'
  // const isThumbnailConfigurable = thumbnailConfigurableAudioFormats.includes(
  //   audio.custom.postProcessing.audioFormat
  // )

  return (
    <>
      {/* <div className="flex items-center gap-2.5">
        <div className={`${(isBest || !isThumbnailConfigurable) && 'opacity-50'}`}>
          Embed Thumbnail
        </div>
        <Switch
          checked={audio.custom.postProcessing.embedThumbnail}
          onCheckedChange={function (value) {
            updatePreference('audio.custom.postProcessing.embedThumbnail', value)
          }}
          disabled={isBest || !isThumbnailConfigurable}
        />
      </div> */}
      <div className="space-y-1.5">
        <div className={`${isBest && 'opacity-50'} inline-flex items-center gap-1.5`}>
          Embed Chapters
          <Tooltip disabled={isBest}>
            <TooltipTrigger className={`${!isBest && 'cursor-help'}`}>
              <HugeiconsIcon icon={InformationCircleIcon} size={16} />
            </TooltipTrigger>
            <TooltipContent>Adds the audio&apos;s timestamped sections</TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Switch
            checked={audio.custom.postProcessing.embedChapters}
            onCheckedChange={function (value) {
              updatePreference('audio.custom.postProcessing.embedChapters', value)
            }}
            disabled={isBest}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className={`${isBest && 'opacity-50'}`}>Embed Metadata</div>
        <div>
          <Switch
            checked={audio.custom.postProcessing.embedMetadata}
            onCheckedChange={function (value) {
              updatePreference('audio.custom.postProcessing.embedMetadata', value)
            }}
            disabled={isBest}
          />
        </div>
      </div>
    </>
  )
}

export { Switches }
