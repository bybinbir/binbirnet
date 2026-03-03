import { readJsonFile } from '~/server/utils/storage'
import type { SiteSettings } from '~/types'

export default defineEventHandler(async () => {
  return await readJsonFile<SiteSettings>('settings.json')
})
