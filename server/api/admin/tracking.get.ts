import { readJsonFile } from '~/server/utils/storage'
import type { TrackingScript } from '~/types'

export default defineEventHandler(async () => {
  return await readJsonFile<{ scripts: TrackingScript[] }>('tracking.json')
})
