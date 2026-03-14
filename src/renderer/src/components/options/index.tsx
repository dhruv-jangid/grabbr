import { Settings01Icon } from '@hugeicons/core-free-icons'
import { Button } from '../ui/button'
import { AudioTab } from './audio-tab'
import { VideoTab } from './video-tab'
import { GeneralTab } from './general-tab'
import { ExperimentalTab } from './experimental-tab'
import { usePreferences } from '../providers/preferences'
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { HugeiconsIcon } from '@hugeicons/react'
import { UpdatesTab } from './updates-tab'

function Options(): React.JSX.Element {
  const { preferences } = usePreferences()

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button>
            <HugeiconsIcon icon={Settings01Icon} /> Options
          </Button>
        }
      />
      <DialogContent className="min-w-2xl min-h-120">
        <Tabs defaultValue={preferences.type}>
          <TabsList>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="text-destructive dark:text-destructive/80 hover:text-destructive! data-active:text-destructive!"
            >
              Experimental
            </TabsTrigger>
          </TabsList>
          <TabsContent value="audio">
            <AudioTab />
          </TabsContent>
          <TabsContent value="video">
            <VideoTab />
          </TabsContent>
          <TabsContent value="general">
            <GeneralTab />
          </TabsContent>
          <TabsContent value="updates">
            <UpdatesTab />
          </TabsContent>
          <TabsContent value="advanced">
            <ExperimentalTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export { Options }
