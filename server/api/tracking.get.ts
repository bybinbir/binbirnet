import { readJsonFile } from '~/server/utils/storage'
import type { TrackingScript } from '~/types'

export default defineEventHandler(async () => {
  const data = await readJsonFile<{ scripts: TrackingScript[] }>('tracking.json')
  return data.scripts.filter(s => s.enabled)
})
