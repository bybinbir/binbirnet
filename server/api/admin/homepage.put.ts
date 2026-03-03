import { readJsonFile, writeJsonFile } from '~/server/utils/storage'
import type { HomepageContent } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<HomepageContent>>(event)
  const current = await readJsonFile<HomepageContent>('homepage.json')
  const updated: HomepageContent = {
    features: body.features ?? current.features,
    steps: body.steps ?? current.steps,
    packagesSection: { ...current.packagesSection, ...body.packagesSection },
    stepsSection: { ...current.stepsSection, ...body.stepsSection },
    cta: body.cta ? { ...current.cta, ...body.cta } : current.cta,
  }
  await writeJsonFile('homepage.json', updated)
  return updated
})
