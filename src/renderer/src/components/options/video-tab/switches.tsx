import { usePreferences } from '@renderer/components/providers/preferences'
import { Switch } from '../../ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { HugeiconsIcon } from '@hugeicons/react'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'

// const thumbnailConfigurableVideoContainers = ['mkv', 'mka', 'mp4', 'mov']

function Switches(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { video } = preferences

  const isBest = video.preset === 'best'
  // const isThumbnailConfigurable = thumbnailConfigurableVideoContainers.includes(
  //   video.custom.videoFormat.mergeOutputFormat
  // )

  return (
    <>
      {/* <div className="flex items-center gap-2.5">
        <div className={`${(isBest || !isThumbnailConfigurable) && 'opacity-50'}`}>
          Embed Thumbnail
        </div>
        <Switch
          checked={video.custom.postProcessing.embedThumbnail}
          onCheckedChange={function (value) {
            updatePreference('video.custom.postProcessing.embedThumbnail', value)
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
            <TooltipContent>Adds the video&apos;s timestamped sections</TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Switch
            checked={preferences.video.custom.postProcessing.embedChapters}
            onCheckedChange={function (value) {
              updatePreference('video.custom.postProcessing.embedChapters', value)
            }}
            disabled={isBest}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className={`${isBest && 'opacity-50'}`}>Embed Metadata</div>
        <div>
          <Switch
            checked={preferences.video.custom.postProcessing.embedMetadata}
            onCheckedChange={function (value) {
              updatePreference('video.custom.postProcessing.embedMetadata', value)
            }}
            disabled={isBest}
          />
        </div>
      </div>
    </>
  )
}

export { Switches }
