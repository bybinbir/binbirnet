import { readJsonFile } from '~/server/utils/storage'
import type { SeoConfig } from '~/types'

export default defineEventHandler(async () => {
  return await readJsonFile<SeoConfig>('seo.json')
})
