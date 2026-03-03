import type { Package } from '~/types'

export default defineEventHandler(async () => {
  return await readJsonFile<Package[]>('packages.json')
})
