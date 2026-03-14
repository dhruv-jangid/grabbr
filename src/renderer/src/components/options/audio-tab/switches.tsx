import { HugeiconsIcon } from '@hugeicons/react'
import { usePreferences } from '../../providers/preferences'
import { Switch } from '../../ui/switch'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { THUMB_EMBED_AUDIO_FMTS } from '../../../../../shared/constants'

function Switches(): React.JSX.Element {
  const { preferences, updatePreference } = usePreferences()
  const { audio } = preferences

  const isBest = audio.preset === 'best'
  const isThumbnailConfigurable = THUMB_EMBED_AUDIO_FMTS.includes(
    audio.custom.postProcessing.audioFormat
  )

  return (
    <>
      <div className="space-y-1.5">
        <div
          className={`${(isBest || !isThumbnailConfigurable) && 'opacity-50'} inline-flex items-center gap-1.5`}
        >
          <span className="font-medium">Embed Thumbnail</span>
          <Tooltip disabled={isBest}>
            <TooltipTrigger className={`${!isBest && 'cursor-help'}`}>
              <HugeiconsIcon icon={InformationCircleIcon} size={15} />
            </TooltipTrigger>
            <TooltipContent>
              Supported formats:{' '}
              <span className="font-medium">
                {THUMB_EMBED_AUDIO_FMTS.toString().replaceAll(',', ', ').toUpperCase()}
              </span>
            </TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Switch
            checked={audio.custom.postProcessing.embedThumbnail}
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
              <HugeiconsIcon icon={InformationCircleIcon} size={15} />
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
        <div className={`${isBest && 'opacity-50'} font-medium`}>Embed Metadata</div>
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
