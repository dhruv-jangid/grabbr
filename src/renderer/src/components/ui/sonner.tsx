import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import {
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Alert02Icon,
  CancelCircleIcon,
  Loading03Icon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

function Toaster({ ...props }: ToasterProps): React.JSX.Element {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position="bottom-left"
      className="toaster group select-none"
      visibleToasts={10}
      icons={{
        success: <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4" />,
        info: <HugeiconsIcon icon={InformationCircleIcon} className="size-4" />,
        warning: <HugeiconsIcon icon={Alert02Icon} className="size-4" />,
        error: <HugeiconsIcon icon={CancelCircleIcon} className="size-4" />,
        loading: <HugeiconsIcon icon={Loading03Icon} className="size-4 animate-spin" />
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)'
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast'
        },
        style: {
          fontFamily: 'Geist Variable',
          borderRadius: 'calc(var(--radius-xl)',
          fontSize: 'var(--text-sm)',
          padding: 'calc(var(--spacing) * 3) calc(var(--spacing) * 5)',
          gap: 'calc(var(--spacing) * 2)'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
