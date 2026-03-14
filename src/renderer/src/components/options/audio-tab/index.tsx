import { Card, CardContent } from '../../ui/card'
import { Preset } from './preset'
import { Format } from './format'
import { Quality } from './quality'
import { Switches } from './switches'

function AudioTab(): React.JSX.Element {
  return (
    <Card className="h-full">
      <CardContent className="space-y-6">
        <Preset />
        <Format />
        <Quality />
        <Switches />
      </CardContent>
    </Card>
  )
}

export { AudioTab }
