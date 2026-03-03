import { readJsonFile } from '~/server/utils/storage'
import type { HomepageContent } from '~/types'

export default defineEventHandler(async () => {
  return await readJsonFile<HomepageContent>('homepage.json')
})
