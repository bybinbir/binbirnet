import { readJsonFile } from '~/server/utils/storage'
import type { HomepageContent } from '~/types'

export default defineEventHandler(async () => {
  const data = await readJsonFile<HomepageContent>('homepage.json')
  data.features.sort((a, b) => a.order - b.order)
  data.steps.sort((a, b) => a.order - b.order)
  return data
})
