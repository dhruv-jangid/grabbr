import { toast } from 'sonner'
import { createContext, useContext, useEffect, useState } from 'react'

type ContextType = {
  preferences: Preferences
  updatePreference: <K extends keyof PreferenceMap>(key: K, value: PreferenceMap[K]) => void
  prefLoading: boolean
}

const PreferencesContext = createContext<ContextType | null>(null)

function PreferencesProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [preferences, setPreferences] = useState<Preferences>({
    type: 'audio',
    downloadMode: 'ask',
    downloadDirectory: '',
    cookiesFilePath: '',
    audio: {
      preset: 'best',
      custom: {
        postProcessing: {
          extractAudio: true,
          audioFormat: 'best',
          audioQuality: '0',
          embedThumbnail: true,
          embedChapters: true,
          embedMetadata: true,
          postOverwrites: true
        },
        videoSelection: { noPlaylist: true },
        filesystem: {
          noOverwrites: true,
          noPart: true,
          restrictFilenames: true
        }
      }
    },
    video: {
      preset: 'best',
      custom: {
        videoFormat: {
          format: 'bv+ba/best',
          mergeOutputFormat: 'mp4'
        },
        postProcessing: {
          embedThumbnail: true,
          embedChapters: true,
          embedMetadata: true,
          postOverwrites: true
        },
        videoSelection: { noPlaylist: true },
        filesystem: {
          noOverwrites: true,
          noPart: true,
          restrictFilenames: true
        }
      }
    }
  })
  const [prefLoading, setPrefLoading] = useState(true)

  useEffect(function () {
    async function loadPreferences(): Promise<void> {
      try {
        const savedPreferences = await window.api.getPreferences()
        setPreferences(savedPreferences)
      } catch {
        toast.error('Failed to load preferences')
      } finally {
        setPrefLoading(false)
      }
    }

    loadPreferences()
  }, [])

  function updatePreference(key: string, value: unknown): void {
    window.api.setPreference(key, value)
    setPreferences(function (prev) {
      const keys = key.split('.')
      if (keys.length === 1) {
        return { ...prev, [key]: value }
      }

      const result = { ...prev }
      let current = result as Record<string, unknown>
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) }
        current = current[keys[i]] as Record<string, unknown>
      }
      current[keys[keys.length - 1]] = value
      return result
    })
  }

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreference,
        prefLoading
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

function usePreferences(): ContextType {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider')
  }
  return context
}

export { PreferencesProvider, usePreferences }
