import Store from 'electron-store'

const store = new Store<Preferences>({
  defaults: {
    type: 'audio',
    downloadMode: 'ask',
    downloadDirectory: '',
    cookiesFilePath: '',
    audio: {
      preset: 'best',
      custom: {
        postProcessing: {
          extractAudio: true,
          audioFormat: 'wav',
          audioQuality: '0',
          // embedThumbnail: true,
          embedMetadata: true,
          embedChapters: true,
          postOverwrites: true
        },
        videoSelection: { noPlaylist: true },
        filesystem: { noOverwrites: true, noPart: true }
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
          // embedThumbnail: true,
          embedMetadata: true,
          embedChapters: true,
          postOverwrites: true
        },
        videoSelection: { noPlaylist: true },
        filesystem: { noOverwrites: true, noPart: true }
      }
    }
  }
})

export { store }
