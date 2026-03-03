import { writeJsonFile } from '~/server/utils/storage'
import type { TrackingScript } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ scripts: TrackingScript[] }>(event)
  await writeJsonFile('tracking.json', body)
  return body
})
