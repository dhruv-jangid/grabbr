import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger
} from './ui/context-menu'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { isValidUrl } from '@renderer/lib/utils'
import { ClipboardPaste } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

function InputUrl({
  url,
  setUrl
}: {
  url: string
  setUrl: (url: string) => void
}): React.JSX.Element {
  async function pasteLink(): Promise<void> {
    try {
      const url = await navigator.clipboard.readText()
      if (!isValidUrl(url)) {
        throw new Error('Invalid URL')
      }

      setUrl(url)
    } catch (error) {
      if (error instanceof Error) {
        toast.warning(error.message, { id: 'invalid-url', richColors: true })
      }
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Input
          id="url"
          placeholder="Enter or Paste YouTube/Instagram URL"
          className="font-mono"
          value={url}
          onChange={function (e) {
            setUrl(e.target.value)
          }}
        />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={pasteLink}>
          <HugeiconsIcon icon={ClipboardPaste} /> Paste
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export { InputUrl }
