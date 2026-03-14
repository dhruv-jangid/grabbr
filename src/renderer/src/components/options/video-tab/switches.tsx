import { usePreferences } from '@renderer/components/providers/preferences'
import { Switch } from '../../ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { HugeiconsIcon } from '@hugeicons/react'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import { THUMB_EMBED_VIDEO_FMTS } from '../../../../../shared/constants'

function Switches(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { video } = preferences

  const isBest = video.preset === 'best'
  const isThumbnailConfigurable = THUMB_EMBED_VIDEO_FMTS.includes(
    video.custom.videoFormat.mergeOutputFormat
  )

  return (
    <>
      <div className="space-y-1.5">
        <div
          className={`${(isBest || !isThumbnailConfigurable) && 'opacity-50'} inline-flex items-center gap-1.5`}
        >
          <span className="font-medium">Embed Thumbnail</span>
          <Tooltip disabled={isBest || !isThumbnailConfigurable}>
            <TooltipTrigger className={`${!isBest && isThumbnailConfigurable && 'cursor-help'}`}>
              <HugeiconsIcon icon={InformationCircleIcon} size={16} />
            </TooltipTrigger>
            <TooltipContent>
              Supported containers:{' '}
              <span className="font-medium">
                {THUMB_EMBED_VIDEO_FMTS.toString().replaceAll(',', ', ').toUpperCase()}
              </span>
            </TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Switch
            checked={video.custom.postProcessing.embedThumbnail}
            onCheckedChange={function (value) {
              updatePreference('audio.custom.postProcessing.embedThumbnail', value)
            }}
            disabled={isBest || !isThumbnailConfigurable}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className={`${isBest && 'opacity-50'} inline-flex items-center gap-1.5`}>
          <span className="font-medium">Embed Chapters</span>
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
        <div className={`${isBest && 'opacity-50'} font-medium`}>Embed Metadata</div>
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
