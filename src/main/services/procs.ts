import type { ChildProcessWithoutNullStreams } from 'child_process'

const activeDownloadProcesses = new Map<string, ChildProcessWithoutNullStreams>()
const cancelledDownloads = new Set<string>()

export { activeDownloadProcesses, cancelledDownloads }
