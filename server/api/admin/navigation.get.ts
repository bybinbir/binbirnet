import { readJsonFile } from '~/server/utils/storage'
import type { NavigationConfig } from '~/types'

export default defineEventHandler(async () => {
  return await readJsonFile<NavigationConfig>('navigation.json')
})
