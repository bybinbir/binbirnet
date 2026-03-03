import { readJsonFile } from '~/server/utils/storage'
import type { NavigationConfig } from '~/types'

export default defineEventHandler(async () => {
  const nav = await readJsonFile<NavigationConfig>('navigation.json')
  nav.header.sort((a, b) => a.order - b.order)
  nav.footerQuickLinks.sort((a, b) => a.order - b.order)
  return nav
})
