import { readJsonFile, writeJsonFile } from '~/server/utils/storage'
import type { NavigationConfig } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<NavigationConfig>>(event)
  const current = await readJsonFile<NavigationConfig>('navigation.json')
  const updated: NavigationConfig = {
    header: body.header ?? current.header,
    footerQuickLinks: body.footerQuickLinks ?? current.footerQuickLinks,
  }
  await writeJsonFile('navigation.json', updated)
  return updated
})
