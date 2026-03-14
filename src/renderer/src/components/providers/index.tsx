import { ThemeProvider } from 'next-themes'
import { PreferencesProvider } from './preferences'

function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <PreferencesProvider>{children}</PreferencesProvider>
    </ThemeProvider>
  )
}

export { Providers }
