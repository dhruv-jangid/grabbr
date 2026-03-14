import { isDev } from '@renderer/lib/utils'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'

function useIpc(): void {
  useEffect(function () {
    // Auto-update listeners should only be active in production
    if (!isDev) {
      window.api.onUpdateAvailable(function () {
        toast.loading('Downloading Update', {
          id: 'update',
          position: 'bottom-right',
          duration: Infinity,
          dismissible: false,
          description: 'Please keep the app open during update',
          descriptionClassName: 'text-destructive!',
          className: 'w-max!'
        })
      })

      window.api.onUpdateComplete(function () {
        toast.success('Update is ready', {
          id: 'update',
          position: 'bottom-right',
          duration: Infinity,
          dismissible: false,
          action: (
            <Button
              onClick={function () {
                window.api.quitAndInstallUpdate()
              }}
            >
              Install Now
            </Button>
          ),
          cancel: (
            <Button
              variant="outline"
              className="ml-4"
              onClick={function () {
                toast.dismiss('update')
              }}
            >
              Install on next launch
            </Button>
          ),
          className: 'w-max! text-nowrap'
        })
      })

      window.api.onUpdateError(function () {
        toast.error('Something went wrong while updating', {
          id: 'update',
          duration: Infinity,
          position: 'bottom-right',
          closeButton: true,
          description:
            'If restart doesnt fix this error then its recommended to re-install the application',
          descriptionClassName: 'text-destructive!',
          action: undefined,
          cancel: undefined
        })
      })
    }

    window.api.onDownloadInit(function ({ id }) {
      toast.loading('Initializing Download...', {
        id: `download-${id}`,
        position: 'top-right',
        duration: Infinity,
        dismissible: false
      })
    })

    window.api.onDownloadStart(function ({ id, name }) {
      const finalName = name.length > 50 ? `${name.slice(0, 50)}...` : name
      toast.loading(finalName, {
        id: `download-${id}`,
        position: 'top-right',
        duration: Infinity,
        dismissible: false,
        description: 'Downloading...',
        descriptionClassName: 'text-muted-foreground!',
        action: (
          <Button
            className="ml-auto"
            onClick={function () {
              toast.loading(finalName, {
                id: `download-${id}`,
                position: 'top-right',
                duration: Infinity,
                dismissible: false,
                description: 'Cancelling...',
                action: undefined
              })
              window.api.cancelDownload(id)
            }}
          >
            Cancel
          </Button>
        )
      })
    })

    window.api.onDownloadComplete(function ({ id, name, filePath }) {
      const finalName = name.length > 50 ? `${name.slice(0, 50)}...` : name
      toast.success(finalName, {
        id: `download-${id}`,
        position: 'top-right',
        description: 'Download Completed',
        descriptionClassName: 'text-muted-foreground!',
        dismissible: true,
        duration: 8000,
        closeButton: true,
        action: (
          <Button
            className="ml-auto"
            onClick={function () {
              window.api.showItemInFolder(filePath)
            }}
          >
            Show in Folder
          </Button>
        ),
        cancel: undefined
      })
    })

    window.api.onDownloadError(function ({ id, name, message }) {
      toast.error(name, {
        id: `download-${id}`,
        position: 'top-right',
        dismissible: true,
        duration: Infinity,
        description: message,
        descriptionClassName: 'text-destructive!',
        action: undefined,
        cancel: undefined,
        closeButton: true,
        richColors: true
      })
    })

    window.api.onDownloadCancel(function ({ name, id }) {
      toast.success(name, {
        id: `download-${id}`,
        position: 'top-right',
        dismissible: true,
        duration: 8000,
        description: 'Cancelled',
        descriptionClassName: 'text-muted-foreground!',
        action: undefined,
        richColors: false
      })
    })

    return function () {
      const { removeAllListeners } = window.electron.ipcRenderer
      if (!isDev) {
        removeAllListeners('update-available')
        removeAllListeners('update-complete')
        removeAllListeners('update-error')
      }
      removeAllListeners('download-init')
      removeAllListeners('download-start')
      removeAllListeners('download-complete')
      removeAllListeners('download-error')
      removeAllListeners('download-cancel')
    }
  }, [])
}

export { useIpc }
