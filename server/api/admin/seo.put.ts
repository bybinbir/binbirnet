import { readJsonFile, writeJsonFile } from '~/server/utils/storage'
import type { SeoConfig } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<SeoConfig>>(event)
  const current = await readJsonFile<SeoConfig>('seo.json')
  const updated: SeoConfig = {
    global: { ...current.global, ...body.global },
    pages: body.pages ? { ...current.pages, ...body.pages } : current.pages,
  }
  await writeJsonFile('seo.json', updated)
  return updated
})
